// Build each card with DOM text nodes so provider content is rendered as text.
function createProviderCard(provider) {
  const card = document.createElement("article");
  card.className = "provider-card";

  const cardHeader = document.createElement("div");
  cardHeader.className = "provider-card-header";

  const name = document.createElement("h2");
  name.className = "provider-name";
  name.textContent = provider.name;

  const category = document.createElement("span");
  category.className = "category-label";
  category.textContent = provider.category;

  const description = document.createElement("p");
  description.className = "provider-description";
  description.textContent = provider.description;

  cardHeader.append(name, category);

  const details = document.createElement("dl");
  details.className = "provider-details";
  details.append(
    createProviderDetail("Barangays covered", provider.barangaysCovered.join(", ")),
    createProviderDetail("Experience", `${provider.yearsExperience} years`),
    createProviderDetail("Rate", `${formatRate(provider.rate)} ${provider.rateType}`),
    createProviderDetail("Availability", provider.availability)
  );

  const profileLink = document.createElement("a");
  profileLink.className = "button provider-button";
  profileLink.href = `profile.html?id=${encodeURIComponent(provider.id)}`;
  profileLink.textContent = "View Profile";

  card.append(cardHeader, description, details, profileLink);
  return card;
}

// Each definition and value pair is grouped for readable, accessible card details.
function createProviderDetail(label, value) {
  const detail = document.createElement("div");
  detail.className = "provider-detail";

  const term = document.createElement("dt");
  term.textContent = label;

  const description = document.createElement("dd");
  description.textContent = value;

  detail.append(term, description);
  return detail;
}

// Format numbers as Philippine pesos without hard-coding separators.
function formatRate(rate) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(rate);
}

// Make category URL values comparable to labels such as "Appliance Repair".
function normalizeCategory(category) {
  return category.trim().toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ");
}

// Add options based on the available data so new values appear automatically.
function populateFilterOptions(categoryFilter, barangayFilter) {
  const categories = [...new Set(providers.map((provider) => provider.category))]
    .sort((first, second) => first.localeCompare(second));
  const barangays = [...new Set(providers.flatMap((provider) => provider.barangaysCovered))]
    .sort((first, second) => first.localeCompare(second));

  categories.forEach((category) => {
    categoryFilter.add(new Option(category, category));
  });
  barangays.forEach((barangay) => {
    barangayFilter.add(new Option(barangay, barangay));
  });
}

// The home page may link here with a lowercase, hyphenated category query.
function applyCategoryFromUrl(categoryFilter) {
  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  if (!requestedCategory) {
    return;
  }

  const matchingCategory = [...categoryFilter.options].find(
    (option) => normalizeCategory(option.value) === normalizeCategory(requestedCategory)
  );
  if (matchingCategory) {
    categoryFilter.value = matchingCategory.value;
  }
}

// Test all active filters together; an empty selection leaves that dimension unrestricted.
function filterProviders(searchTerm, category, barangay, priceRange) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return providers.filter((provider) => {
    const matchesSearch = !normalizedSearch
      || [provider.name, provider.description, provider.category]
        .some((value) => value.toLowerCase().includes(normalizedSearch));
    const matchesCategory = !category || provider.category === category;
    const matchesBarangay = !barangay || provider.barangaysCovered.includes(barangay);
    const matchesPrice = !priceRange
      || (priceRange === "below-300" && provider.rate < 300)
      || (priceRange === "300-600" && provider.rate >= 300 && provider.rate <= 600)
      || (priceRange === "above-600" && provider.rate > 600);

    return matchesSearch && matchesCategory && matchesBarangay && matchesPrice;
  });
}

// Update the cards and result count whenever any filter value changes.
function renderProviders(providerGrid, providerCount, filteredProviders) {
  providerCount.textContent = `Found ${filteredProviders.length} of ${providers.length} providers`;

  if (filteredProviders.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "no-providers";
    emptyMessage.textContent = "No providers found. Try adjusting or clearing your filters.";
    providerGrid.replaceChildren(emptyMessage);
    return;
  }

  providerGrid.replaceChildren(...filteredProviders.map(createProviderCard));
}

