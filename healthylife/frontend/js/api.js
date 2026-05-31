// ============================================================
// js/api.js — Centralized API Fetch Helper
// ============================================================

// Determine API base URL based on environment
const API_BASE = (() => {
  // In development, use localhost
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:5000/api";
  }
  // In production (Vercel), use the current domain
  return `${window.location.origin}/api`;
})();

/**
 * Make an authenticated request to the backend.
 * @param {string} endpoint  - e.g. "/users/login"
 * @param {string} method    - GET | POST | PUT | DELETE
 * @param {object} body      - Request body (for POST/PUT)
 * @returns {Promise<object>}
 */

async function apiRequest(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(API_BASE + endpoint, options);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${method} ${endpoint}]:`, error);
    throw error;
  }
}
