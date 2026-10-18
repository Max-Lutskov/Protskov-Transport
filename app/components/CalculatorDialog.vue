<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const { open } = useCalculator()
// На телефоні — шторка знизу, на більших екранах — модальне вікно
const isDesktop = useMediaQuery('(min-width: 768px)')

const title = 'Скільки матеріалу потрібно'
const description = 'Орієнтовний розрахунок ваги й машини'
</script>

<template>
  <!-- Розмір екрана відомий лише в браузері, а закритий калькулятор на сервері не потрібен -->
  <ClientOnly>
    <UModal v-if="isDesktop" v-model:open="open" :title="title" :description="description" :ui="{ content: 'max-w-xl' }">
      <template #body>
        <CalculatorBody @done="open = false" />
      </template>
    </UModal>
    <UDrawer v-else v-model:open="open" :title="title" :description="description">
      <template #body>
        <div class="max-h-[75dvh] overflow-y-auto px-1 pb-4">
          <CalculatorBody @done="open = false" />
        </div>
      </template>
    </UDrawer>
  </ClientOnly>
</template>
