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

  const formatNotificationTime = (iso) => {
    try {
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return '';
      const now = Date.now();
      const diffMs = now - date.getTime();
      const mins = Math.floor(diffMs / 60000);
      if (mins < 1) return 'Just now';
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const refreshNotificationBadge = (badge, userId) => {
    if (!badge) return;
    const store = window.SerbisyoStore;
    const count = store?.getUnreadNotificationCount?.(userId) || 0;
    if (count > 0) {
      badge.hidden = false;
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.setAttribute('aria-label', `${count} unread notification${count === 1 ? '' : 's'}`);
    } else {
      badge.hidden = true;
      badge.textContent = '';
      badge.removeAttribute('aria-label');
    }
  };

  const buildNotificationPanel = (user, badge, panel) => {
    const store = window.SerbisyoStore;
    if (!store || !panel) return;

    panel.replaceChildren();

    const header = document.createElement('div');
    header.className = 'notif-panel-header';
    const title = document.createElement('strong');
    title.textContent = 'Notifications';
    header.append(title);

    const markAll = document.createElement('button');
    markAll.type = 'button';
    markAll.className = 'notif-mark-all';
    markAll.textContent = 'Mark all read';
    markAll.addEventListener('click', (event) => {
      event.stopPropagation();
      store.markAllNotificationsRead(user.id);
      refreshNotificationBadge(badge, user.id);
      buildNotificationPanel(user, badge, panel);
    });
    header.append(markAll);
    panel.append(header);

    const list = store.getNotificationsForUser(user.id);
    if (!list.length) {
      const empty = document.createElement('p');
      empty.className = 'notif-empty';
      empty.textContent = 'No notifications yet.';
      panel.append(empty);
      return;
    }

    const ul = document.createElement('ul');
    ul.className = 'notif-list';
    list.slice(0, 30).forEach((item) => {
      const li = document.createElement('li');
      li.className = item.read ? 'notif-item is-read' : 'notif-item is-unread';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'notif-item-btn';

      const itemTitle = document.createElement('span');
      itemTitle.className = 'notif-item-title';
      itemTitle.textContent = item.title || 'Update';

      const itemBody = document.createElement('span');
      itemBody.className = 'notif-item-body';
      itemBody.textContent = item.body || '';

      const itemMeta = document.createElement('span');
      itemMeta.className = 'notif-item-meta';
      itemMeta.textContent = formatNotificationTime(item.createdAt);

      btn.append(itemTitle, itemBody, itemMeta);
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        store.markNotificationRead(user.id, item.id);
        refreshNotificationBadge(badge, user.id);
        const href = item.href && /^[a-z0-9\-./]+\.html(\?[^#]*)?(#[\w\-]+)?$/i.test(item.href)
          ? item.href
          : user.role === 'provider'
            ? 'provider-dashboard.html'
            : 'requests.html';
        window.location.href = href;
      });

      li.append(btn);
      ul.append(li);
    });
    panel.append(ul);
  };

  const createNotificationBell = (user) => {
    const store = window.SerbisyoStore;
    const wrap = document.createElement('div');
    wrap.className = 'notif-wrap';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'notif-bell';
    button.id = 'notif-bell-button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'notif-panel');
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-label', 'Notifications');

    const icon = document.createElement('span');
    icon.className = 'notif-bell-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>';

    const badge = document.createElement('span');
    badge.className = 'notif-badge';
    badge.hidden = true;

    button.append(icon, badge);

    const panel = document.createElement('div');
    panel.id = 'notif-panel';
    panel.className = 'notif-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'menu');

    const closePanel = () => {
      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    };

    const openPanel = () => {
      buildNotificationPanel(user, badge, panel);
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    };

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      // Close user menu if open
      const userMenu = document.getElementById('user-menu');
      const userBtn = document.getElementById('user-menu-button');
      if (userMenu) userMenu.hidden = true;
      if (userBtn) userBtn.setAttribute('aria-expanded', 'false');

      if (panel.hidden) openPanel();
      else closePanel();
    });

    document.addEventListener('click', (event) => {
      if (!wrap.contains(event.target)) closePanel();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePanel();
    });

    refreshNotificationBadge(badge, user.id);
    wrap.append(button, panel);
    return wrap;
  };

  /** For provider accounts, remove resident-only links (Home / Providers / My Requests)
   *  and ensure a Dashboard link is present. Leaves resident nav untouched. */
  const adaptNavForRole = (user) => {
    if (!user || user.role !== 'provider') return;
    const nav = document.querySelector('#nav-links');
    if (!nav) return;

    const residentHrefs = new Set(['index.html', 'providers.html', 'requests.html', 'favorites.html']);
    const toRemove = [];
    nav.querySelectorAll('li').forEach((li) => {
      if (li.hasAttribute('data-auth-slot') || li.hasAttribute('data-auth-signup')) return;
      const anchor = li.querySelector('a');
      if (!anchor) return;
      const href = (anchor.getAttribute('href') || '').split('?')[0].split('#')[0];
      const file = href.split('/').pop() || href;
      if (residentHrefs.has(file)) toRemove.push(li);
    });
    toRemove.forEach((li) => li.remove());

    const hasDashboard = Array.from(nav.querySelectorAll('a')).some((a) => {
      const href = (a.getAttribute('href') || '').split('?')[0].split('#')[0];
      return (href.split('/').pop() || href) === 'provider-dashboard.html';
    });
    if (!hasDashboard) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'provider-dashboard.html';
      a.textContent = 'Dashboard';
      const page = (window.location.pathname.split('/').pop() || '').split('?')[0];
      if (page === 'provider-dashboard.html') a.setAttribute('aria-current', 'page');
      li.append(a);
      const authSlot = nav.querySelector('[data-auth-slot]');
      if (authSlot) nav.insertBefore(li, authSlot);
      else nav.append(li);
    }
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

    // Provider workspace: no Home / Providers / My Requests in the header.
    adaptNavForRole(user);

    signupSlots.forEach((slot) => {
      slot.hidden = true;
    });

    slots.forEach((slot) => {
      slot.replaceChildren();

      const cluster = document.createElement('div');
      cluster.className = 'nav-user-cluster';

      // Notification bell (residents + providers)
      cluster.append(createNotificationBell(user));

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
        // Close notification panel if open
        const notifPanel = document.getElementById('notif-panel');
        const notifBtn = document.getElementById('notif-bell-button');
        if (notifPanel) notifPanel.hidden = true;
        if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');

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


  // ---------- Request photos ----------
  // Photos are shrunk in the browser and stored as small JPEG data URLs so they
  // fit inside localStorage together with the rest of the request.
  const PHOTO_MAX_COUNT = 3;
  const PHOTO_MAX_FILE_BYTES = 15 * 1024 * 1024; // reject huge originals before decoding
  const PHOTO_MAX_EDGE = 1024;
  const PHOTO_QUALITY = 0.72;

  const loadImageFromFile = (file) =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Could not read this image.'));
      };
      img.src = url;
    });

  const compressPhoto = async (file) => {
    if (!file.type.startsWith('image/')) throw new Error('Only image files can be attached.');
    if (file.size > PHOTO_MAX_FILE_BYTES) throw new Error('Each photo must be 15 MB or smaller.');
    const img = await loadImageFromFile(file);
    const scale = Math.min(1, PHOTO_MAX_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext('2d');
    // JPEG has no transparency, so paint white behind PNG/WebP images.
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', PHOTO_QUALITY);
  };

  // One shared full-size viewer, used by the resident and provider pages.
  let photoDialog = null;
  const openPhotoViewer = (src, alt) => {
    if (!photoDialog) {
      photoDialog = document.createElement('dialog');
      photoDialog.className = 'photo-viewer';
      photoDialog.setAttribute('aria-label', 'Photo preview');
      const img = document.createElement('img');
      img.className = 'photo-viewer-img';
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'photo-viewer-close';
      close.setAttribute('aria-label', 'Close photo');
      close.textContent = '\u00D7';
      close.addEventListener('click', () => photoDialog.close());
      // Clicking the dark backdrop closes it too.
      photoDialog.addEventListener('click', (event) => {
        if (event.target === photoDialog) photoDialog.close();
      });
      photoDialog.append(img, close);
      document.body.append(photoDialog);
    }
    const img = photoDialog.querySelector('.photo-viewer-img');
    img.src = src;
    img.alt = alt || 'Photo attached to the request';
    if (typeof photoDialog.showModal === 'function') photoDialog.showModal();
    else window.open(src, '_blank', 'noopener');
  };

  // Thumbnail strip for a request; returns null when there are no photos.
  const createPhotoGallery = (photos, label = 'Photos attached to this request') => {
    const list = Array.isArray(photos)
      ? photos.filter((src) => typeof src === 'string' && src.startsWith('data:image/'))
      : [];
    if (!list.length) return null;
    const wrap = document.createElement('div');
    wrap.className = 'request-photos';
    const heading = document.createElement('p');
    heading.className = 'request-photos-title';
    heading.textContent = `${label} (${list.length})`;
    const grid = document.createElement('ul');
    grid.className = 'request-photos-grid';
    list.forEach((src, index) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'request-photo-thumb';
      button.setAttribute('aria-label', `View photo ${index + 1} of ${list.length} full size`);
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Photo ${index + 1} of ${list.length}`;
      img.loading = 'lazy';
      button.append(img);
      button.addEventListener('click', () => openPhotoViewer(src, img.alt));
      item.append(button);
      grid.append(item);
    });
    wrap.append(heading, grid);
    return wrap;
  };

  window.SerbisyoCommon = {
    showToast,
    PHOTO_MAX_COUNT,
    compressPhoto,
    openPhotoViewer,
    createPhotoGallery,
    getSafeNextPath,
    wireAuthSwitchLinks,
    initializeAuthNav,
    updateConnection
  };
})();
