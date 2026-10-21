<script setup lang="ts">
import { materials, company } from '~/data/site'

const emit = defineEmits<{ done: [] }>()
const { materialId } = useCalculator()

const calculable = materials.filter(m => m.density)
const materialItems = calculable.map(m => ({ label: m.name, value: m.id }))

const mode = ref<'size' | 'volume'>('size')
const length = ref<number | undefined>()
const width = ref<number | undefined>()
const depthCm = ref<number | undefined>(15)
const volume = ref<number | undefined>()

const material = computed(() => findMaterial(materialId.value) ?? calculable[0]!)

const cubic = computed(() => {
  if (mode.value === 'volume') return Number(volume.value) || 0
  const l = Number(length.value) || 0
  const w = Number(width.value) || 0
  const d = (Number(depthCm.value) || 0) / 100
  return l * w * d
})

const tonnes = computed(() => cubic.value * (material.value.density ?? 1.5))
const plan = computed(() => (tonnes.value > 0 ? planTrucks(tonnes.value) : null))
const priceFrom = computed(() => Math.round(tonnes.value * material.value.priceFrom / 50) * 50)

const summary = computed(() => {
  if (!plan.value) return ''
  const trips = plan.value.trips > 1 ? `, ${plan.value.trips} рейси` : ''
  return `Калькулятор: ${material.value.name}, ≈ ${formatNumber(cubic.value)} м³ ≈ ${formatNumber(tonnes.value)} т. Машина: ${plan.value.name}${trips}.`
})

// Числа великі, без стрілок браузера; одиниця виміру стоїть усередині поля
const numberUi = {
  base: 'text-lg font-semibold tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
  trailing: 'pointer-events-none text-muted'
}

const sizePresets = [
  { label: 'Доріжка', depth: 10 },
  { label: 'Під бруківку', depth: 15 },
  { label: 'Під фундамент', depth: 20 }
]
</script>

<template>
  <div data-track-place="calculator" class="space-y-6">
    <UFormField label="Матеріал">
      <USelect v-model="materialId" :items="materialItems" size="xl" class="w-full" />
    </UFormField>

    <div class="grid grid-cols-2 gap-1 rounded-lg bg-granite-100 p-1" role="tablist" aria-label="Як рахувати">
      <button
        v-for="opt in [{ v: 'size', l: 'Знаю розміри' }, { v: 'volume', l: 'Знаю об\'єм' }]"
        :key="opt.v"
        type="button"
        role="tab"
        :aria-selected="mode === opt.v"
        class="rounded-md px-3 py-2.5 text-sm font-semibold transition-colors"
        :class="mode === opt.v ? 'bg-white text-highlighted shadow-sm' : 'text-muted hover:text-highlighted'"
        @click="mode = opt.v as 'size' | 'volume'"
      >
        {{ opt.l }}
      </button>
    </div>

    <div v-if="mode === 'size'" class="space-y-3">
      <div class="grid grid-cols-3 gap-3">
        <UFormField label="Довжина">
          <UInput v-model.number="length" type="number" inputmode="decimal" min="0" step="0.5" placeholder="0" size="xl" :ui="numberUi" class="w-full">
            <template #trailing>м</template>
          </UInput>
        </UFormField>
        <UFormField label="Ширина">
          <UInput v-model.number="width" type="number" inputmode="decimal" min="0" step="0.5" placeholder="0" size="xl" :ui="numberUi" class="w-full">
            <template #trailing>м</template>
          </UInput>
        </UFormField>
        <UFormField label="Шар">
          <UInput v-model.number="depthCm" type="number" inputmode="numeric" min="0" step="5" size="xl" :ui="numberUi" class="w-full">
            <template #trailing>см</template>
          </UInput>
        </UFormField>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="p in sizePresets"
          :key="p.label"
          type="button"
          :aria-pressed="depthCm === p.depth"
          class="rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors"
          :class="depthCm === p.depth ? 'bg-granite-900 text-white' : 'bg-granite-100 text-toned hover:bg-granite-200 hover:text-highlighted'"
          @click="depthCm = p.depth"
        >
          {{ p.label }}, {{ p.depth }} см
        </button>
      </div>
    </div>

    <UFormField v-else label="Об'єм">
      <UInput v-model.number="volume" type="number" inputmode="decimal" min="0" step="0.5" placeholder="0" size="xl" :ui="numberUi" class="w-full">
        <template #trailing>м³</template>
      </UInput>
    </UFormField>

    <div v-if="plan" class="rounded-xl bg-granite-900 p-5 text-granite-300" aria-live="polite">
      <p class="font-display text-4xl font-medium text-white tabular-nums">≈ {{ formatNumber(tonnes) }} т</p>
      <p class="mt-1">{{ formatNumber(cubic) }} м³, {{ material.name.toLowerCase() }}</p>
      <p class="mt-4 flex items-center gap-2.5 border-t border-granite-700 pt-4 text-granite-200">
        <UIcon name="i-lucide-truck" class="size-5 shrink-0 text-signal-400" />
        <span>
          Підійде <b class="font-semibold text-signal-400">{{ plan.name }}</b>
          <template v-if="plan.trips > 1">, {{ plan.trips }} рейси</template>
          <template v-else> (до {{ plan.capacity }} т)</template>
        </span>
      </p>
      <p class="mt-2 text-sm text-granite-400">Матеріал орієнтовно від {{ formatNumber(priceFrom, 0) }} грн, без доставки</p>
    </div>
    <p v-else class="rounded-xl bg-granite-100 p-5 text-sm text-toned">
      Введіть розміри ділянки або об'єм, і ми порахуємо вагу та підберемо машину.
    </p>

    <div v-if="plan" class="space-y-3 border-t border-granite-100 pt-6">
      <p class="font-semibold text-highlighted">Надіслати розрахунок Олександру</p>
      <LeadForm compact :prefill="summary" :service="material.name" @sent="emit('done')" />
      <UButton :to="`tel:${company.phone}`" icon="i-lucide-phone" :label="`Або подзвонити: ${company.phoneDisplay}`" color="neutral" variant="ghost" block />
    </div>
  </div>
</template>
