import { ref } from "vue"
import { supabase } from "@/lib/supabase"

export function useBookings() {
  const bookings = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function submitRequest({ name, email, phone, from, to, message }) {
    const { data, error: err } = await supabase
      .from("bookings")
      .insert({
        name,
        email,
        phone: phone || null,
        from_date: from,
        to_date: to,
        message: message || null,
      })
      .select()
      .single()
    if (err) throw err
    return data
  }

  async function fetchBookings() {
    loading.value = true
    const { data, error: err } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
    loading.value = false
    if (err) {
      error.value = err.message
      return
    }
    bookings.value = data
  }

  async function confirmBooking(booking) {
    const { error: err } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", booking.id)
    if (err) throw err

    const { error: blockErr } = await supabase.from("blocked_dates").insert({
      from_date: booking.from_date,
      to_date: booking.to_date,
      source: "booking",
      booking_id: booking.id,
    })
    if (blockErr) throw blockErr

    await fetchBookings()
  }

  async function rejectBooking(booking) {
    const { error: err } = await supabase
      .from("bookings")
      .update({ status: "rejected" })
      .eq("id", booking.id)
    if (err) throw err
    await fetchBookings()
  }

  return {
    bookings,
    loading,
    error,
    submitRequest,
    fetchBookings,
    confirmBooking,
    rejectBooking,
  }
}
