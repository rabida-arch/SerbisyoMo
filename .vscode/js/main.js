// Page logic for directory, profiles, requests, auth forms, and favorites.
(() => {
  'use strict';

  const store = window.SerbisyoStore;
  const auth = window.SerbisyoAuth;
  const common = window.SerbisyoCommon;
  const requestStatuses = ['Pending', 'Quoted', 'Accepted', 'Declined', 'Completed', 'Cancelled'];

  // The page (with its query string) to return to after logging in.
  function getCurrentPagePath() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    return page + window.location.search;
  }

  // Residents are the only accounts that send and track service requests.
  function getResidentUser() {
    const user = auth?.currentUser?.();
    return user && user.role === 'resident' ? user : null;
  }

  function isRequestOwnedBy(item, user) {
    return Boolean(
      item && user && (item.userId === user.id || (!item.userId && item.fullName === user.name))
    );
  }

  // Card shown instead of the request form / request list when access is not allowed.
  function createAccessCard(title, message, actions) {
    const card = document.createElement('div');
    card.className = 'requests-empty-state auth-required-card';
    const heading = document.createElement('h2');
    heading.textContent = title;
    const text = document.createElement('p');
    text.textContent = message;
    const buttons = document.createElement('div');
    buttons.className = 'auth-required-actions';
    actions.forEach((action) => {
      const link = document.createElement('a');
      link.className = action.secondary ? 'button button-secondary' : 'button';
      link.href = action.href;
      link.textContent = action.label;
      buttons.append(link);
    });
    card.append(heading, text, buttons);
    return card;
  }

  function createAccessGate(user, purpose) {
    if (user && user.role === 'provider') {
      return createAccessCard(
        'Resident accounts only',
        `You are signed in as a provider. Use a resident account to ${purpose}, or manage incoming requests from your dashboard.`,
        [{ label: 'Go to Provider Dashboard', href: 'provider-dashboard.html' }]
      );
    }
    const next = encodeURIComponent(getCurrentPagePath());
    return createAccessCard(
      'Log in to continue',
      `You need a resident account to ${purpose}. Log in or create a free account to continue.`,
      [
        { label: 'Log in', href: `login.html?next=${next}` },
        { label: 'Sign up', href: `signup.html?next=${next}`, secondary: true }
      ]
    );
  }

  function createProviderDetail(label, value) {
    const detail = document.createElement('div');
    detail.className = 'provider-detail';
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value;
    detail.append(term, description);
    return detail;
  }

  function formatRate(rate) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(rate);
  }

  function formatRating(provider) {
    if (typeof provider.rating !== 'number') return 'No ratings yet';
    const count = provider.reviewCount || 0;
    return `${provider.rating.toFixed(1)} out of 5 (${count} ${count === 1 ? 'review' : 'reviews'})`;
  }

  function formatStarRating(rating) {
    const score = Math.round(Number(rating) || 0);
    return '★'.repeat(Math.max(0, Math.min(5, score))) + '☆'.repeat(Math.max(0, 5 - score));
  }

  function sortProviders(list, mode) {
    const byName = (a, b) => a.name.localeCompare(b.name);
    const sorters = {
      rating: (a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0),
      experience: (a, b) => b.yearsExperience - a.yearsExperience,
      'price-low': (a, b) => a.rate - b.rate,
      'price-high': (a, b) => b.rate - a.rate,
      name: byName
    };
    return sorters[mode] ? [...list].sort(sorters[mode]) : list;
  }

  function normalizeCategory(category) {
    return String(category || '')
      .trim()
      .toLowerCase()
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ');
  }

  function categoryToSlug(category) {
    return normalizeCategory(category).replace(/ /g, '-');
  }

  function populateFilterOptions(categoryFilter, barangayFilter) {
    const categories = [...new Set(providers.map((provider) => provider.category))].sort((a, b) =>
      a.localeCompare(b)
    );
    const barangays = [...new Set(providers.flatMap((provider) => provider.barangaysCovered))].sort(
      (a, b) => a.localeCompare(b)
    );
    categories.forEach((category) => categoryFilter.add(new Option(category, category)));
    barangays.forEach((barangay) => barangayFilter.add(new Option(barangay, barangay)));
  }

  function applyFiltersFromUrl({ searchInput, categoryFilter, barangayFilter, priceFilter, sortFilter }) {
    const params = new URLSearchParams(window.location.search);
    const findOption = (select, value) =>
      [...select.options].find(
        (option) => option.value && normalizeCategory(option.value) === normalizeCategory(value)
      );

    const category = params.get('category');
    if (category) {
      const match = findOption(categoryFilter, category);
      if (match) categoryFilter.value = match.value;
    }
    const barangay = params.get('barangay');
    if (barangay) {
      const match = findOption(barangayFilter, barangay);
      if (match) barangayFilter.value = match.value;
    }
    const price = params.get('price');
    if (price && [...priceFilter.options].some((option) => option.value === price)) {
      priceFilter.value = price;
    }
    const sort = params.get('sort');
    if (sort && [...sortFilter.options].some((option) => option.value === sort)) {
      sortFilter.value = sort;
    }
    const q = params.get('q');
    if (q) searchInput.value = q;
  }

  function syncFiltersToUrl({ searchInput, categoryFilter, barangayFilter, priceFilter, sortFilter }) {
    const params = new URLSearchParams();
    if (searchInput.value.trim()) params.set('q', searchInput.value.trim());
    if (categoryFilter.value) params.set('category', categoryToSlug(categoryFilter.value));
    if (barangayFilter.value) params.set('barangay', barangayFilter.value);
    if (priceFilter.value) params.set('price', priceFilter.value);
    if (sortFilter.value && sortFilter.value !== 'recommended') params.set('sort', sortFilter.value);
    const query = params.toString();
    const next = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState({}, '', next);
  }

  function filterProviders(searchTerm, category, barangay, priceRange) {
    const term = searchTerm.trim().toLowerCase();
    return providers.filter((provider) => {
      const matchesSearch =
        !term ||
        [provider.name, provider.description, provider.category, ...(provider.specialties || [])]
          .join(' ')
          .toLowerCase()
          .includes(term);
      const matchesCategory = !category || provider.category === category;
      const matchesBarangay = !barangay || provider.barangaysCovered.includes(barangay);
      const matchesPrice =
        !priceRange ||
        (priceRange === 'below-300' && provider.rate < 300) ||
        (priceRange === '300-600' && provider.rate >= 300 && provider.rate <= 600) ||
        (priceRange === 'above-600' && provider.rate > 600);
      return matchesSearch && matchesCategory && matchesBarangay && matchesPrice;
    });
  }

  function createFavoriteButton(provider) {
    const user = auth?.currentUser?.();
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'favorite-toggle';
    button.dataset.providerId = String(provider.id);

    const refresh = () => {
      const current = auth?.currentUser?.();
      const saved = current ? store.isFavorite(current.id, provider.id) : false;
      button.classList.toggle('is-saved', saved);
      button.setAttribute('aria-pressed', String(saved));
      button.setAttribute('aria-label', saved ? 'Remove from favorites' : 'Save to favorites');
      button.textContent = saved ? '★ Saved' : '☆ Save';
    };

    refresh();

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const current = auth?.currentUser?.();
      if (!current) {
        common?.showToast?.('Log in as a resident to save favorites.', 'info');
        window.location.href = `login.html?next=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        return;
      }
      if (current.role !== 'resident') {
        common?.showToast?.('Favorites are available on resident accounts.', 'info');
        return;
      }
      store.toggleFavorite(current.id, provider.id);
      refresh();
      common?.showToast?.(
        store.isFavorite(current.id, provider.id) ? 'Added to favorites.' : 'Removed from favorites.',
        'success'
      );
    });

    return button;
  }

  function createProviderCard(provider) {
    const card = document.createElement('article');
    card.className = 'provider-card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'provider-card-header';

    const name = document.createElement('h2');
    name.className = 'provider-name';
    name.textContent = provider.name;

    const category = document.createElement('span');
    category.className = 'category-label';
    category.textContent = provider.category;

    const description = document.createElement('p');
    description.className = 'provider-description';
    description.textContent = provider.description;

    cardHeader.append(name, category);

    const details = document.createElement('dl');
    details.className = 'provider-details';
    details.append(
      createProviderDetail('Barangays covered', provider.barangaysCovered.join(', ')),
      createProviderDetail('Experience', `${provider.yearsExperience} years`),
      createProviderDetail('Rate', `${formatRate(provider.rate)} ${provider.rateType}`),
      createProviderDetail('Rating', formatRating(provider)),
      createProviderDetail('Availability', provider.availability)
    );

    const actions = document.createElement('div');
    actions.className = 'provider-card-actions';

    const profileLink = document.createElement('a');
    profileLink.className = 'button provider-button';
    profileLink.href = `profile.html?id=${encodeURIComponent(provider.id)}`;
    profileLink.textContent = 'View Profile';

    actions.append(profileLink, createFavoriteButton(provider));
    card.append(cardHeader, description, details, actions);
    return card;
  }

  function renderProviders(providerGrid, providerCount, filteredProviders) {
    providerCount.textContent = `Found ${filteredProviders.length} of ${providers.length} providers`;
    if (filteredProviders.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'no-providers';
      emptyMessage.textContent = 'No providers found. Try adjusting or clearing your filters.';
      providerGrid.replaceChildren(emptyMessage);
      return;
    }
    providerGrid.replaceChildren(...filteredProviders.map(createProviderCard));
  }

  function initializeProviderDirectory() {
    const providerGrid = document.querySelector('#provider-grid');
    if (!providerGrid) return;

    const providerCount = document.querySelector('#provider-count');
    const searchInput = document.querySelector('#provider-search');
    const categoryFilter = document.querySelector('#category-filter');
    const barangayFilter = document.querySelector('#barangay-filter');
    const priceFilter = document.querySelector('#price-filter');
    const sortFilter = document.querySelector('#sort-filter');
    const filterForm = document.querySelector('#provider-filters');

    if (typeof providers === 'undefined' || !Array.isArray(providers)) {
      providerGrid.textContent = 'Provider listings are currently unavailable.';
      if (providerCount) providerCount.textContent = '';
      return;
    }

    populateFilterOptions(categoryFilter, barangayFilter);
    applyFiltersFromUrl({ searchInput, categoryFilter, barangayFilter, priceFilter, sortFilter });

    const refresh = () => {
      const filtered = filterProviders(
        searchInput.value,
        categoryFilter.value,
        barangayFilter.value,
        priceFilter.value
      );
      renderProviders(providerGrid, providerCount, sortProviders(filtered, sortFilter.value));
      syncFiltersToUrl({ searchInput, categoryFilter, barangayFilter, priceFilter, sortFilter });
    };

    filterForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      refresh();
    });
    [searchInput, categoryFilter, barangayFilter, priceFilter, sortFilter].forEach((control) => {
      control?.addEventListener('input', refresh);
      control?.addEventListener('change', refresh);
    });
    document.querySelector('#clear-filters')?.addEventListener('click', () => {
      filterForm.reset();
      refresh();
    });
    refresh();
  }

  function mergeProviderReviews(provider) {
    const sample = Array.isArray(provider.reviews) ? provider.reviews : [];
    const userReviews =
      store && typeof store.getFeedbackForProvider === 'function'
        ? store.getFeedbackForProvider(provider.id)
        : [];
    return [...userReviews, ...sample];
  }

  function createReviewCard(review) {
    const card = document.createElement('article');
    card.className = 'review-card';
    const header = document.createElement('header');
    header.className = 'review-header';
    const name = document.createElement('strong');
    name.textContent = review.name || 'Resident';
    const rating = document.createElement('span');
    rating.className = 'review-stars';
    rating.textContent = formatStarRating(review.rating);
    rating.title = `${review.rating} out of 5`;
    const date = document.createElement('time');
    date.dateTime = review.date || '';
    date.textContent = review.date || '';
    header.append(name, rating, date);
    const comment = document.createElement('p');
    comment.textContent = review.comment || '';
    card.append(header, comment);
    return card;
  }

  function createRequestFeedbackForm(serviceRequest, onSubmitted) {
    const providerId = serviceRequest.providerId;
    if (!providerId) return null;

    const user = auth?.currentUser?.();
    if (!user || user.role !== 'resident') return null;

    const section = document.createElement('section');
    section.className = 'request-feedback-section';
    const title = document.createElement('h3');
    title.className = 'request-feedback-title';
    title.textContent = 'Rate this service';
    const hint = document.createElement('p');
    hint.className = 'request-feedback-hint';
    hint.textContent = 'Share how this completed job went for you.';
    section.append(title, hint);

    const form = document.createElement('form');
    form.className = 'feedback-form request-feedback-form';
    form.noValidate = true;

    const fieldId = `req-${serviceRequest.id}`;
    const ratingField = document.createElement('div');
    ratingField.className = 'auth-field';
    const ratingLabel = document.createElement('label');
    ratingLabel.htmlFor = `feedback-rating-${fieldId}`;
    ratingLabel.textContent = 'Rating';
    const ratingSelect = document.createElement('select');
    ratingSelect.id = `feedback-rating-${fieldId}`;
    ratingSelect.name = 'rating';
    ratingSelect.required = true;
    ['', '5', '4', '3', '2', '1'].forEach((value, index) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = index === 0 ? 'Choose a rating' : `${value} star${value === '1' ? '' : 's'}`;
      ratingSelect.append(option);
    });
    ratingField.append(ratingLabel, ratingSelect);

    const commentField = document.createElement('div');
    commentField.className = 'auth-field';
    const commentLabel = document.createElement('label');
    commentLabel.htmlFor = `feedback-comment-${fieldId}`;
    commentLabel.textContent = 'Comment';
    const commentInput = document.createElement('textarea');
    commentInput.id = `feedback-comment-${fieldId}`;
    commentInput.name = 'comment';
    commentInput.rows = 3;
    commentInput.required = true;
    commentInput.minLength = 5;
    commentInput.placeholder = 'What went well? What could improve?';
    commentField.append(commentLabel, commentInput);

    const error = document.createElement('p');
    error.className = 'field-error';
    error.setAttribute('role', 'alert');

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'button';
    submit.textContent = 'Submit feedback';

    form.append(ratingField, commentField, error, submit);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      error.textContent = '';
      try {
        const entry = {
          name: user.name,
          rating: Number(ratingSelect.value),
          comment: commentInput.value.trim(),
          date: new Date().toISOString().slice(0, 10),
          userId: user.id,
          requestId: serviceRequest.id
        };
        if (!entry.comment || entry.comment.length < 5) {
          throw new Error('Please write a short comment (at least 5 characters).');
        }
        if (!Number.isFinite(entry.rating) || entry.rating < 1 || entry.rating > 5) {
          throw new Error('Please choose a rating from 1 to 5.');
        }
        store.addFeedback(providerId, entry);
        common?.showToast?.('Thanks for your feedback.', 'success');
        if (typeof onSubmitted === 'function') onSubmitted(entry);
      } catch (err) {
        error.textContent = err.message || 'Could not save feedback.';
      }
    });

    section.append(form);
    return section;
  }

  function createProviderProfile(provider) {
    const profile = document.createElement('article');
    profile.className = 'provider-profile';

    const header = document.createElement('header');
    header.className = 'profile-header';
    const titleGroup = document.createElement('div');
    const name = document.createElement('h1');
    name.textContent = provider.name;
    const category = document.createElement('span');
    category.className = 'category-label';
    category.textContent = provider.category;
    const ratingLine = document.createElement('p');
    ratingLine.className = 'profile-rating';
    ratingLine.textContent = formatRating(provider);
    titleGroup.append(name, category, ratingLine);
    header.append(titleGroup, createFavoriteButton(provider));

    const descriptionSection = document.createElement('section');
    descriptionSection.className = 'profile-section';
    const descriptionTitle = document.createElement('h2');
    descriptionTitle.textContent = 'About';
    const description = document.createElement('p');
    description.textContent = provider.description;
    descriptionSection.append(descriptionTitle, description);

    const serviceDetails = document.createElement('section');
    serviceDetails.className = 'profile-section';
    const serviceTitle = document.createElement('h2');
    serviceTitle.textContent = 'Service details';
    const serviceList = document.createElement('dl');
    serviceList.className = 'profile-details';
    const specialties =
      Array.isArray(provider.specialties) && provider.specialties.length
        ? provider.specialties.join(', ')
        : 'Not listed';
    const languages =
      Array.isArray(provider.languages) && provider.languages.length
        ? provider.languages.join(', ')
        : 'Not listed';
    serviceList.append(
      createProviderDetail('Barangays covered', provider.barangaysCovered.join(', ')),
      createProviderDetail('Specialties', specialties),
      createProviderDetail('Years of experience', `${provider.yearsExperience} years`),
      createProviderDetail('Rate', `${formatRate(provider.rate)} ${provider.rateType}`),
      createProviderDetail('Rating', formatRating(provider)),
      createProviderDetail('Typical response', provider.responseTime || 'Usually responds within a day'),
      createProviderDetail('Languages', languages),
      createProviderDetail('Availability', provider.availability)
    );
    serviceDetails.append(serviceTitle, serviceList);

    const contactSection = document.createElement('section');
    contactSection.className = 'profile-section';
    const contactTitle = document.createElement('h2');
    contactTitle.textContent = 'Contact information';
    const contactList = document.createElement('dl');
    contactList.className = 'profile-details';
    contactList.append(
      createProviderDetail('Contact number', provider.contactNumber),
      createProviderDetail('Email', provider.email)
    );
    contactSection.append(contactTitle, contactList);

    const reviewsSection = document.createElement('section');
    reviewsSection.className = 'profile-section reviews-section';
    const reviewsTitle = document.createElement('h2');
    reviewsTitle.textContent = 'User feedback';
    const reviewsList = document.createElement('div');
    reviewsList.className = 'reviews-list';
    const reviews = mergeProviderReviews(provider);
    if (reviews.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'reviews-empty';
      empty.textContent = 'No feedback yet. Ratings appear after residents complete a service request.';
      reviewsList.append(empty);
    } else {
      reviews.forEach((review) => reviewsList.append(createReviewCard(review)));
    }
    reviewsSection.append(reviewsTitle, reviewsList);

    const actions = document.createElement('div');
    actions.className = 'profile-actions';
    const requestLink = document.createElement('a');
    requestLink.className = 'button';
    const requestPath = `request.html?id=${encodeURIComponent(provider.id)}`;
    requestLink.href = auth?.currentUser?.()
      ? requestPath
      : `login.html?next=${encodeURIComponent(requestPath)}`;
    requestLink.textContent = 'Request this Service';
    const backLink = document.createElement('a');
    backLink.className = 'text-link';
    backLink.href = 'providers.html';
    backLink.textContent = 'Back to Providers';
    actions.append(requestLink, backLink);

    profile.append(
      header,
      descriptionSection,
      serviceDetails,
      contactSection,
      reviewsSection,
      actions
    );
    return profile;
  }

  function initializeProviderProfile() {
    const profileContainer = document.querySelector('#provider-profile');
    const notFound = document.querySelector('#provider-not-found');
    if (!profileContainer || !notFound) return;

    if (typeof providers === 'undefined' || !Array.isArray(providers)) {
      notFound.querySelector('p').textContent = 'Provider data is currently unavailable.';
      notFound.hidden = false;
      return;
    }

    const providerId = new URLSearchParams(window.location.search).get('id');
    const provider = providerId ? providers.find((item) => String(item.id) === providerId) : null;
    if (!provider) {
      notFound.hidden = false;
      return;
    }

    profileContainer.append(createProviderProfile(provider));
    profileContainer.hidden = false;
    document.title = `${provider.name} | SerbisyoMo`;
  }

  function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function setRequestFieldError(field, message) {
    const errorMessage = document.querySelector(`#${field.id}-error`);
    if (errorMessage) errorMessage.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateServiceRequest(fields) {
    const errors = {};
    const today = getLocalDateString();
    const name = fields.fullName.value.trim();
    const description = fields.workDescription.value.trim();
    const date = fields.preferredDate.value;

    if (!name) errors.fullName = 'Full name is required.';
    else if (name.length < 2) errors.fullName = 'Please enter your full name.';

    const contact = fields.contactNumber.value.trim();
    if (!contact) errors.contactNumber = 'Contact number is required.';
    else if (!/^09\d{9}$/.test(contact)) {
      errors.contactNumber = 'Enter an 11-digit mobile number starting with 09, like 09123456789.';
    }

    if (!fields.category.value) errors.category = 'Please select the type of service you need.';

    if (!description) errors.workDescription = 'Please describe the work you need.';
    else if (description.length < 10) {
      errors.workDescription = 'Add a few more details so the provider understands the job (at least 10 characters).';
    }

    if (!fields.barangay.value) errors.barangay = 'Please select your location or barangay.';

    if (!date) errors.preferredDate = 'Please choose a preferred date.';
    else if (date < today) errors.preferredDate = 'Preferred date cannot be in the past.';

    return errors;
  }

  function showRequestFeedback(feedback, message, isError = false, linkText = '') {
    feedback.replaceChildren();
    feedback.className = isError ? 'request-feedback is-error' : 'request-feedback';
    const text = document.createElement('p');
    text.textContent = message;
    feedback.append(text);
    if (linkText) {
      const link = document.createElement('a');
      link.href = 'requests.html';
      link.className = 'button';
      link.textContent = linkText;
      feedback.append(link);
    }
  }

  function initializeServiceRequestForm() {
    const form = document.querySelector('#service-request-form');
    if (!form) return;

    const feedback = document.querySelector('#request-feedback');
    const providerMessage = document.querySelector('#request-provider');

    // Only signed-in residents may send a request.
    const accessUser = auth?.currentUser?.();
    if (!getResidentUser()) {
      form.hidden = true;
      form.style.display = 'none';
      form.addEventListener('submit', (event) => event.preventDefault());
      if (providerMessage) providerMessage.textContent = '';
      feedback.replaceChildren(createAccessGate(accessUser, 'request a service'));
      return;
    }

    const barangaySelect = document.querySelector('#requester-barangay');
    const preferredDate = document.querySelector('#preferred-date');
    preferredDate.min = getLocalDateString();

    if (typeof providers === 'undefined' || !Array.isArray(providers)) {
      showRequestFeedback(feedback, 'Provider information is currently unavailable. Please try again later.', true);
      form.querySelector('button[type="submit"]').disabled = true;
      return;
    }

    const barangays = [...new Set(providers.flatMap((provider) => provider.barangaysCovered))].sort((a, b) =>
      a.localeCompare(b)
    );
    barangays.forEach((barangay) => barangaySelect.add(new Option(barangay, barangay)));

    const providerId = new URLSearchParams(window.location.search).get('id');
    const selectedProvider = providerId
      ? providers.find((provider) => String(provider.id) === providerId)
      : null;
    const categorySelect = document.querySelector('#service-category');
    const user = auth?.currentUser?.();

    if (selectedProvider) {
      providerMessage.textContent = `Requesting service from ${selectedProvider.name}`;
      categorySelect.value = selectedProvider.category;
    } else if (providerId) {
      providerMessage.textContent =
        'The selected provider could not be found. You can still send a general service request.';
    } else {
      providerMessage.textContent = 'You can send a general service request or select a provider later.';
    }

    // Prefill from the signed-in profile so residents do not retype details.
    let profileNote = null;
    const applyPrefill = () => {
      if (selectedProvider) categorySelect.value = selectedProvider.category;
      if (!user) return;
      if (form.elements.fullName) form.elements.fullName.value = user.name || '';
      if (form.elements.contactNumber) form.elements.contactNumber.value = user.contact || '';
      if (form.elements.barangay && user.barangay) {
        const match = [...barangaySelect.options].find(
          (option) => option.value && option.value.toLowerCase() === user.barangay.toLowerCase()
        );
        if (match) {
          barangaySelect.value = match.value;
        } else {
          // Keep the saved barangay even if it is not in the demo list.
          barangaySelect.add(new Option(user.barangay, user.barangay, true, true));
        }
      }
      if (!profileNote) {
        profileNote = document.createElement('p');
        profileNote.className = 'request-profile-note';
        const link = document.createElement('a');
        link.href = 'account.html';
        link.textContent = 'Edit profile';
        profileNote.append(document.createTextNode('Details filled from your profile. '), link);
        providerMessage.insertAdjacentElement('afterend', profileNote);
      }
    };
    applyPrefill();

    const fields = {
      fullName: form.elements.fullName,
      contactNumber: form.elements.contactNumber,
      category: form.elements.category,
      workDescription: form.elements.workDescription,
      barangay: form.elements.barangay,
      preferredDate: form.elements.preferredDate
    };

    // Keep the contact number to digits only (max 11) while typing or pasting.
    fields.contactNumber.addEventListener('input', () => {
      const digits = fields.contactNumber.value.replace(/\D/g, '').slice(0, 11);
      if (digits !== fields.contactNumber.value) fields.contactNumber.value = digits;
    });

    Object.values(fields).forEach((field) => {
      const clearError = () => setRequestFieldError(field, '');
      field.addEventListener('input', clearError);
      field.addEventListener('change', clearError);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      feedback.replaceChildren();
      feedback.className = 'request-feedback';

      const errors = validateServiceRequest(fields);
      Object.entries(fields).forEach(([key, field]) => setRequestFieldError(field, errors[key] || ''));
      const firstInvalidField = Object.values(fields).find(
        (field) => field.getAttribute('aria-invalid') === 'true'
      );
      if (firstInvalidField) {
        firstInvalidField.focus();
        return;
      }

      // The session may have ended in another tab since the page loaded.
      const currentUser = getResidentUser();
      if (!currentUser) {
        form.hidden = true;
        form.style.display = 'none';
        feedback.replaceChildren(createAccessGate(auth?.currentUser?.(), 'request a service'));
        return;
      }
      const serviceRequest = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userId: currentUser.id,
        providerId: selectedProvider ? selectedProvider.id : null,
        providerName: selectedProvider ? selectedProvider.name : null,
        fullName: fields.fullName.value.trim(),
        contactNumber: fields.contactNumber.value.trim(),
        category: fields.category.value,
        workDescription: fields.workDescription.value.trim(),
        barangay: fields.barangay.value,
        preferredDate: fields.preferredDate.value,
        status: 'Pending',
        providerNote: '',
        quoteAmount: null,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      try {
        store.addRequest(serviceRequest);
      } catch (error) {
        console.error('Could not save the service request.', error);
        showRequestFeedback(
          feedback,
          "We couldn't save your request on this device. Please check browser storage and try again.",
          true
        );
        return;
      }

      form.reset();
      preferredDate.min = getLocalDateString();
      Object.values(fields).forEach((field) => setRequestFieldError(field, ''));

      // Replace the form with a clear confirmation instead of leaving a blank form behind.
      form.hidden = true;
      form.style.display = 'none';
      if (profileNote) profileNote.hidden = true;
      showRequestFeedback(feedback, 'Request submitted successfully.', false, 'View My Requests');
      const another = document.createElement('button');
      another.type = 'button';
      another.className = 'text-link request-another';
      another.textContent = 'Send another request';
      another.addEventListener('click', () => {
        applyPrefill();
        form.hidden = false;
        form.style.display = '';
        if (profileNote) profileNote.hidden = false;
        feedback.replaceChildren();
        feedback.className = 'request-feedback';
        fields.workDescription.focus();
      });
      feedback.append(another);
      feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
      common?.showToast?.('Request saved on this device.', 'success');
    });
  }

  function formatRequestDate(value) {
    const dateOnly = typeof value === 'string' && /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    const date = dateOnly
      ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
      : new Date(value);
    if (Number.isNaN(date.getTime())) return value || 'Not provided';
    return new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  function createServiceRequestCard(serviceRequest) {
    const card = document.createElement('article');
    card.className = 'request-history-card';

    const header = document.createElement('header');
    header.className = 'request-history-header';

    const titleGroup = document.createElement('div');
    const providerName = document.createElement('h2');
    providerName.className = 'request-history-provider';
    providerName.textContent = serviceRequest.providerName || 'General service request';
    const category = document.createElement('span');
    category.className = 'category-label';
    category.textContent = serviceRequest.category || 'Service';
    titleGroup.append(providerName, category);

    const status = document.createElement('span');
    const statusValue = requestStatuses.includes(serviceRequest.status)
      ? serviceRequest.status
      : 'Pending';
    status.className = `status-badge status-${statusValue.toLowerCase()}`;
    const statusPrefix = document.createElement('span');
    statusPrefix.className = 'visually-hidden';
    statusPrefix.textContent = 'Status: ';
    status.append(statusPrefix, statusValue);
    header.append(titleGroup, status);

    const details = document.createElement('dl');
    details.className = 'request-history-details';
    details.append(
      createProviderDetail('Type of service', serviceRequest.category || 'Not provided'),
      createProviderDetail('Location', serviceRequest.barangay || 'Not provided'),
      createProviderDetail('Preferred date', formatRequestDate(serviceRequest.preferredDate)),
      createProviderDetail('Date submitted', formatRequestDate(serviceRequest.submittedAt)),
      createProviderDetail('Work description', serviceRequest.workDescription || 'Not provided')
    );

    if (serviceRequest.quoteAmount != null && serviceRequest.quoteAmount !== '') {
      details.append(
        createProviderDetail(
          'Quoted amount',
          formatRate(Number(serviceRequest.quoteAmount))
        )
      );
    }
    if (serviceRequest.providerNote) {
      details.append(createProviderDetail('Provider note', serviceRequest.providerNote));
    }

    // Declined: show the provider's reason so the resident knows why.
    let declineBox = null;
    if (statusValue === 'Declined') {
      declineBox = document.createElement('div');
      declineBox.className = 'decline-reason';
      const declineTitle = document.createElement('p');
      declineTitle.className = 'decline-reason-title';
      declineTitle.textContent = 'Reason for declining';
      const declineBody = document.createElement('p');
      declineBody.className = 'decline-reason-body';
      const reasonText = [serviceRequest.declineReason, serviceRequest.declineMessage]
        .filter(Boolean)
        .join(': ');
      declineBody.textContent =
        reasonText || 'The provider did not leave a reason. You can try another provider.';
      declineBox.append(declineTitle, declineBody);
    }

    const actions = document.createElement('div');
    actions.className = 'request-history-actions';
    if (statusValue === 'Pending') {
      const cancelButton = document.createElement('button');
      cancelButton.className = 'button cancel-request';
      cancelButton.type = 'button';
      cancelButton.dataset.requestId = String(serviceRequest.id);
      cancelButton.textContent = 'Cancel Request';
      actions.append(cancelButton);
    }

    card.append(header, details);
    if (declineBox) card.append(declineBox);
    card.append(actions);

    if (statusValue === 'Completed' && serviceRequest.providerId) {
      const alreadyRated =
        typeof store.hasFeedbackForRequest === 'function' &&
        store.hasFeedbackForRequest(serviceRequest.id);
      if (alreadyRated) {
        const doneNote = document.createElement('p');
        doneNote.className = 'request-feedback-done';
        doneNote.textContent = 'You already rated this completed service. Thank you!';
        card.append(doneNote);
      } else {
        const feedbackForm = createRequestFeedbackForm(serviceRequest, () => {
          // Replace the form with a confirmation after submit.
          const parent = feedbackForm.parentElement;
          if (parent) {
            const doneNote = document.createElement('p');
            doneNote.className = 'request-feedback-done';
            doneNote.textContent = 'You already rated this completed service. Thank you!';
            feedbackForm.replaceWith(doneNote);
          }
        });
        if (feedbackForm) card.append(feedbackForm);
      }
    }

    return card;
  }

  function renderServiceRequests(requestsList, serviceRequests) {
    if (serviceRequests.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'requests-empty-state';
      const message = document.createElement('h2');
      message.textContent = 'No requests yet';
      const prompt = document.createElement('p');
      prompt.textContent = 'When you submit a service request, it will appear here.';
      const providersLink = document.createElement('a');
      providersLink.className = 'button';
      providersLink.href = 'providers.html';
      providersLink.textContent = 'Browse Providers';
      emptyState.append(message, prompt, providersLink);
      requestsList.replaceChildren(emptyState);
      return;
    }
    const newestFirst = [...serviceRequests].sort((first, second) => {
      const firstDate = new Date(first.submittedAt).getTime() || 0;
      const secondDate = new Date(second.submittedAt).getTime() || 0;
      return secondDate - firstDate;
    });
    requestsList.replaceChildren(...newestFirst.map(createServiceRequestCard));
  }

  function initializeRequestsPage() {
    const requestsList = document.querySelector('#requests-list');
    if (!requestsList) return;

    // Requests are private: only a signed-in resident sees their own.
    if (!getResidentUser()) {
      requestsList.replaceChildren(createAccessGate(auth?.currentUser?.(), 'view your requests'));
      return;
    }

    const refreshRequests = () => {
      try {
        const user = getResidentUser();
        if (!user) {
          requestsList.replaceChildren(createAccessGate(auth?.currentUser?.(), 'view your requests'));
          return;
        }
        const list = store.getRequests().filter((item) => isRequestOwnedBy(item, user));
        renderServiceRequests(requestsList, list);
      } catch (error) {
        console.error('Could not load saved service requests.', error);
        const message = document.createElement('p');
        message.className = 'requests-empty-state requests-storage-error';
        message.textContent =
          'Your saved requests could not be read or updated. Check browser storage and try again.';
        requestsList.replaceChildren(message);
      }
    };

    requestsList.addEventListener('click', (event) => {
      const cancelButton = event.target.closest('.cancel-request');
      if (!cancelButton) return;
      const user = getResidentUser();
      const target = store.getRequests().find((item) => item.id === cancelButton.dataset.requestId);
      if (!isRequestOwnedBy(target, user)) {
        refreshRequests();
        return;
      }
      if (!window.confirm('Are you sure you want to cancel this request?')) return;
      try {
        store.updateRequest(cancelButton.dataset.requestId, { status: 'Cancelled' });
        refreshRequests();
        requestsList.focus();
        common?.showToast?.('Request cancelled.', 'info');
      } catch (error) {
        console.error('Could not cancel the service request.', error);
        common?.showToast?.('Could not cancel this request.', 'error');
      }
    });

    refreshRequests();
  }

  function initializeFavoritesPage() {
    const grid = document.querySelector('#favorites-grid');
    if (!grid) return;

    const user = auth?.currentUser?.();
    if (!user || user.role !== 'resident') {
      const note = document.createElement('div');
      note.className = 'requests-empty-state';
      const title = document.createElement('h2');
      title.textContent = 'Log in to see favorites';
      const text = document.createElement('p');
      text.textContent = 'Save providers while browsing, then return here to open them quickly.';
      const link = document.createElement('a');
      link.className = 'button';
      link.href = 'login.html?next=favorites.html';
      link.textContent = 'Log in';
      note.append(title, text, link);
      grid.replaceChildren(note);
      return;
    }

    if (typeof providers === 'undefined' || !Array.isArray(providers)) {
      grid.textContent = 'Provider listings are currently unavailable.';
      return;
    }

    const ids = store.getFavorites(user.id);
    const saved = providers.filter((provider) => ids.includes(String(provider.id)));
    if (!saved.length) {
      const note = document.createElement('div');
      note.className = 'requests-empty-state';
      const title = document.createElement('h2');
      title.textContent = 'No favorites yet';
      const text = document.createElement('p');
      text.textContent = 'Use the Save button on a provider card or profile to add them here.';
      const link = document.createElement('a');
      link.className = 'button';
      link.href = 'providers.html';
      link.textContent = 'Browse Providers';
      note.append(title, text, link);
      grid.replaceChildren(note);
      return;
    }
    grid.replaceChildren(...saved.map(createProviderCard));
  }

  function initializeLoginPage() {
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    if (!loginForm && !registerForm) return;

    const next = common?.getSafeNextPath?.('index.html') || 'index.html';
    common?.wireAuthSwitchLinks?.(next);

    const roleFields = document.querySelectorAll('[data-role-fields]');
    const syncRoleFields = (role) => {
      const selected = role === 'provider' ? 'provider' : 'resident';
      roleFields.forEach((block) => {
        const forRole = block.getAttribute('data-role-fields');
        const show = forRole === selected;
        block.hidden = !show;
        if (show) block.removeAttribute('hidden');
        else block.setAttribute('hidden', '');
        block.style.display = show ? '' : 'none';
        block.querySelectorAll('input, select, textarea').forEach((input) => {
          input.disabled = !show;
          if (!show) {
            input.removeAttribute('required');
            // Clear provider-only values when switching back to resident.
            if (forRole === 'provider' && input.name === 'businessName') input.value = '';
            if (forRole === 'provider' && input.name === 'providerId') input.value = '';
          } else if (input.dataset.requiredWhenVisible === 'true') {
            input.required = true;
          }
        });
      });
    };

    document.querySelectorAll('input[name="role"]').forEach((input) => {
      input.addEventListener('change', () => {
        if (input.checked) syncRoleFields(input.value);
      });
    });
    const checkedRole = document.querySelector('input[name="role"]:checked');
    syncRoleFields(checkedRole ? checkedRole.value : 'resident');

    if (loginForm) {
      const error = document.querySelector('#login-error');
      // Prefill email + role from the last signup or successful login.
      const hint = auth?.getLoginHint?.();
      if (hint) {
        if (loginForm.elements.email && !loginForm.elements.email.value) {
          loginForm.elements.email.value = hint.email;
        }
        const roleInput = loginForm.querySelector(`input[name="role"][value="${hint.role}"]`);
        if (roleInput) {
          roleInput.checked = true;
          roleInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (error) error.textContent = '';
        const email = String(loginForm.elements.email.value || '').trim();
        const password = String(loginForm.elements.password.value || '');
        const roleEl = loginForm.querySelector('input[name="role"]:checked');
        const role = roleEl ? roleEl.value : 'resident';
        const remember = Boolean(loginForm.elements.remember?.checked);
        try {
          if (!auth) throw new Error('Authentication is unavailable.');
          const user = await auth.login({ email, password, role, remember });
          const destination =
            user.role === 'provider'
              ? 'provider-dashboard.html'
              : next === 'login.html' || next === 'signup.html'
                ? 'index.html'
                : next;
          window.location.href = destination;
        } catch (err) {
          if (error) error.textContent = err.message || 'Could not log in.';
        }
      });
    }

    if (registerForm) {
      const error = document.querySelector('#register-error');
      // Optional: fill provider business list from demo data.
      const providerSelect = registerForm.querySelector('#register-provider-link');
      if (providerSelect && typeof providers !== 'undefined' && Array.isArray(providers)) {
        providers
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .forEach((provider) => {
            providerSelect.add(new Option(`${provider.name} (${provider.category})`, String(provider.id)));
          });
      }

      registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (error) error.textContent = '';
        const role = registerForm.elements.role?.value || 'resident';
        try {
          if (!auth) throw new Error('Authentication is unavailable.');
          const roleEl = registerForm.querySelector('input[name="role"]:checked');
          const selectedRole = roleEl ? roleEl.value : role;
          const user = await auth.register(
            {
              role: selectedRole,
              name: String(registerForm.elements.name.value || '').trim(),
              email: String(registerForm.elements.email.value || '').trim(),
              contact: String(registerForm.elements.contact?.value || '').trim(),
              barangay: String(registerForm.elements.barangay?.value || '').trim(),
              businessName: String(registerForm.elements.businessName?.value || '').trim(),
              providerId: registerForm.elements.providerId?.value || null
            },
            String(registerForm.elements.password.value || '')
          );
          window.location.href =
            user.role === 'provider' ? 'provider-dashboard.html' : next === 'signup.html' ? 'index.html' : next;
        } catch (err) {
          if (error) error.textContent = err.message || 'Could not create account.';
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initializeProviderDirectory();
    initializeProviderProfile();
    initializeServiceRequestForm();
    initializeRequestsPage();
    initializeFavoritesPage();
    initializeLoginPage();
  });
})();
