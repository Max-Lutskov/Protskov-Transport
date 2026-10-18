<script setup lang="ts">
import { company, messengers, materials, machinery } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-granite-950 pb-24 text-granite-300 md:pb-0">
    <UContainer class="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
      <div class="space-y-4">
        <AppLogo inverted />
        <p class="max-w-sm text-sm">
          Доставка щебеню, піску, каменю й чорнозему та послуги спецтехніки. {{ company.area }}.
        </p>
      </div>

      <div>
        <h2 class="mb-3 font-semibold text-white">Що возимо й робимо</h2>
        <ul class="space-y-1.5 text-sm">
          <li v-for="m in materials" :key="m.id">{{ m.name }}</li>
          <li v-for="m in machinery" :key="m.id">{{ m.name }}</li>
        </ul>
      </div>

      <div class="space-y-3 text-sm">
        <h2 class="font-semibold text-white">Контакти</h2>
        <a :href="`tel:${company.phone}`" class="font-display block text-xl font-bold text-signal-400 hover:text-signal-300">
          {{ company.phoneDisplay }}
        </a>
        <p>{{ company.owner }}</p>
        <p>Приймаємо замовлення {{ company.hours }}</p>
        <ul class="flex gap-2">
          <li v-for="m in messengers" :key="m.name">
            <UButton :to="m.href" :icon="m.icon" :aria-label="m.name" color="neutral" variant="ghost" class="text-granite-200 hover:bg-granite-800 hover:text-white" target="_blank" rel="noopener" />
          </li>
        </ul>
      </div>
    </UContainer>
    <div class="border-t border-granite-800">
      <UContainer class="py-5 text-xs text-granite-400">
        © {{ year }} {{ company.name }}
      </UContainer>
    </div>
  </footer>
</template>
