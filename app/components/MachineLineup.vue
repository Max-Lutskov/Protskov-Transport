<script setup lang="ts">
// Спецтехніка збоку в тому самому масштабі, що й TruckLineup (1 одиниця = 10 см), кабіною ліворуч.
// Тимчасово, поки немає реальних фото. Гідромолот — навісне обладнання, окремо не малюємо.
import { machinery } from '~/data/site'

const H = 38
/** Довжина кожної машини в одиницях, від неї залежить ширина колонки */
const lengths: Record<string, number> = { ekskavator: 60, miniekskavator: 47, bobkat: 30 }

const lineup = machinery.filter(m => lengths[m.id]).map(m => ({ ...m, length: lengths[m.id]! }))
const price = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
const summary = lineup.map(m => `${m.name}${m.spec ? ` ${m.spec}` : ''}`).join(', ')
</script>

<template>
  <figure>
    <div class="flex items-end gap-3 border-b-2 border-granite-800 sm:gap-6">
      <svg
        v-for="m in lineup"
        :key="m.id"
        :viewBox="`0 0 ${m.length} ${H}`"
        :style="{ flex: `${m.length} 1 0` }"
        class="block h-auto min-w-0"
        aria-hidden="true"
      >
        <!-- Екскаватор-навантажувач JCB: ковш спереду, стріла ззаду в транспортному положенні -->
        <g v-if="m.id === 'ekskavator'">
          <polyline points="49,22 54,6 59,24" fill="none" class="stroke-signal-500" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M56,23 L60,21.5 L60,29 L57,29.5 Z" class="fill-granite-800" />
          <line x1="50" y1="24" x2="53" y2="35.5" class="stroke-granite-900" stroke-width="1.6" />
          <rect x="51" y="35.5" width="4.5" height="1.5" class="fill-granite-900" />
          <rect x="8" y="24" width="42" height="4" class="fill-granite-900" />
          <path d="M42,26 L43,15 L49,15 L50,26 Z" class="fill-signal-500" />
          <path d="M8,26 L8,19 Q8,17 10,17 L24,16 L24,26 Z" class="fill-signal-500" />
          <path d="M23,26 L24,4 Q24,2 26,2 L40,2 Q42,2 42,4 L43,26 Z" class="fill-granite-700" />
          <path d="M26,5 L39.5,5 L40.5,17 L25.5,17 Z" class="fill-granite-200" />
          <line x1="33" y1="5" x2="33" y2="17" class="stroke-granite-700" stroke-width="0.8" />
          <polyline points="30,19 12,20 4,27" fill="none" class="stroke-signal-500" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M0,26.5 L7,25 L8,33.5 L2,34.5 Q0,34.5 0,32.5 Z" class="fill-granite-800" />
          <rect x="8.4" y="18.5" width="1.6" height="1.6" class="fill-signal-200" />
          <g>
            <circle cx="15" cy="33" r="5" class="fill-granite-950" />
            <circle cx="15" cy="33" r="2.6" class="fill-granite-300" />
            <circle cx="15" cy="33" r="0.9" class="fill-granite-700" />
            <circle cx="40" cy="31" r="7" class="fill-granite-950" />
            <circle cx="40" cy="31" r="3.6" class="fill-granite-300" />
            <circle cx="40" cy="31" r="1.2" class="fill-granite-700" />
          </g>
        </g>

        <!-- Мініекскаватор на гусеницях, стріла попереду -->
        <g v-else-if="m.id === 'miniekskavator'">
          <rect x="12" y="31" width="33" height="7" rx="3.5" class="fill-granite-950" />
          <circle cx="15.5" cy="34.5" r="2.4" class="fill-granite-300" />
          <circle cx="41.5" cy="34.5" r="2.4" class="fill-granite-300" />
          <circle v-for="x in [22, 28.5, 35]" :key="x" :cx="x" cy="35" r="1.4" class="fill-granite-500" />
          <rect x="8" y="32.5" width="3.5" height="5.5" class="fill-granite-800" />
          <path d="M14,31 L14,25 Q14,23 16,23 L45,23 Q47,23 47,25 L47,31 Z" class="fill-signal-500" />
          <path d="M20,23 L20,13 Q20,11 22,11 L32,11 L34,23 Z" class="fill-granite-700" />
          <path d="M22,13.5 L31,13.5 L32.5,21 L22,21 Z" class="fill-granite-200" />
          <line x1="17" y1="22" x2="12" y2="15" class="stroke-granite-900" stroke-width="0.8" />
          <polyline points="18,25 10,13 4,28" fill="none" class="stroke-signal-500" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M1,27 L6.5,26 L7.5,32 L3,33.5 Z" class="fill-granite-800" />
        </g>

        <!-- Міні-навантажувач (бобкет): ковш спереду, кабіна-каркас -->
        <g v-else-if="m.id === 'bobkat'">
          <rect x="16" y="16" width="12" height="1.6" rx="0.5" class="fill-granite-700" />
          <line x1="17" y1="17" x2="17" y2="24" class="stroke-granite-700" stroke-width="1" />
          <line x1="27" y1="17" x2="27.5" y2="24" class="stroke-granite-700" stroke-width="1" />
          <rect x="19" y="20" width="5" height="3.5" rx="0.6" class="fill-granite-800" />
          <path d="M5,32 L5,27 L15,27 L15,32 Z" class="fill-signal-500" />
          <path d="M15,32 L15,25 Q15,23.5 16.5,23.5 L28.5,23.5 Q30,23.5 30,25 L30,32 Z" class="fill-signal-500" />
          <polyline points="20,22 8,20.5 3,28" fill="none" class="stroke-signal-500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M0,29 L6,28 L6.5,36.5 L1,37 Q0,37 0,36 Z" class="fill-granite-800" />
          <g v-for="x in [10, 24]" :key="x">
            <circle :cx="x" cy="34" r="4" class="fill-granite-950" />
            <circle :cx="x" cy="34" r="2" class="fill-granite-300" />
            <circle :cx="x" cy="34" r="0.7" class="fill-granite-700" />
          </g>
        </g>
      </svg>
    </div>

    <ul class="mt-3 flex gap-3 text-sm sm:gap-6" aria-hidden="true">
      <li v-for="m in lineup" :key="m.id" :style="{ flex: `${m.length} 1 0` }" class="min-w-0">
        <p class="font-semibold text-highlighted">{{ m.name }}</p>
        <p class="text-toned tabular-nums sm:whitespace-nowrap">{{ price(m.pricePerHour) }} грн/год</p>
      </li>
    </ul>
    <figcaption class="sr-only">Наша спецтехніка в одному масштабі: {{ summary }}.</figcaption>
  </figure>
</template>
