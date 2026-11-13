const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const KEY = "collabspace_token";

// "Remember me" ticked -> localStorage (survives closing the browser)
// unticked -> sessionStorage (cleared when the tab closes)
export const tokenStore = {
  get: () => localStorage.getItem(KEY) || sessionStorage.getItem(KEY),
  set: (token, remember) => {
    tokenStore.clear();
    (remember ? localStorage : sessionStorage).setItem(KEY, token);
  },
  clear: () => {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
  },
};

// Small fetch wrapper: adds the token, parses JSON, throws readable errors.
export async function api(path, { method = "GET", body } = {}) {
  const token = tokenStore.get();
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers: { "Content-Type": "application/json", ...(token && { Authorization: `Bearer ${token}` }) },
      body: body && JSON.stringify(body),
    });
  } catch {
    throw new Error("Can't reach the server. Is it running?");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Something went wrong.");
    err.field = data.field; // lets the form show the error under the right input
    err.status = res.status;
    throw err;
  }
  return data;
}
