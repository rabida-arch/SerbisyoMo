// Central browser storage for SerbisyoMo (inspired by BPBuddy's store layer).
// All keys are versioned so future schema changes can migrate cleanly.
(() => {
  'use strict';

  const KEYS = {
    users: 'serbisyomo_users_v2',
    session: 'serbisyomo_session_v2',
    requests: 'serbisyomo_requests_v2',
    feedback: 'serbisyomo_feedback_v2',
    favorites: 'serbisyomo_favorites_v2',
    legacyRequests: 'serviceRequests',
    legacyUsers: 'serbisyomoUsers',
    legacySession: 'serbisyomoSession',
    legacyFeedback: 'serbisyomoFeedback'
  };

  const parse = (value, fallback) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  };

  const read = (key, fallback = []) => parse(localStorage.getItem(key), fallback);
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  // One-time migration from the original unversioned keys.
  const migrateLegacy = () => {
    if (!localStorage.getItem(KEYS.requests) && localStorage.getItem(KEYS.legacyRequests)) {
      const legacy = parse(localStorage.getItem(KEYS.legacyRequests), []);
      if (Array.isArray(legacy)) write(KEYS.requests, legacy);
    }
    if (!localStorage.getItem(KEYS.users) && localStorage.getItem(KEYS.legacyUsers)) {
      const legacy = parse(localStorage.getItem(KEYS.legacyUsers), []);
      if (Array.isArray(legacy)) {
        write(
          KEYS.users,
          legacy.map((user, index) => ({
            id: user.id || `R-${String(index + 1).padStart(4, '0')}`,
            role: user.role || 'resident',
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
            contact: user.contact || '',
            barangay: user.barangay || '',
            providerId: user.providerId || null,
            businessName: user.businessName || '',
            createdAt: user.createdAt || new Date().toISOString(),
            updatedAt: user.updatedAt || user.createdAt || new Date().toISOString()
          }))
        );
      }
    }
    if (!localStorage.getItem(KEYS.feedback) && localStorage.getItem(KEYS.legacyFeedback)) {
      write(KEYS.feedback, parse(localStorage.getItem(KEYS.legacyFeedback), {}));
    }
    // Migrate a legacy session at most once, then delete the legacy key so
    // logout cannot be reversed by re-running this migration on the next page.
    if (!localStorage.getItem(KEYS.session) && localStorage.getItem(KEYS.legacySession)) {
      const legacy = parse(localStorage.getItem(KEYS.legacySession), null);
      if (legacy && legacy.email) {
        const users = read(KEYS.users, []);
        const match = users.find((u) => u.email === legacy.email);
        if (match) {
          write(KEYS.session, {
            userId: match.id,
            role: match.role || 'resident',
            signedInAt: new Date().toISOString()
          });
        }
      }
      localStorage.removeItem(KEYS.legacySession);
      sessionStorage.removeItem(KEYS.legacySession);
    }
  };

  migrateLegacy();

  const getUsers = () => read(KEYS.users, []);
  const saveUsers = (users) => write(KEYS.users, users);
  const getUser = (userId) => getUsers().find((user) => user.id === userId) || null;
  const updateUser = (userId, updates) => {
    const users = getUsers();
    const index = users.findIndex((user) => user.id === userId);
    if (index < 0) return null;
    users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
    saveUsers(users);
    return users[index];
  };

  const getRequests = () => {
    const list = read(KEYS.requests, []);
    return Array.isArray(list) ? list : [];
  };

  const saveRequests = (requests) => write(KEYS.requests, requests);

  const addRequest = (request) => {
    const requests = getRequests();
    requests.unshift(request);
    saveRequests(requests);
    return request;
  };

  const updateRequest = (requestId, updates) => {
    const requests = getRequests();
    const index = requests.findIndex((item) => String(item.id) === String(requestId));
    if (index < 0) return null;
    requests[index] = {
      ...requests[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveRequests(requests);
    return requests[index];
  };

  const getRequestsForUser = (userId) =>
    getRequests()
      .filter((item) => item.userId === userId)
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  const getRequestsForProvider = (providerId) =>
    getRequests()
      .filter((item) => String(item.providerId) === String(providerId))
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  const getFeedback = () => {
    const data = read(KEYS.feedback, {});
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  };

  const getFeedbackForProvider = (providerId) => {
    const all = getFeedback();
    const list = all[String(providerId)];
    return Array.isArray(list) ? list : [];
  };

  const hasFeedbackForRequest = (requestId) => {
    if (!requestId) return false;
    const all = getFeedback();
    const target = String(requestId);
    return Object.values(all).some(
      (list) => Array.isArray(list) && list.some((entry) => String(entry.requestId) === target)
    );
  };

  const addFeedback = (providerId, entry) => {
    const all = getFeedback();
    const key = String(providerId);
    const list = Array.isArray(all[key]) ? all[key] : [];
    if (entry.requestId && list.some((item) => String(item.requestId) === String(entry.requestId))) {
      throw new Error('You already left feedback for this completed request.');
    }
    list.unshift(entry);
    all[key] = list;
    write(KEYS.feedback, all);
    return entry;
  };

  const getFavorites = (userId) => {
    const all = read(KEYS.favorites, {});
    const list = all[String(userId)];
    return Array.isArray(list) ? list : [];
  };

  const toggleFavorite = (userId, providerId) => {
    const all = read(KEYS.favorites, {});
    const key = String(userId);
    const list = Array.isArray(all[key]) ? all[key] : [];
    const id = String(providerId);
    const index = list.indexOf(id);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.unshift(id);
    }
    all[key] = list;
    write(KEYS.favorites, all);
    return list;
  };

  const isFavorite = (userId, providerId) =>
    getFavorites(userId).includes(String(providerId));

  window.SerbisyoStore = {
    KEYS,
    read,
    write,
    getUsers,
    saveUsers,
    getUser,
    updateUser,
    getRequests,
    saveRequests,
    addRequest,
    updateRequest,
    getRequestsForUser,
    getRequestsForProvider,
    getFeedback,
    getFeedbackForProvider,
    hasFeedbackForRequest,
    addFeedback,
    getFavorites,
    toggleFavorite,
    isFavorite
  };
})();
