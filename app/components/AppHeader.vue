<script setup lang="ts">
import { company } from '~/data/site'

const links = [
  { label: 'Спецтехніка', to: '/#tekhnika' },
  { label: 'Роботи', to: '/#roboty' },
  { label: 'Матеріали', to: '/#materialy' },
  { label: 'Автопарк', to: '/#avtopark' },
  { label: 'Питання', to: '/#pytannia' },
  { label: 'Контакти', to: '/#kontakty' }
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-default bg-default/95 backdrop-blur">
    <UContainer class="flex h-16 items-center justify-between gap-6">
      <AppLogo />

      <nav aria-label="Основна навігація" class="hidden lg:block">
        <ul class="flex items-center gap-1">
          <li v-for="link in links" :key="link.to">
            <UButton :to="link.to" :label="link.label" color="neutral" variant="ghost" />
          </li>
        </ul>
      </nav>

      <UButton
        :to="`tel:${company.phone}`"
        icon="i-lucide-phone"
        :label="company.phoneDisplay"
        color="neutral"
        variant="solid"
        class="hidden sm:inline-flex"
      />
    </UContainer>
  </header>
</template>
