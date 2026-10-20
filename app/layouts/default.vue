<script setup lang="ts">
const { open } = useCalculator()
// Калькулятор (модалка, шторка) вантажимо лише після першого відкриття, щоб не гальмувати перший екран
const calculatorUsed = ref(false)
watch(open, (v) => { if (v) calculatorUsed.value = true })
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LazyAppFooter hydrate-on-visible />
    <MobileContactBar />
    <LazyCalculatorDialog v-if="calculatorUsed" />
  </div>
</template>