function initializeProviderDirectory() {
  const providerGrid = document.querySelector("#provider-grid");
  if (!providerGrid) {
    return;
  }

  const providerCount = document.querySelector("#provider-count");
  const searchInput = document.querySelector("#provider-search");
  const categoryFilter = document.querySelector("#category-filter");
  const barangayFilter = document.querySelector("#barangay-filter");
  const priceFilter = document.querySelector("#price-filter");
  const clearFiltersButton = document.querySelector("#clear-filters");
  const filterForm = document.querySelector("#provider-filters");

  if (typeof providers === "undefined" || !Array.isArray(providers)) {
    providerGrid.textContent = "Provider listings are currently unavailable.";
    providerCount.textContent = "";
    return;
  }

  populateFilterOptions(categoryFilter, barangayFilter);
  applyCategoryFromUrl(categoryFilter);
  filterForm.addEventListener("submit", (event) => event.preventDefault());

  const updateResults = () => {
    const filteredProviders = filterProviders(
      searchInput.value,
      categoryFilter.value,
      barangayFilter.value,
      priceFilter.value
    );
    renderProviders(providerGrid, providerCount, filteredProviders);
  };

  searchInput.addEventListener("input", updateResults);
  categoryFilter.addEventListener("change", updateResults);
  barangayFilter.addEventListener("change", updateResults);
  priceFilter.addEventListener("change", updateResults);
  clearFiltersButton.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "";
    barangayFilter.value = "";
    priceFilter.value = "";

    // Remove the initial category query so a refresh keeps the cleared state.
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("category");
    window.history.replaceState(null, "", currentUrl);
    updateResults();
  });

  updateResults();
}

// Build the profile header, detail sections, and request link for one provider.
function createProviderProfile(provider) {
  const profile = document.createElement("div");
  profile.className = "profile-content";

  const header = document.createElement("header");
  header.className = "profile-header";

  const titleGroup = document.createElement("div");
  const name = document.createElement("h1");
  name.className = "profile-name";
  name.textContent = provider.name;

  const category = document.createElement("span");
  category.className = "category-label";
  category.textContent = provider.category;
  titleGroup.append(name, category);

  const descriptionSection = document.createElement("section");
  descriptionSection.className = "profile-section";
  const descriptionTitle = document.createElement("h2");
  descriptionTitle.textContent = "About this service";
  const description = document.createElement("p");
  description.textContent = provider.description;
  descriptionSection.append(descriptionTitle, description);

  const serviceDetails = document.createElement("section");
  serviceDetails.className = "profile-section";
  const serviceTitle = document.createElement("h2");
  serviceTitle.textContent = "Service details";
  const serviceList = document.createElement("dl");
  serviceList.className = "profile-details";
  serviceList.append(
    createProviderDetail("Barangays covered", provider.barangaysCovered.join(", ")),
    createProviderDetail("Years of experience", `${provider.yearsExperience} years`),
    createProviderDetail("Rate", `${formatRate(provider.rate)} ${provider.rateType}`),
    createProviderDetail("Availability", provider.availability)
  );
  serviceDetails.append(serviceTitle, serviceList);

  const contactSection = document.createElement("section");
  contactSection.className = "profile-section";
  const contactTitle = document.createElement("h2");
  contactTitle.textContent = "Contact information";
  const contactList = document.createElement("dl");
  contactList.className = "profile-details";
  contactList.append(
    createProviderDetail("Contact number", provider.contactNumber),
    createProviderDetail("Email", provider.email)
  );
  contactSection.append(contactTitle, contactList);

  const actions = document.createElement("div");
  actions.className = "profile-actions";
  const requestLink = document.createElement("a");
  requestLink.className = "button";
  requestLink.href = `request.html?id=${encodeURIComponent(provider.id)}`;
  requestLink.textContent = "Request this Service";

  const backLink = document.createElement("a");
  backLink.className = "text-link";
  backLink.href = "providers.html";
  backLink.textContent = "Back to Providers";
  actions.append(requestLink, backLink);

  header.append(titleGroup);
  profile.append(header, descriptionSection, serviceDetails, contactSection, actions);
  return profile;
}

// Show a provider profile when the URL contains a matching ID, otherwise show recovery links.
function initializeProviderProfile() {
  const profileContainer = document.querySelector("#provider-profile");
  const notFound = document.querySelector("#provider-not-found");
  if (!profileContainer || !notFound) {
    return;
  }

  if (typeof providers === "undefined" || !Array.isArray(providers)) {
    notFound.querySelector("p").textContent = "Provider data is currently unavailable.";
    notFound.hidden = false;
    return;
  }

  const providerId = new URLSearchParams(window.location.search).get("id");
  const provider = providerId
    ? providers.find((item) => String(item.id) === providerId)
    : null;

  if (!provider) {
    notFound.hidden = false;
    return;
  }

  profileContainer.append(createProviderProfile(provider));
  profileContainer.hidden = false;
}

