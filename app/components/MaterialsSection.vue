<script setup lang="ts">
import { materials, company } from '~/data/site'

const { openFor } = useCalculator()
const price = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
</script>

<template>
  <section id="materialy" class="py-14 md:py-20">
    <UContainer>
      <div class="max-w-2xl">
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Матеріали з доставкою</h2>
        <p class="mt-3 text-toned">
          Возимо насипом, вивантажуємо там, де вам зручно. Ціна залежить від об'єму й відстані, тому точну суму називаємо по телефону.
        </p>
      </div>

      <ul class="mt-10 divide-y divide-default border-y border-default">
        <li
          v-for="m in materials"
          :key="m.id"
          class="grid gap-4 py-6 md:grid-cols-[1.3fr_1fr_auto] md:items-center md:gap-8"
        >
          <div>
            <h3 class="text-xl font-semibold text-highlighted">{{ m.name }}</h3>
            <p class="mt-1 text-toned">{{ m.description }}</p>
          </div>

          <div class="flex flex-wrap gap-2">
            <FractionChip v-for="f in m.fractions" :key="f" :value="f" />
          </div>

          <div class="flex items-center justify-between gap-4 md:flex-col md:items-end md:gap-2">
            <p class="text-highlighted">
              від <b class="text-xl font-semibold tabular-nums">{{ price(m.priceFrom) }}</b> грн/{{ m.unit }}
            </p>
            <UButton
              v-if="m.density"
              label="Скільки мені треба?"
              icon="i-lucide-calculator"
              color="neutral"
              variant="outline"
              @click="openFor(m.id)"
            />
            <UButton
              v-else
              :to="`tel:${company.phone}`"
              label="Уточнити по телефону"
              icon="i-lucide-phone"
              color="neutral"
              variant="outline"
            />
          </div>
        </li>
      </ul>
      <p class="mt-4 text-sm text-muted">Ціни орієнтовні, без урахування доставки.</p>
    </UContainer>
  </section>
</template>
