// Provider workspace: review incoming requests, update status, add quotes and notes.
(() => {
  'use strict';

  const store = window.SerbisyoStore;
  const auth = window.SerbisyoAuth;
  const common = window.SerbisyoCommon;
  const statuses = ['Pending', 'Quoted', 'Accepted', 'Declined', 'Completed', 'Cancelled'];

  const declineReasons = [
    'Fully booked on that date',
    'Outside my service area',
    "I don't offer this type of work",
    'Schedule conflict',
    'Other'
  ];

  const pad = (n) => String(n).padStart(2, '0');
  const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
  const todayKey = () => {
    const t = new Date();
    return toKey(t.getFullYear(), t.getMonth(), t.getDate());
  };
  const dateKey = (value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? '' : toKey(d.getFullYear(), d.getMonth(), d.getDate());
  };
  // A job sits on its scheduled date; falls back to the resident's preferred date.
  const jobKey = (request) => dateKey(request.scheduledDate || request.preferredDate);
  const formatTime = (value) => {
    const m = /^(\d{2}):(\d{2})$/.exec(value || '');
    if (!m) return '';
    const h = Number(m[1]);
    return `${h % 12 || 12}:${m[2]} ${h >= 12 ? 'PM' : 'AM'}`;
  };
  const scheduledJobs = (requests) =>
    requests.filter((r) => (r.status === 'Accepted' || r.status === 'Completed') && jobKey(r));
  const byTime = (a, b) => (a.scheduledTime || '99:99').localeCompare(b.scheduledTime || '99:99');

  const now = new Date();
  const calendar = { year: now.getFullYear(), month: now.getMonth(), selected: todayKey() };
  let currentRequests = [];

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

  const declineText = (request) =>
    [request.declineReason, request.declineMessage].filter(Boolean).join(': ');

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
    if (statusValue === 'Declined' && (request.declineReason || request.declineMessage)) {
      details.append(createDetail('Reason for declining', declineText(request)));
    }
    if (statusValue === 'Accepted' || statusValue === 'Completed') {
      const when = [formatDate(jobKey(request)), formatTime(request.scheduledTime)]
        .filter(Boolean)
        .join(' at ');
      details.append(createDetail('Scheduled', when));
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

    // Shown only when declining: the resident sees this on their request.
    const declineWrap = document.createElement('div');
    declineWrap.className = 'dashboard-conditional decline-fields';
    const reasonField = document.createElement('div');
    reasonField.className = 'auth-field';
    const reasonLabel = document.createElement('label');
    reasonLabel.htmlFor = `decline-reason-${request.id}`;
    reasonLabel.textContent = 'Reason for declining';
    const reasonSelect = document.createElement('select');
    reasonSelect.id = `decline-reason-${request.id}`;
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Choose a reason…';
    reasonSelect.append(placeholder);
    declineReasons.forEach((text) => {
      const option = document.createElement('option');
      option.value = text;
      option.textContent = text;
      if (text === request.declineReason) option.selected = true;
      reasonSelect.append(option);
    });
    reasonField.append(reasonLabel, reasonSelect);
    const messageField = document.createElement('div');
    messageField.className = 'auth-field';
    const messageLabel = document.createElement('label');
    messageLabel.htmlFor = `decline-message-${request.id}`;
    messageLabel.textContent = 'Message to resident (required if "Other")';
    const messageInput = document.createElement('textarea');
    messageInput.id = `decline-message-${request.id}`;
    messageInput.rows = 2;
    messageInput.maxLength = 300;
    messageInput.placeholder = 'Explain briefly so the resident can look for another provider';
    messageInput.value = request.declineMessage || '';
    messageField.append(messageLabel, messageInput);
    declineWrap.append(reasonField, messageField);

    // Shown only when accepting: lets the provider fine-tune the calendar entry.
    const scheduleWrap = document.createElement('div');
    scheduleWrap.className = 'dashboard-conditional schedule-fields';
    const dateField = document.createElement('div');
    dateField.className = 'auth-field';
    const dateLabel = document.createElement('label');
    dateLabel.htmlFor = `sched-date-${request.id}`;
    dateLabel.textContent = 'Scheduled date';
    const dateInput = document.createElement('input');
    dateInput.id = `sched-date-${request.id}`;
    dateInput.type = 'date';
    dateInput.value = jobKey(request);
    dateField.append(dateLabel, dateInput);
    const timeField = document.createElement('div');
    timeField.className = 'auth-field';
    const timeLabel = document.createElement('label');
    timeLabel.htmlFor = `sched-time-${request.id}`;
    timeLabel.textContent = 'Start time (optional)';
    const timeInput = document.createElement('input');
    timeInput.id = `sched-time-${request.id}`;
    timeInput.type = 'time';
    timeInput.value = request.scheduledTime || '';
    timeField.append(timeLabel, timeInput);
    scheduleWrap.append(dateField, timeField);

    const syncConditional = () => {
      declineWrap.hidden = statusSelect.value !== 'Declined';
      scheduleWrap.hidden = statusSelect.value !== 'Accepted';
    };
    statusSelect.addEventListener('change', syncConditional);
    syncConditional();

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'button';
    submit.textContent = 'Save update';

    form.append(statusField, quoteField, noteField, declineWrap, scheduleWrap, submit);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const quoteAmount = quoteInput.value.trim() === '' ? null : Number(quoteInput.value);
      if (quoteAmount !== null && (!Number.isFinite(quoteAmount) || quoteAmount < 0)) {
        common?.showToast?.('Enter a valid quote amount (0 or more).', 'error');
        quoteInput.focus();
        return;
      }
      if (statusSelect.value === 'Quoted' && quoteAmount === null) {
        common?.showToast?.('Add a quote amount before marking this request as Quoted.', 'error');
        quoteInput.focus();
        return;
      }
      const nextStatus = statusSelect.value;
      const updates = {
        status: nextStatus,
        providerNote: noteInput.value.trim(),
        quoteAmount,
        declineReason: '',
        declineMessage: '',
        declinedAt: null,
        scheduledDate: null,
        scheduledTime: ''
      };

      if (nextStatus === 'Declined') {
        const reason = reasonSelect.value;
        const message = messageInput.value.trim();
        if (!reason) {
          common?.showToast?.('Choose a reason for declining this request.', 'error');
          reasonSelect.focus();
          return;
        }
        if (reason === 'Other' && message.length < 5) {
          common?.showToast?.('Please write a short message explaining why you are declining.', 'error');
          messageInput.focus();
          return;
        }
        updates.declineReason = reason;
        updates.declineMessage = message;
        updates.declinedAt = new Date().toISOString();
      }

      let clash = 0;
      if (nextStatus === 'Accepted' || nextStatus === 'Completed') {
        const chosen = dateInput.value || jobKey(request);
        if (!chosen) {
          common?.showToast?.('Choose a scheduled date.', 'error');
          dateInput.focus();
          return;
        }
        updates.scheduledDate = chosen;
        updates.scheduledTime = timeInput.value;
        if (nextStatus === 'Accepted') {
          clash = scheduledJobs(currentRequests).filter(
            (item) => item.id !== request.id && jobKey(item) === chosen && item.status === 'Accepted'
          ).length;
        }
      }

      store.updateRequest(request.id, updates);
      calendar.selected = updates.scheduledDate || calendar.selected;
      if (updates.scheduledDate) {
        const [y, m] = updates.scheduledDate.split('-').map(Number);
        calendar.year = y;
        calendar.month = m - 1;
      }
      common?.showToast?.(
        clash
          ? `Request accepted. Heads up: you already have ${clash} other job${clash === 1 ? '' : 's'} on this date.`
          : nextStatus === 'Accepted'
            ? 'Request accepted and added to your schedule.'
            : 'Request updated.',
        clash ? 'info' : 'success'
      );
      render();
    });

    card.append(header, details, form);
    return card;
  };

  const renderCalendar = (requests) => {
    const grid = document.querySelector('#schedule-grid');
    const title = document.querySelector('#schedule-month');
    const dayPanel = document.querySelector('#schedule-day');
    const weekdays = document.querySelector('.schedule-weekdays');
    if (!grid || !title || !dayPanel) return;

    if (weekdays && !weekdays.childElementCount) {
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach((name) => {
        const cell = document.createElement('span');
        cell.textContent = name;
        weekdays.append(cell);
      });
    }

    const { year, month } = calendar;
    title.textContent = new Intl.DateTimeFormat('en-PH', { month: 'long', year: 'numeric' }).format(
      new Date(year, month, 1)
    );

    const jobsByDay = new Map();
    scheduledJobs(requests).forEach((item) => {
      const key = jobKey(item);
      if (!jobsByDay.has(key)) jobsByDay.set(key, []);
      jobsByDay.get(key).push(item);
    });
    jobsByDay.forEach((list) => list.sort(byTime));

    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = todayKey();
    const cells = [];

    for (let i = 0; i < first.getDay(); i += 1) {
      const blank = document.createElement('div');
      blank.className = 'schedule-cell is-empty';
      blank.setAttribute('role', 'gridcell');
      blank.setAttribute('aria-hidden', 'true');
      cells.push(blank);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const key = toKey(year, month, day);
      const jobs = jobsByDay.get(key) || [];
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'schedule-cell';
      cell.setAttribute('role', 'gridcell');
      cell.dataset.date = key;
      if (key === today) cell.classList.add('is-today');
      if (key === calendar.selected) {
        cell.classList.add('is-selected');
        cell.setAttribute('aria-pressed', 'true');
      } else {
        cell.setAttribute('aria-pressed', 'false');
      }
      const label = new Intl.DateTimeFormat('en-PH', { dateStyle: 'full' }).format(
        new Date(year, month, day)
      );
      cell.setAttribute(
        'aria-label',
        `${label}, ${jobs.length ? `${jobs.length} job${jobs.length === 1 ? '' : 's'}` : 'no jobs'}`
      );

      const num = document.createElement('span');
      num.className = 'schedule-daynum';
      num.textContent = String(day);
      cell.append(num);

      jobs.slice(0, 2).forEach((job) => {
        const chip = document.createElement('span');
        chip.className = `schedule-chip chip-${job.status.toLowerCase()}`;
        chip.textContent = `${job.scheduledTime ? `${formatTime(job.scheduledTime)} ` : ''}${job.fullName || 'Resident'}`;
        cell.append(chip);
      });
      if (jobs.length > 2) {
        const more = document.createElement('span');
        more.className = 'schedule-more';
        more.textContent = `+${jobs.length - 2} more`;
        cell.append(more);
      }
      if (jobs.length) {
        const badge = document.createElement('span');
        badge.className = 'schedule-count';
        badge.textContent = String(jobs.length);
        badge.setAttribute('aria-hidden', 'true');
        cell.append(badge);
      }
      cells.push(cell);
    }
    grid.replaceChildren(...cells);

    // Day panel: details of the selected date.
    dayPanel.replaceChildren();
    const [sy, sm, sd] = calendar.selected.split('-').map(Number);
    const heading = document.createElement('h3');
    heading.textContent = new Intl.DateTimeFormat('en-PH', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(sy, sm - 1, sd));
    dayPanel.append(heading);

    const dayJobs = jobsByDay.get(calendar.selected) || [];
    if (!dayJobs.length) {
      const none = document.createElement('p');
      none.className = 'schedule-empty';
      none.textContent = 'No scheduled work on this date.';
      dayPanel.append(none);
      return;
    }
    const list = document.createElement('ul');
    list.className = 'schedule-jobs';
    dayJobs.forEach((job) => {
      const li = document.createElement('li');
      li.className = `schedule-job job-${job.status.toLowerCase()}`;
      const top = document.createElement('p');
      top.className = 'schedule-job-title';
      top.textContent = `${job.scheduledTime ? `${formatTime(job.scheduledTime)} · ` : ''}${job.category || 'Service'}`;
      const who = document.createElement('p');
      who.textContent = `${job.fullName || 'Resident'} · ${job.barangay || 'Location not given'}`;
      const contact = document.createElement('p');
      contact.className = 'schedule-job-meta';
      contact.textContent = `${job.contactNumber || 'No contact number'} · ${job.status}`;
      const desc = document.createElement('p');
      desc.className = 'schedule-job-meta';
      desc.textContent = job.workDescription || '';
      li.append(top, who, contact);
      if (job.workDescription) li.append(desc);
      list.append(li);
    });
    dayPanel.append(list);
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
      meta.textContent = `Provider account · ${user.email}`;
      // Not an id: the header avatar dot already owns #connection-status.
      const connection = document.createElement('span');
      connection.dataset.connectionPill = '';
      connection.className = 'connection-pill';
      connection.textContent = navigator.onLine ? 'Online' : 'Offline — data stays on this device';
      connection.classList.toggle('online', navigator.onLine);
      connection.classList.toggle('offline', !navigator.onLine);
      profileBox.append(heading, meta, connection);
    }

    const byNewest = (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt);
    let requests = [];
    if (user.providerId) {
      requests = store.getRequestsForProvider(user.providerId);
    } else {
      // Unlinked provider accounts still see requests addressed to their business name.
      const business = (user.businessName || '').trim().toLowerCase();
      requests = business
        ? store
            .getRequests()
            .filter((item) => (item.providerName || '').trim().toLowerCase() === business)
            .sort(byNewest)
        : [];
    }

    const filter = document.querySelector('#status-filter')?.value || 'all';
    const visible =
      filter === 'all' ? requests : requests.filter((item) => item.status === filter);

    renderStats(requests);
    currentRequests = requests;
    renderCalendar(requests);

    const count = document.querySelector('#dashboard-count');
    if (count) {
      count.textContent = requests.length
        ? `Showing ${visible.length} of ${requests.length} request${requests.length === 1 ? '' : 's'}`
        : '';
    }

    if (!visible.length) {
      list.replaceChildren();
      if (empty) {
        const title = document.querySelector('#provider-empty-title');
        const text = document.querySelector('#provider-empty-text');
        const hasRequests = requests.length > 0;
        if (title) title.textContent = hasRequests ? 'No matching requests' : 'No requests yet';
        if (text) {
          text.textContent = hasRequests
            ? `You have no ${filter.toLowerCase()} requests right now. Try another status or choose "All requests".`
            : 'No requests for your listing yet. Residents can send one from a provider profile.';
        }
        empty.hidden = false;
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
    const filterSelect = document.querySelector('#status-filter');
    // Browsers restore form fields on reload; start from "All requests" so nothing looks missing.
    if (filterSelect) filterSelect.value = 'all';
    filterSelect?.addEventListener('change', render);
    const shiftMonth = (delta) => {
      const d = new Date(calendar.year, calendar.month + delta, 1);
      calendar.year = d.getFullYear();
      calendar.month = d.getMonth();
      renderCalendar(currentRequests);
    };
    document.querySelector('#schedule-prev')?.addEventListener('click', () => shiftMonth(-1));
    document.querySelector('#schedule-next')?.addEventListener('click', () => shiftMonth(1));
    document.querySelector('#schedule-today')?.addEventListener('click', () => {
      const t = new Date();
      calendar.year = t.getFullYear();
      calendar.month = t.getMonth();
      calendar.selected = todayKey();
      renderCalendar(currentRequests);
    });
    document.querySelector('#schedule-grid')?.addEventListener('click', (event) => {
      const cell = event.target.closest('.schedule-cell[data-date]');
      if (!cell) return;
      calendar.selected = cell.dataset.date;
      renderCalendar(currentRequests);
      document.querySelector(`.schedule-cell[data-date="${calendar.selected}"]`)?.focus();
    });
    render();
  });
})();
