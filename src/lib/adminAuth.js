// TEMPORARY testing-only auth: a single hardcoded password, no real backend
// session. Replace with real Supabase Auth (see PLAN.md) before this ever
// touches real customer/booking data.
const STORAGE_KEY = "admin_authenticated"
const TEST_PASSWORD = "admin"

export function isAdminAuthenticated() {
  return sessionStorage.getItem(STORAGE_KEY) === "true"
}

export function loginAsAdmin(password) {
  if (password !== TEST_PASSWORD) return false
  sessionStorage.setItem(STORAGE_KEY, "true")
  return true
}

export function logoutAdmin() {
  sessionStorage.removeItem(STORAGE_KEY)
}
