import { supabase } from "@/lib/supabase"

export async function isAdminAuthenticated() {
  const { data } = await supabase.auth.getSession()
  return !!data.session
}

export async function loginAsAdmin(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { success: false, message: error.message }
  return { success: true }
}

export async function logoutAdmin() {
  await supabase.auth.signOut()
}
