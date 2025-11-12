// utils/auth.js
const KEY = "auth_token";

export function getToken() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
export function setToken(token) {
  try { localStorage.setItem(KEY, token); } catch {}
  window.dispatchEvent(new Event("auth:changed"));
}
export function clearToken() {
  try { localStorage.removeItem(KEY); } catch {}
  window.dispatchEvent(new Event("auth:changed"));
}
export function isLoggedIn() {
  return !!getToken();
}
