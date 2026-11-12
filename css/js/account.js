// Account profile page: view and update the signed-in user's details.
(() => {
  'use strict';

  const store = window.SerbisyoStore;
  const auth = window.SerbisyoAuth;
  const common = window.SerbisyoCommon;

  const initialsFor = (name) => {
    const parts = String(name || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const fillSummary = (user) => {
    const avatar = document.getElementById('summary-avatar');
    const name = document.getElementById('summary-name');
    const barangay = document.getElementById('summary-barangay');
    const role = document.getElementById('summary-role');
    if (avatar) {
      const label = avatar.querySelector('.user-avatar-label');
      if (label) label.textContent = initialsFor(user.name);
      else avatar.textContent = initialsFor(user.name);
      const dot = avatar.querySelector('.user-status-dot');
      if (dot) {
        dot.classList.toggle('online', navigator.onLine);
        dot.classList.toggle('offline', !navigator.onLine);
        dot.setAttribute('aria-label', navigator.onLine ? 'Online' : 'Offline');
      }
    }
    if (name) name.textContent = user.name || '—';
    if (barangay) barangay.textContent = user.barangay || 'Barangay not set';
    if (role) role.textContent = user.role === 'provider' ? 'Provider' : 'Resident';
  };

  const fillForm = (user) => {
    const form = document.getElementById('account-form');
    if (!form) return;
    form.elements.name.value = user.name || '';
    form.elements.email.value = user.email || '';
    form.elements.contact.value = user.contact || '';
    form.elements.barangay.value = user.barangay || '';
    form.elements.id.value = user.id || '';
    const businessField = document.getElementById('business-field');
    if (user.role === 'provider') {
      if (businessField) businessField.hidden = false;
      if (form.elements.businessName) form.elements.businessName.value = user.businessName || '';
    } else if (businessField) {
      businessField.hidden = true;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const user = auth?.currentUser?.();
    if (!user) {
      window.location.href = 'login.html?next=account.html';
      return;
    }

    fillForm(user);
    fillSummary(user);

    document.getElementById('summary-logout')?.addEventListener('click', () => auth.logout());

    const form = document.getElementById('account-form');
    const formError = document.getElementById('account-form-error');
    const nameError = document.getElementById('profile-name-error');
    const contactError = document.getElementById('profile-contact-error');

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (formError) formError.textContent = '';
      if (nameError) nameError.textContent = '';
      if (contactError) contactError.textContent = '';

      const name = form.elements.name.value.trim();
      const contact = form.elements.contact.value.trim();
      const barangay = form.elements.barangay.value.trim();
      const businessName =
        user.role === 'provider' ? form.elements.businessName.value.trim() : user.businessName || '';

      let hasError = false;
      if (name.length < 2) {
        if (nameError) nameError.textContent = 'Please enter your full name.';
        hasError = true;
      }
      if (contact && !/^09\d{9}$/.test(contact)) {
        if (contactError) {
          contactError.textContent = 'Enter an 11-digit mobile number starting with 09.';
        }
        hasError = true;
      }
      if (user.role === 'provider' && !businessName) {
        if (formError) formError.textContent = 'Please enter your business or trade name.';
        hasError = true;
      }
      if (hasError) return;

      const updated = store.updateUser(user.id, {
        name,
        contact,
        barangay,
        businessName
      });

      if (!updated) {
        if (formError) formError.textContent = 'Could not save profile on this device.';
        return;
      }

      fillSummary(updated);
      common?.initializeAuthNav?.();
      common?.showToast?.('Profile saved on this device.', 'success');
    });
  });
})();