// Use local calendar time so the minimum date is correct in the resident's timezone.
function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Show or clear one field's inline validation message.
function setRequestFieldError(field, message) {
  const errorMessage = document.querySelector(`#${field.id}-error`);
  errorMessage.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

// Validate the full request before touching localStorage.
function validateServiceRequest(fields) {
  const errors = {};
  const today = getLocalDateString();

  if (!fields.fullName.value.trim()) {
    errors.fullName = "Please enter your full name.";
  }
  if (!/^\d{11}$/.test(fields.contactNumber.value.trim())) {
    errors.contactNumber = "Enter a contact number with exactly 11 digits.";
  }
  if (!fields.category.value) {
    errors.category = "Please select a service category.";
  }
  if (!fields.workDescription.value.trim()) {
    errors.workDescription = "Please describe the work you need.";
  }
  if (!fields.barangay.value) {
    errors.barangay = "Please select a barangay.";
  }
  if (!fields.preferredDate.value) {
    errors.preferredDate = "Please choose a preferred date.";
  } else if (fields.preferredDate.value < today) {
    errors.preferredDate = "Preferred date cannot be in the past.";
  }

  return errors;
}

// Display a form-level status without injecting user-provided HTML.
function showRequestFeedback(feedback, message, isError = false, linkText = "") {
  feedback.replaceChildren();
  feedback.className = isError ? "request-feedback is-error" : "request-feedback";

  const messageParagraph = document.createElement("p");
  messageParagraph.textContent = message;
  feedback.append(messageParagraph);

  if (linkText) {
    const link = document.createElement("a");
    link.href = "requests.html";
    link.textContent = linkText;
    feedback.append(link);
  }
}

// Populate the location dropdown from provider coverage and connect form submission.
function initializeServiceRequestForm() {
  const form = document.querySelector("#service-request-form");
  if (!form) {
    return;
  }

  const feedback = document.querySelector("#request-feedback");
  const providerMessage = document.querySelector("#request-provider");
  const barangaySelect = document.querySelector("#requester-barangay");
  const preferredDate = document.querySelector("#preferred-date");
  preferredDate.min = getLocalDateString();

  if (typeof providers === "undefined" || !Array.isArray(providers)) {
    showRequestFeedback(feedback, "Provider information is currently unavailable. Please try again later.", true);
    form.querySelector('button[type="submit"]').disabled = true;
    return;
  }

  const barangays = [...new Set(providers.flatMap((provider) => provider.barangaysCovered))]
    .sort((first, second) => first.localeCompare(second));
  barangays.forEach((barangay) => {
    barangaySelect.add(new Option(barangay, barangay));
  });

  const providerId = new URLSearchParams(window.location.search).get("id");
  const selectedProvider = providerId
    ? providers.find((provider) => String(provider.id) === providerId)
    : null;
  const categorySelect = document.querySelector("#service-category");

  if (selectedProvider) {
    providerMessage.textContent = `Requesting service from ${selectedProvider.name}`;
    categorySelect.value = selectedProvider.category;
  } else if (providerId) {
    providerMessage.textContent = "The selected provider could not be found. You can still send a general service request.";
  } else {
    providerMessage.textContent = "You can send a general service request or select a provider later.";
  }

  const fields = {
    fullName: form.elements.fullName,
    contactNumber: form.elements.contactNumber,
    category: form.elements.category,
    workDescription: form.elements.workDescription,
    barangay: form.elements.barangay,
    preferredDate: form.elements.preferredDate
  };

  Object.values(fields).forEach((field) => {
    const clearError = () => setRequestFieldError(field, "");
    field.addEventListener("input", clearError);
    field.addEventListener("change", clearError);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.replaceChildren();
    feedback.className = "request-feedback";

    const errors = validateServiceRequest(fields);
    Object.entries(fields).forEach(([key, field]) => {
      setRequestFieldError(field, errors[key] || "");
    });

    const firstInvalidField = Object.values(fields).find(
      (field) => field.getAttribute("aria-invalid") === "true"
    );
    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    const serviceRequest = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      providerId: selectedProvider ? selectedProvider.id : null,
      providerName: selectedProvider ? selectedProvider.name : null,
      fullName: fields.fullName.value.trim(),
      contactNumber: fields.contactNumber.value.trim(),
      category: fields.category.value,
      workDescription: fields.workDescription.value.trim(),
      barangay: fields.barangay.value,
      preferredDate: fields.preferredDate.value,
      status: "Pending",
      submittedAt: new Date().toISOString()
    };

    try {
      const savedRequests = localStorage.getItem("serviceRequests");
      const serviceRequests = savedRequests === null ? [] : JSON.parse(savedRequests);
      if (!Array.isArray(serviceRequests)) {
        throw new TypeError("Saved service requests must be an array.");
      }

      serviceRequests.push(serviceRequest);
      localStorage.setItem("serviceRequests", JSON.stringify(serviceRequests));
    } catch (error) {
      console.error("Could not save the service request.", error);
      showRequestFeedback(
        feedback,
        "We couldn't save your request on this device. Please check browser storage and try again.",
        true
      );
      return;
    }

    form.reset();
    preferredDate.min = getLocalDateString();
    Object.values(fields).forEach((field) => setRequestFieldError(field, ""));
    showRequestFeedback(
      feedback,
      "Request submitted successfully.",
      false,
      "View My Requests"
    );
  });
}

