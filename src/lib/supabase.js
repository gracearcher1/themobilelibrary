import { createClient } from "@supabase/supabase-js"

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.warn(
    "Supabase env vars are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env " +
      "(see PLAN.md for setup steps). Availability, booking requests, and admin login will not work until then.",
  )
}

// Falls back to a placeholder URL so createClient doesn't throw before .env is set up;
// calls will fail with a clear network error instead of crashing the whole app on load.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
)
