// Provider workspace: review incoming requests, update status, add quotes and notes.
(() => {
  'use strict';

  const store = window.SerbisyoStore;
  const auth = window.SerbisyoAuth;
  const common = window.SerbisyoCommon;
  const statuses = ['Pending', 'Quoted', 'Accepted', 'Declined', 'Completed', 'Cancelled'];

  const formatRate = (rate) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(rate);

  const formatDate = (value) => {
    const dateOnly = typeof value === 'string' && /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    const date = dateOnly
      ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
      : new Date(value);
    if (Number.isNaN(date.getTime())) return value || '—';
    return new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const createDetail = (label, value) => {
    const row = document.createElement('div');
    row.className = 'provider-detail';
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    row.append(dt, dd);
    return row;
  };

  const renderStats = (requests) => {
    const host = document.querySelector('#dashboard-stats');
    if (!host) return;
    const counts = {
      Pending: 0,
      Quoted: 0,
      Accepted: 0,
      Completed: 0,
      Declined: 0,
      Cancelled: 0
    };
    requests.forEach((item) => {
      if (counts[item.status] != null) counts[item.status] += 1;
    });
    host.replaceChildren();
    [
      ['Pending', counts.Pending],
      ['Quoted', counts.Quoted],
      ['Accepted', counts.Accepted],
      ['Completed', counts.Completed]
    ].forEach(([label, value]) => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      const number = document.createElement('p');
      number.className = 'stat-number';
      number.textContent = String(value);
      const text = document.createElement('p');
      text.className = 'stat-label';
      text.textContent = label;
      card.append(number, text);
      host.append(card);
    });
  };

  const createRequestCard = (request) => {
    const card = document.createElement('article');
    card.className = 'request-history-card dashboard-request-card';
    card.dataset.requestId = String(request.id);

    const header = document.createElement('header');
    header.className = 'request-history-header';
    const titleGroup = document.createElement('div');
    const title = document.createElement('h2');
    title.className = 'request-history-provider';
    title.textContent = request.fullName || 'Resident';
    const category = document.createElement('span');
    category.className = 'category-label';
    category.textContent = request.category || 'Service';
    titleGroup.append(title, category);

    const status = document.createElement('span');
    const statusValue = statuses.includes(request.status) ? request.status : 'Pending';
    status.className = `status-badge status-${statusValue.toLowerCase()}`;
    status.textContent = statusValue;
    header.append(titleGroup, status);

    const details = document.createElement('dl');
    details.className = 'request-history-details';
    details.append(
      createDetail('Contact', request.contactNumber || '—'),
      createDetail('Barangay', request.barangay || '—'),
      createDetail('Preferred date', formatDate(request.preferredDate)),
      createDetail('Submitted', formatDate(request.submittedAt)),
      createDetail('Work description', request.workDescription || '—')
    );
    if (request.quoteAmount != null && request.quoteAmount !== '') {
      details.append(createDetail('Quoted amount', formatRate(Number(request.quoteAmount))));
    }
    if (request.providerNote) {
      details.append(createDetail('Your note', request.providerNote));
    }

    const form = document.createElement('form');
    form.className = 'dashboard-update-form';
    form.dataset.requestId = String(request.id);

    const statusField = document.createElement('div');
    statusField.className = 'auth-field';
    const statusLabel = document.createElement('label');
    statusLabel.htmlFor = `status-${request.id}`;
    statusLabel.textContent = 'Update status';
    const statusSelect = document.createElement('select');
    statusSelect.id = `status-${request.id}`;
    statusSelect.name = 'status';
    statuses
      .filter((item) => item !== 'Cancelled')
      .forEach((item) => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        if (item === statusValue) option.selected = true;
        statusSelect.append(option);
      });
    statusField.append(statusLabel, statusSelect);

    const quoteField = document.createElement('div');
    quoteField.className = 'auth-field';
    const quoteLabel = document.createElement('label');
    quoteLabel.htmlFor = `quote-${request.id}`;
    quoteLabel.textContent = 'Quote amount (PHP)';
    const quoteInput = document.createElement('input');
    quoteInput.id = `quote-${request.id}`;
    quoteInput.name = 'quoteAmount';
    quoteInput.type = 'number';
    quoteInput.min = '0';
    quoteInput.step = '50';
    quoteInput.placeholder = 'Optional';
    if (request.quoteAmount != null) quoteInput.value = request.quoteAmount;
    quoteField.append(quoteLabel, quoteInput);

    const noteField = document.createElement('div');
    noteField.className = 'auth-field';
    const noteLabel = document.createElement('label');
    noteLabel.htmlFor = `note-${request.id}`;
    noteLabel.textContent = 'Note to resident';
    const noteInput = document.createElement('textarea');
    noteInput.id = `note-${request.id}`;
    noteInput.name = 'providerNote';
    noteInput.rows = 2;
    noteInput.placeholder = 'Schedule, materials needed, or other details';
    noteInput.value = request.providerNote || '';
    noteField.append(noteLabel, noteInput);

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'button';
    submit.textContent = 'Save update';

    form.append(statusField, quoteField, noteField, submit);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const updates = {
        status: statusSelect.value,
        providerNote: noteInput.value.trim(),
        quoteAmount: quoteInput.value === '' ? null : Number(quoteInput.value)
      };
      store.updateRequest(request.id, updates);
      common?.showToast?.('Request updated.', 'success');
      render();
    });

    card.append(header, details, form);
    return card;
  };

  const render = () => {
    const list = document.querySelector('#provider-requests');
    const empty = document.querySelector('#provider-empty');
    const profileBox = document.querySelector('#provider-profile-summary');
    if (!list) return;

    const user = auth.requireRole('provider');
    if (!user) return;

    if (profileBox) {
      profileBox.replaceChildren();
      const heading = document.createElement('h2');
      heading.textContent = user.businessName || user.name;
      const meta = document.createElement('p');
      meta.textContent = user.providerId
        ? `Linked demo provider #${user.providerId} · ${user.email}`
        : `Provider account · ${user.email}`;
      const connection = document.createElement('span');
      connection.id = 'connection-status';
      connection.className = 'connection-pill';
      connection.textContent = navigator.onLine ? 'Online' : 'Offline — data stays on this device';
      connection.classList.toggle('online', navigator.onLine);
      connection.classList.toggle('offline', !navigator.onLine);
      profileBox.append(heading, meta, connection);
    }

    let requests = [];
    if (user.providerId) {
      requests = store.getRequestsForProvider(user.providerId);
    } else {
      // Unlinked provider accounts still see requests addressed to their business name.
      requests = store
        .getRequests()
        .filter(
          (item) =>
            item.providerName &&
            user.businessName &&
            item.providerName.toLowerCase() === user.businessName.toLowerCase()
        );
    }

    const filter = document.querySelector('#status-filter')?.value || 'all';
    const visible =
      filter === 'all' ? requests : requests.filter((item) => item.status === filter);

    renderStats(requests);

    if (!visible.length) {
      list.replaceChildren();
      if (empty) {
        empty.hidden = false;
        empty.querySelector('p').textContent = requests.length
          ? 'No requests match this status filter.'
          : 'No requests for your listing yet. Residents can send one from a provider profile.';
      }
      return;
    }

    if (empty) empty.hidden = true;
    list.replaceChildren(...visible.map(createRequestCard));
  };

  document.addEventListener('DOMContentLoaded', () => {
    const user = auth?.currentUser?.();
    if (!user || user.role !== 'provider') {
      window.location.href = 'login.html?next=provider-dashboard.html';
      return;
    }
    document.querySelector('#status-filter')?.addEventListener('change', render);
    render();
  });
})();