const requestStatuses = ["Pending", "Quoted", "Accepted", "Declined", "Completed"];

// Format stored date values for display while preserving an understandable fallback.
function formatRequestDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value || "Not provided";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

// Create one request card using text nodes for all saved user-entered values.
function createServiceRequestCard(serviceRequest) {
  const card = document.createElement("article");
  card.className = "request-history-card";

  const header = document.createElement("header");
  header.className = "request-history-header";

  const titleGroup = document.createElement("div");
  const providerName = document.createElement("h2");
  providerName.className = "request-history-provider";
  providerName.textContent = serviceRequest.providerName || "General service request";

  const category = document.createElement("span");
  category.className = "category-label";
  category.textContent = serviceRequest.category || "Service";
  titleGroup.append(providerName, category);

  const status = document.createElement("span");
  const statusValue = requestStatuses.includes(serviceRequest.status)
    ? serviceRequest.status
    : "Pending";
  status.className = `status-badge status-${statusValue.toLowerCase()}`;
  status.textContent = statusValue;
  status.setAttribute("aria-label", `Status: ${statusValue}`);
  header.append(titleGroup, status);

  const details = document.createElement("dl");
  details.className = "request-history-details";
  details.append(
    createProviderDetail("Type of service", serviceRequest.category || "Not provided"),
    createProviderDetail("Location", serviceRequest.barangay || "Not provided"),
    createProviderDetail("Preferred date", formatRequestDate(serviceRequest.preferredDate)),
    createProviderDetail("Date submitted", formatRequestDate(serviceRequest.submittedAt)),
    createProviderDetail("Work description", serviceRequest.workDescription || "Not provided")
  );

  const actions = document.createElement("div");
  actions.className = "request-history-actions";

  const demoField = document.createElement("div");
  demoField.className = "request-status-demo";
  const demoLabel = document.createElement("label");
  demoLabel.textContent = "Demo: change status";
  demoLabel.htmlFor = `request-status-${serviceRequest.id}`;
  const demoSelect = document.createElement("select");
  demoSelect.id = `request-status-${serviceRequest.id}`;
  demoSelect.dataset.requestId = String(serviceRequest.id);
  requestStatuses.forEach((value) => {
    demoSelect.add(new Option(value, value));
  });
  demoSelect.value = statusValue;
  demoField.append(demoLabel, demoSelect);
  actions.append(demoField);

  if (statusValue === "Pending") {
    const cancelButton = document.createElement("button");
    cancelButton.className = "button cancel-request";
    cancelButton.type = "button";
    cancelButton.dataset.requestId = String(serviceRequest.id);
    cancelButton.textContent = "Cancel Request";
    actions.append(cancelButton);
  }

  card.append(header, details, actions);
  return card;
}

// Read and validate the localStorage format before rendering or updating requests.
function readServiceRequests() {
  const savedRequests = localStorage.getItem("serviceRequests");
  if (savedRequests === null) {
    return [];
  }

  const serviceRequests = JSON.parse(savedRequests);
  if (!Array.isArray(serviceRequests)) {
    throw new TypeError("Saved service requests must be an array.");
  }
  return serviceRequests;
}

