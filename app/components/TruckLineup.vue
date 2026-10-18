<script setup lang="ts">
// Самоскиди збоку в одному масштабі (1 одиниця = 10 см). Тимчасово, поки немає реальних фото.
// Кожна машина — окремий SVG, а ширина колонки пропорційна довжині, тож масштаб у всіх однаковий.
import { trucks } from '~/data/site'

interface Shape {
  length: number
  /** Капотна кабіна (ЗІЛ) чи кабіна над двигуном */
  hood: boolean
  cabEnd: number
  cabTop: number
  axles: number[]
  bodyStart: number
  bodyTop: number
  load: number
}

const shapes: Record<string, Shape> = {
  ЗІЛ: { length: 66, hood: true, cabEnd: 21, cabTop: 9, axles: [12, 50], bodyStart: 24, bodyTop: 17, load: 3 },
  КАМАЗ: { length: 76, hood: false, cabEnd: 22, cabTop: 6, axles: [12, 52, 65], bodyStart: 25, bodyTop: 15, load: 4 },
  Volvo: { length: 96, hood: false, cabEnd: 24, cabTop: 3, axles: [11, 27, 72, 86], bodyStart: 28, bodyTop: 12, load: 5 }
}

const H = 38
const WHEEL_R = 5
const FRAME_Y = 26

const lineup = trucks.flatMap((t) => {
  const s = shapes[t.name]
  if (!s) return []
  const end = s.length - 1
  const cab = s.hood
    ? `M10,29 L10,${s.cabTop + 1} Q10,${s.cabTop} 11,${s.cabTop} L${s.cabEnd},${s.cabTop} L${s.cabEnd},29 Z`
    : `M1,29 L1,${s.cabTop + 4} Q1,${s.cabTop} 5,${s.cabTop} L${s.cabEnd},${s.cabTop} L${s.cabEnd},29 Z`
  const glass = s.hood
    ? `M12,${s.cabTop + 2} L19,${s.cabTop + 2} L19,${s.cabTop + 8} L12,${s.cabTop + 8} Z`
    : `M3,${s.cabTop + 3} L${s.cabEnd - 9},${s.cabTop + 3} L${s.cabEnd - 9},${s.cabTop + 10} L2,${s.cabTop + 10} Z`
  const mid = (s.bodyStart + end) / 2
  // Ребра жорсткості кузова
  const ribs = Array.from({ length: Math.floor((end - s.bodyStart) / 8) }, (_, i) => s.bodyStart + 6 + i * 8)
  return [{
    ...t,
    ...s,
    cab,
    glass,
    hoodPath: s.hood ? `M0,29 L0,20 Q0,18 2,18 L10,17 L10,29 Z` : '',
    body: `M${s.bodyStart},${FRAME_Y} L${s.bodyStart + 1},${s.bodyTop} L${end},${s.bodyTop} L${end},${FRAME_Y} Z`,
    heap: `M${s.bodyStart + 1.5},${s.bodyTop} Q${mid},${s.bodyTop - s.load * 2} ${end - 0.5},${s.bodyTop} Z`,
    ribs,
    cubes: Math.round(t.capacity / 1.4)
  }]
})

const summary = lineup.map(t => `${t.name} до ${t.capacity} т`).join(', ')
</script>

<template>
  <figure>
    <div class="flex items-end gap-3 border-b-2 border-granite-800 sm:gap-6">
      <svg
        v-for="t in lineup"
        :key="t.name"
        :viewBox="`0 0 ${t.length} ${H}`"
        :style="{ flex: `${t.length} 1 0` }"
        class="block h-auto min-w-0"
        aria-hidden="true"
      >
        <path :d="t.heap" class="fill-granite-500" />
        <path :d="t.body" class="fill-signal-500 stroke-signal-700" stroke-width="0.6" stroke-linejoin="round" />
        <line
          v-for="x in t.ribs"
          :key="x"
          :x1="x"
          :x2="x"
          :y1="t.bodyTop + 1.5"
          :y2="FRAME_Y - 1"
          class="stroke-signal-700"
          stroke-width="0.6"
        />
        <rect :x="t.hood ? 2 : 4" :y="FRAME_Y" :width="t.length - (t.hood ? 3 : 5)" height="2.5" class="fill-granite-900" />
        <path v-if="t.hoodPath" :d="t.hoodPath" class="fill-granite-700" />
        <path :d="t.cab" class="fill-granite-700" />
        <path :d="t.glass" class="fill-granite-200" />
        <line :x1="t.cabEnd - 7" :x2="t.cabEnd - 7" :y1="t.cabTop + 2" y2="28" class="stroke-granite-900" stroke-width="0.4" />
        <rect :x="t.cabEnd - 5.5" :y="t.cabTop + 12" width="2" height="0.8" class="fill-granite-900" />
        <rect x="0" y="27" width="4" height="2.4" class="fill-granite-950" />
        <rect :x="0.6" :y="t.hood ? 21.5 : 23.5" width="1.6" height="1.6" class="fill-signal-200" />
        <g v-for="x in t.axles" :key="x">
          <circle :cx="x" :cy="H - WHEEL_R" :r="WHEEL_R" class="fill-granite-950" />
          <circle :cx="x" :cy="H - WHEEL_R" r="2.6" class="fill-granite-300" />
          <circle :cx="x" :cy="H - WHEEL_R" r="0.9" class="fill-granite-700" />
        </g>
      </svg>
    </div>

    <ul class="mt-3 flex gap-3 text-sm sm:gap-6" aria-hidden="true">
      <li v-for="t in lineup" :key="t.name" :style="{ flex: `${t.length} 1 0` }" class="min-w-0">
        <p class="font-semibold text-highlighted">{{ t.name }}</p>
        <p class="text-toned">до {{ t.capacity }} т</p>
        <p class="text-muted">≈ {{ t.cubes }} м³<span class="hidden sm:inline"> щебеню</span></p>
      </li>
    </ul>
    <figcaption class="sr-only">Наші самоскиди в одному масштабі: {{ summary }}.</figcaption>
  </figure>
</template>
