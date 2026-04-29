// ============================================================
// js/api.js — Centralized API Fetch Helper
// ============================================================

const API_BASE = "/api";

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

  const res = await fetch(API_BASE + endpoint, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