function showRequestsStorageError(requestsList) {
  const message = document.createElement("p");
  message.className = "requests-empty-state requests-storage-error";
  message.textContent = "Your saved requests could not be read or updated. Check browser storage and try again.";
  requestsList.replaceChildren(message);
}

// Render newest requests first; an empty list includes a link back to the directory.
function renderServiceRequests(requestsList, serviceRequests) {
  if (serviceRequests.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "requests-empty-state";
    const message = document.createElement("h2");
    message.textContent = "No requests yet";
    const prompt = document.createElement("p");
    prompt.textContent = "When you submit a service request, it will appear here.";
    const providersLink = document.createElement("a");
    providersLink.className = "button";
    providersLink.href = "providers.html";
    providersLink.textContent = "Browse Providers";
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

// Update only the selected request's status and persist the full list.
function updateServiceRequestStatus(requestId, status) {
  const serviceRequests = readServiceRequests();
  const request = serviceRequests.find((item) => String(item.id) === requestId);
  if (!request || !requestStatuses.includes(status)) {
    throw new Error("The selected service request or status is invalid.");
  }

  request.status = status;
  localStorage.setItem("serviceRequests", JSON.stringify(serviceRequests));
  return serviceRequests;
}

function initializeRequestsPage() {
  const requestsList = document.querySelector("#requests-list");
  if (!requestsList) {
    return;
  }

  const refreshRequests = () => {
    try {
      renderServiceRequests(requestsList, readServiceRequests());
    } catch (error) {
      console.error("Could not load saved service requests.", error);
      showRequestsStorageError(requestsList);
    }
  };

  requestsList.addEventListener("change", (event) => {
    const statusSelect = event.target.closest(".request-status-demo select");
    if (!statusSelect) {
      return;
    }

    try {
      const serviceRequests = updateServiceRequestStatus(
        statusSelect.dataset.requestId,
        statusSelect.value
      );
      renderServiceRequests(requestsList, serviceRequests);
    } catch (error) {
      console.error("Could not update the service request status.", error);
      showRequestsStorageError(requestsList);
    }
  });

  requestsList.addEventListener("click", (event) => {
    const cancelButton = event.target.closest(".cancel-request");
    if (!cancelButton) {
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this request?")) {
      return;
    }

    try {
      const serviceRequests = readServiceRequests();
      const remainingRequests = serviceRequests.filter(
        (item) => String(item.id) !== cancelButton.dataset.requestId
      );
      if (remainingRequests.length === serviceRequests.length) {
        throw new Error("The selected service request could not be found.");
      }

      localStorage.setItem("serviceRequests", JSON.stringify(remainingRequests));
      renderServiceRequests(requestsList, remainingRequests);
    } catch (error) {
      console.error("Could not cancel the service request.", error);
      showRequestsStorageError(requestsList);
    }
  });

  refreshRequests();
}

// Enhance the shared navigation with a keyboard-friendly small-screen menu.
function initializeMobileNavigation() {
  const navbar = document.querySelector(".navbar");
  const toggle = navbar?.querySelector(".nav-toggle");
  const links = navbar?.querySelector(".nav-links");
  if (!navbar || !toggle || !links) {
    return;
  }

  const mobileViewport = window.matchMedia("(max-width: 700px)");
  navbar.classList.add("has-mobile-nav");

  const setExpanded = (expanded) => {
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute(
      "aria-label",
      expanded ? "Close navigation menu" : "Open navigation menu"
    );
    links.classList.toggle("is-open", expanded);
  };

  toggle.addEventListener("click", () => {
    setExpanded(toggle.getAttribute("aria-expanded") !== "true");
  });

  links.addEventListener("click", (event) => {
    if (mobileViewport.matches && event.target.closest("a")) {
      setExpanded(false);
    }
  });

  navbar.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setExpanded(false);
      toggle.focus();
    }
  });

  mobileViewport.addEventListener("change", (event) => {
    if (!event.matches) {
      setExpanded(false);
    }
  });
}

document.addEventListener("DOMContentLoaded", initializeMobileNavigation);
document.addEventListener("DOMContentLoaded", initializeProviderDirectory);
document.addEventListener("DOMContentLoaded", initializeProviderProfile);
document.addEventListener("DOMContentLoaded", initializeServiceRequestForm);
document.addEventListener("DOMContentLoaded", initializeRequestsPage);
