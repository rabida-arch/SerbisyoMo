// Shared UI helpers used on every page (navigation, user menu, connection, toasts, SW).
(() => {
  'use strict';

  const auth = window.SerbisyoAuth;

  const initializeMobileNavigation = () => {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('#nav-links');
    if (!toggle || !links) return;

    const closeMenu = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    };

    toggle.addEventListener('click', () => {
      const open = !links.classList.contains('is-open');
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  };

  const initialsFor = (name) => {
    const parts = String(name || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initializeAuthNav = () => {
    const slots = document.querySelectorAll('[data-auth-slot]');
    const signupSlots = document.querySelectorAll('[data-auth-signup]');
    const user = auth?.currentUser?.() || null;

    if (!slots.length) return;

    if (!user) {
      slots.forEach((slot) => {
        slot.replaceChildren();
        const link = document.createElement('a');
        link.href = 'login.html';
        link.textContent = 'Log in';
        slot.append(link);
      });
      signupSlots.forEach((slot) => {
        slot.hidden = false;
      });
      return;
    }

    signupSlots.forEach((slot) => {
      slot.hidden = true;
    });

    slots.forEach((slot) => {
      slot.replaceChildren();

      const cluster = document.createElement('div');
      cluster.className = 'nav-user-cluster';

      const wrap = document.createElement('div');
      wrap.className = 'user-menu-wrap';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'user-menu-button';
      button.id = 'user-menu-button';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', 'user-menu');
      button.setAttribute('aria-haspopup', 'true');

      const avatar = document.createElement('span');
      avatar.className = 'user-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      const avatarLabel = document.createElement('span');
      avatarLabel.className = 'user-avatar-label';
      avatarLabel.textContent = initialsFor(user.name);
      const status = document.createElement('span');
      status.className = 'user-status-dot';
      status.id = 'connection-status';
      status.setAttribute('aria-label', navigator.onLine ? 'Online' : 'Offline');
      status.classList.toggle('online', navigator.onLine);
      status.classList.toggle('offline', !navigator.onLine);
      avatar.append(avatarLabel, status);

      const text = document.createElement('span');
      text.className = 'user-menu-text';
      const strong = document.createElement('strong');
      strong.textContent = user.name;
      const small = document.createElement('small');
      small.textContent = user.role === 'provider' ? 'Provider account' : 'Resident account';
      text.append(strong, small);

      const chevron = document.createElement('span');
      chevron.className = 'user-menu-chevron';
      chevron.setAttribute('aria-hidden', 'true');
      chevron.textContent = '▾';

      button.append(avatar, text, chevron);

      const menu = document.createElement('div');
      menu.id = 'user-menu';
      menu.className = 'user-menu';
      menu.hidden = true;

      const addMenuLink = (href, label) => {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        menu.append(a);
      };

      addMenuLink('account.html', 'Profile');
      if (user.role === 'provider') {
        addMenuLink('provider-dashboard.html', 'Dashboard');
      } else {
        addMenuLink('favorites.html', 'Favorites');
      }

      const logout = document.createElement('button');
      logout.type = 'button';
      logout.textContent = 'Log out';
      logout.addEventListener('click', () => auth.logout());
      menu.append(logout);

      const closeMenu = () => {
        menu.hidden = true;
        button.setAttribute('aria-expanded', 'false');
      };

      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const open = menu.hidden;
        menu.hidden = !open;
        button.setAttribute('aria-expanded', String(open));
      });

      document.addEventListener('click', (event) => {
        if (!wrap.contains(event.target)) closeMenu();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
      });

      wrap.append(button, menu);
      cluster.append(wrap);
      slot.append(cluster);
    });
  };

  const initializePasswordToggles = () => {
    document.querySelectorAll('[data-password-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const input = document.getElementById(button.dataset.passwordToggle);
        if (!input) return;
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        button.textContent = show ? 'Hide' : 'Show';
        button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      });
    });
  };

  const updateConnection = () => {
    const online = navigator.onLine;
    document.querySelectorAll('#connection-status, .user-status-dot, [data-connection-pill]').forEach((el) => {
      if (!el) return;
      el.classList.toggle('online', online);
      el.classList.toggle('offline', !online);
      el.setAttribute('aria-label', online ? 'Online' : 'Offline');
      // Keep pill text only if it is still used somewhere as a text pill.
      if (el.classList.contains('connection-pill') && !el.classList.contains('user-status-dot')) {
        el.textContent = online ? 'Online' : 'Offline — data stays on this device';
      }
    });
  };

  const showToast = (message, type = 'info') => {
    let host = document.getElementById('toast-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'toast-host';
      host.className = 'toast-host';
      host.setAttribute('aria-live', 'polite');
      document.body.append(host);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    host.append(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  const getSafeNextPath = (fallback = 'index.html') => {
    const next = new URLSearchParams(window.location.search).get('next');
    if (!next) return fallback;
    if (!/^[a-z0-9\-./]+\.html(\?[^#]*)?(#[\w\-]+)?$/i.test(next)) return fallback;
    if (next.includes('://') || next.startsWith('//')) return fallback;
    return next;
  };

  const wireAuthSwitchLinks = (next) => {
    document.querySelectorAll('[data-auth-switch]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (!href) return;
      const url = new URL(href, window.location.href);
      if (next && next !== 'index.html') url.searchParams.set('next', next);
      link.href = url.pathname.split('/').pop() + url.search + url.hash;
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initializeMobileNavigation();
    initializeAuthNav();
    initializePasswordToggles();
    updateConnection();
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);

    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    }
  });

  window.SerbisyoCommon = {
    showToast,
    getSafeNextPath,
    wireAuthSwitchLinks,
    initializeAuthNav,
    updateConnection
  };
})();
