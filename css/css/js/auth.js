// Role-aware accounts (resident / provider) stored only in this browser.
(() => {
  'use strict';

  const store = window.SerbisyoStore;
  if (!store) return;

  const SESSION_KEY = store.KEYS.session;
  const LEGACY_SESSION_KEYS = [
    store.KEYS.legacySession,
    'serbisyomoSession',
    'serbisyomo_session',
    'serbisyomo_session_v1'
  ];

  const normalizeEmail = (value) => String(value || '').trim().toLowerCase();

  const hashPassword = async (password) => {
    const data = new TextEncoder().encode(`serbisyomo:${password}`);
    if (window.crypto?.subtle) {
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
    }
    let hash = 0;
    for (const byte of data) hash = ((hash << 5) - hash + byte) | 0;
    return `fallback-${Math.abs(hash)}`;
  };

  // Demo accounts seeded on first load (same idea as BPBuddy).
  const DEFAULT_ACCOUNTS = [
    {
      id: 'R-0001',
      role: 'resident',
      name: 'Ana Reyes',
      email: 'resident@serbisyomo.demo',
      contact: '09171234567',
      barangay: 'Tanza',
      password: 'Resident123!',
      providerId: null,
      businessName: ''
    },
    {
      id: 'P-0001',
      role: 'provider',
      name: 'Ramon Santos',
      email: 'provider@serbisyomo.demo',
      contact: '09179876543',
      barangay: 'Mercado',
      password: 'Provider123!',
      providerId: 1,
      businessName: "Ramon's Plumbing Services"
    }
  ];

  const DEMO_EMAILS = new Set(DEFAULT_ACCOUNTS.map((account) => normalizeEmail(account.email)));

  const ensureDefaultAccounts = async () => {
    const users = store.getUsers();
    let changed = false;
    for (const account of DEFAULT_ACCOUNTS) {
      if (users.some((user) => normalizeEmail(user.email) === normalizeEmail(account.email))) continue;
      const { password, ...profile } = account;
      users.push({
        ...profile,
        passwordHash: await hashPassword(password),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      changed = true;
    }
    if (changed) store.saveUsers(users);
    return users;
  };

  const nextId = (role) => {
    const prefix = role === 'provider' ? 'P' : 'R';
    const users = store.getUsers().filter((user) => user.role === role);
    const used = users
      .map((user) => Number(String(user.id).split('-').pop()))
      .filter(Number.isFinite);
    const number = used.length ? Math.max(...used) + 1 : 1;
    return `${prefix}-${String(number).padStart(4, '0')}`;
  };

  // Remove every known session key so logout cannot be undone by a leftover value.
  const clearSession = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
      LEGACY_SESSION_KEYS.forEach((key) => {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Could not clear session storage.', error);
    }
  };

  const setSession = (session, remember = true) => {
    clearSession();
    const target = remember ? localStorage : sessionStorage;
    target.setItem(SESSION_KEY, JSON.stringify(session));
  };

  const getSession = () => {
    let raw = null;
    try {
      raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    } catch {
      return null;
    }
    if (!raw) return null;
    try {
      const session = JSON.parse(raw);
      if (!session || !session.userId) {
        clearSession();
        return null;
      }
      return session;
    } catch {
      clearSession();
      return null;
    }
  };

  const currentUser = () => {
    const session = getSession();
    if (!session) return null;
    const user = store.getUser(session.userId);
    // Stale session (user removed) must not keep the UI logged in.
    if (!user) {
      clearSession();
      return null;
    }
    return user;
  };

  const removeUserById = (userId) => {
    const users = store.getUsers().filter((user) => user.id !== userId);
    store.saveUsers(users);
  };

  const register = async (payload, password) => {
    await ensureDefaultAccounts();
    const users = store.getUsers();
    const email = normalizeEmail(payload.email);
    if (users.some((user) => normalizeEmail(user.email) === email)) {
      throw new Error('An account with this email already exists. Try logging in.');
    }
    if (!payload.name || String(payload.name).trim().length < 2) {
      throw new Error('Please enter your full name.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }
    if (String(password || '').length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    const role = payload.role === 'provider' ? 'provider' : 'resident';
    if (role === 'provider' && !payload.businessName?.trim()) {
      throw new Error('Please enter your business or trade name.');
    }

    const user = {
      id: nextId(role),
      role,
      name: String(payload.name).trim(),
      email,
      contact: String(payload.contact || '').trim(),
      barangay: String(payload.barangay || '').trim(),
      providerId: role === 'provider' && payload.providerId ? Number(payload.providerId) : null,
      businessName: role === 'provider' ? String(payload.businessName).trim() : '',
      passwordHash: await hashPassword(String(password || "")),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(user);
    store.saveUsers(users);
    setSession({ userId: user.id, role: user.role, signedInAt: new Date().toISOString() }, true);
    rememberLoginHint({ email: user.email, role: user.role });
    return user;
  };

  const LAST_LOGIN_KEY = 'serbisyomo_last_login_v1';

  const rememberLoginHint = ({ email, role }) => {
    try {
      localStorage.setItem(
        LAST_LOGIN_KEY,
        JSON.stringify({
          email: normalizeEmail(email),
          role: role === 'provider' ? 'provider' : 'resident'
        })
      );
    } catch (error) {
      console.error('Could not save login hint.', error);
    }
  };

  const getLoginHint = () => {
    try {
      const raw = localStorage.getItem(LAST_LOGIN_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.email) return null;
      return {
        email: String(data.email),
        role: data.role === 'provider' ? 'provider' : 'resident'
      };
    } catch {
      return null;
    }
  };

  const login = async ({ email, password, role, remember = true }) => {
    await ensureDefaultAccounts();
    const users = store.getUsers();
    const cleanEmail = normalizeEmail(email);
    const cleanPassword = String(password || '');
    if (!cleanEmail || !cleanPassword) {
      throw new Error('Please enter your email and password.');
    }

    const passwordHash = await hashPassword(cleanPassword);
    const matches = users.filter((item) => normalizeEmail(item.email) === cleanEmail);

    if (!matches.length) {
      throw new Error('No account found for that email. Please sign up first.');
    }

    // Prefer the selected role when the same email exists in both roles.
    const selectedRole = role === 'provider' ? 'provider' : 'resident';
    let user = matches.find((item) => item.role === selectedRole) || null;

    // If the selected role does not match, still accept the correct password
    // on the other role so signup credentials always work at login.
    if (!user || user.passwordHash !== passwordHash) {
      user = matches.find((item) => item.passwordHash === passwordHash) || null;
    }

    if (!user) {
      throw new Error('Incorrect password. Use the same password you created at sign up.');
    }

    setSession(
      { userId: user.id, role: user.role, signedInAt: new Date().toISOString() },
      remember !== false
    );
    rememberLoginHint({ email: user.email, role: user.role });
    return user;
  };

  // End the session only. The account stays saved so the user can log in again
  // with the email remembered on the login page.
  const logout = () => {
    clearSession();
    window.location.replace('index.html');
  };

  const requireRole = (role) => {
    const user = currentUser();
    if (!user || user.role !== role) {
      clearSession();
      window.location.replace('login.html');
      return null;
    }
    return user;
  };

  // Seed demo accounts early so login hints work on first visit.
  ensureDefaultAccounts().catch(() => {});

  window.SerbisyoAuth = {
    register,
    login,
    logout,
    getSession,
    currentUser,
    requireRole,
    clearSession,
    getLoginHint,
    rememberLoginHint,
    ensureDefaultAccounts,
    hashPassword
  };
})();
