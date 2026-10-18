<script setup lang="ts">
import { trucks, machinery } from '~/data/site'

const max = Math.max(...trucks.map(t => t.capacity))
const cubes = (t: number) => Math.round(t / 1.4)
</script>

<template>
  <section id="avtopark" class="py-14 md:py-20">
    <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
      <div>
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Власний автопарк</h2>
        <p class="mt-3 text-toned">
          Три самоскиди різного розміру: під кожне замовлення беремо машину, яка привезе все за один рейс і заїде до вашого двору.
        </p>
        <p class="mt-6 text-toned">А також:</p>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li v-for="m in machinery" :key="m.id" class="rounded-full border border-default bg-default px-3 py-1 text-sm text-highlighted">
            {{ m.name }}
          </li>
        </ul>
      </div>

      <ul class="space-y-6">
        <li v-for="t in trucks" :key="t.name">
          <div class="flex items-baseline justify-between gap-4">
            <h3 class="text-xl font-semibold text-highlighted">{{ t.name }}</h3>
            <p class="text-toned">
              до <b class="text-highlighted">{{ t.capacity }} т</b>, це приблизно {{ cubes(t.capacity) }} м³ щебеню
            </p>
          </div>
          <div class="mt-2 h-4 overflow-hidden rounded-full bg-granite-200" role="presentation">
            <div class="h-full rounded-full bg-signal-500" :style="{ width: `${(t.capacity / max) * 100}%` }" />
          </div>
        </li>
      </ul>
    </UContainer>
  </section>
</template>
