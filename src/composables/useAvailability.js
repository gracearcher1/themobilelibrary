import { ref } from "vue"
import { supabase } from "@/lib/supabase"

const DEFAULT_SETTINGS = {
  nightly_rate_pence: 14000,
  min_stay_nights: 0, // 0 means no minimum stay
  owner_email: "",
}

export function useAvailability() {
  const blockedDates = ref([])
  const settings = ref({ ...DEFAULT_SETTINGS })
  const loading = ref(false)
  const error = ref(null)

  async function fetchBlockedDates() {
    loading.value = true
    const { data, error: err } = await supabase
      .from("blocked_dates")
      .select("*")
      .order("from_date", { ascending: true })
    loading.value = false
    if (err) {
      error.value = err.message
      return
    }
    blockedDates.value = data
  }

  async function fetchSettings() {
    const { data, error: err } = await supabase.from("settings").select("*")
    if (err) {
      error.value = err.message
      return
    }
    const next = { ...DEFAULT_SETTINGS }
    for (const row of data) {
      if (row.key === "nightly_rate_pence" || row.key === "min_stay_nights") {
        next[row.key] = Number(row.value)
      } else {
        next[row.key] = row.value
      }
    }
    settings.value = next
  }

  async function updateSetting(key, value) {
    const { error: err } = await supabase
      .from("settings")
      .update({ value: String(value) })
      .eq("key", key)
    if (err) throw err
    await fetchSettings()
  }

  async function addBlock({ from, to, label }) {
    const { error: err } = await supabase.from("blocked_dates").insert({
      from_date: from,
      to_date: to,
      source: "manual",
      label: label || null,
    })
    if (err) throw err
    await fetchBlockedDates()
  }

  async function removeBlock(id) {
    const { error: err } = await supabase
      .from("blocked_dates")
      .delete()
      .eq("id", id)
    if (err) throw err
    await fetchBlockedDates()
  }

  return {
    blockedDates,
    settings,
    loading,
    error,
    fetchBlockedDates,
    fetchSettings,
    updateSetting,
    addBlock,
    removeBlock,
  }
}
