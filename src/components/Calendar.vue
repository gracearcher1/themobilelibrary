<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ from: null, to: null }),
  },
  disabledRanges: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["update:modelValue"])

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

function pad(n) {
  return n < 10 ? `0${n}` : `${n}`
}

function toISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function todayISO() {
  return toISO(new Date())
}

function addDays(iso, days) {
  const [y, m, d] = iso.split("-").map(Number)
  const date = new Date(y, m - 1, d + days)
  return toISO(date)
}

const today = todayISO()
const visibleMonth = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))

const monthLabel = computed(() =>
  visibleMonth.value.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
)

function isDisabled(iso) {
  if (iso < today) return true
  return props.disabledRanges.some((range) => iso >= range.from_date && iso <= range.to_date)
}

function isRangeBlocked(fromIso, toIso) {
  let cursor = fromIso
  while (cursor <= toIso) {
    if (isDisabled(cursor)) return true
    cursor = addDays(cursor, 1)
  }
  return false
}

const cells = computed(() => {
  const year = visibleMonth.value.getFullYear()
  const month = visibleMonth.value.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Monday-first weekday index (0 = Monday ... 6 = Sunday)
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7

  const result = []
  for (let i = 0; i < leadingBlanks; i++) result.push(null)
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    result.push({ day, iso: toISO(date) })
  }
  while (result.length % 7 !== 0) result.push(null)
  return result
})

function prevMonth() {
  visibleMonth.value = new Date(
    visibleMonth.value.getFullYear(),
    visibleMonth.value.getMonth() - 1,
    1,
  )
}

function nextMonth() {
  visibleMonth.value = new Date(
    visibleMonth.value.getFullYear(),
    visibleMonth.value.getMonth() + 1,
    1,
  )
}

function cellState(iso) {
  const { from, to } = props.modelValue
  if (from && iso === from) return "endpoint"
  if (to && iso === to) return "endpoint"
  if (from && to && iso > from && iso < to) return "in-range"
  return "default"
}

function handleClick(cell) {
  if (!cell || isDisabled(cell.iso)) return
  const { from, to } = props.modelValue

  if (!from || to) {
    emit("update:modelValue", { from: cell.iso, to: null })
    return
  }

  if (cell.iso < from) {
    emit("update:modelValue", { from: cell.iso, to: from })
    return
  }

  if (isRangeBlocked(from, cell.iso)) {
    emit("update:modelValue", { from: cell.iso, to: null })
    return
  }

  emit("update:modelValue", { from, to: cell.iso })
}
</script>

<template>
  <div class="font-mono tracking-wider select-none">
    <div class="flex items-center justify-between mb-4">
      <button
        type="button"
        @click="prevMonth"
        aria-label="Previous month"
        class="px-2 py-1 hover:opacity-70 transition-opacity cursor-pointer text-body"
      >
        ‹
      </button>
      <p class="text-sm sm:text-base text-body">{{ monthLabel }}</p>
      <button
        type="button"
        @click="nextMonth"
        aria-label="Next month"
        class="px-2 py-1 hover:opacity-70 transition-opacity cursor-pointer text-body"
      >
        ›
      </button>
    </div>

    <div class="grid grid-cols-7 gap-1 mb-1">
      <span
        v-for="wd in WEEKDAYS"
        :key="wd"
        class="text-center text-xs text-muted py-1"
      >
        {{ wd }}
      </span>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <button
        v-for="(cell, index) in cells"
        :key="cell ? cell.iso : `blank-${index}`"
        type="button"
        :disabled="!cell || isDisabled(cell.iso)"
        @click="handleClick(cell)"
        class="aspect-square rounded-md text-sm transition-colors duration-150 flex items-center justify-center"
        :class="{
          invisible: !cell,
          'text-gray-600 cursor-not-allowed': cell && isDisabled(cell.iso),
          'text-body hover:bg-body/15 cursor-pointer':
            cell && !isDisabled(cell.iso) && cellState(cell.iso) === 'default',
          'bg-body text-page cursor-pointer':
            cell && !isDisabled(cell.iso) && cellState(cell.iso) === 'endpoint',
          'bg-body/20 text-body cursor-pointer':
            cell && !isDisabled(cell.iso) && cellState(cell.iso) === 'in-range',
          'ring-1 ring-muted': cell && cell.iso === today,
        }"
      >
        {{ cell ? cell.day : "" }}
      </button>
    </div>

    <div class="flex items-center gap-4 mt-4 text-xs text-muted">
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-sm bg-gray-600"></span> unavailable
      </span>
      <span class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-sm bg-body"></span> selected
      </span>
    </div>
  </div>
</template>
