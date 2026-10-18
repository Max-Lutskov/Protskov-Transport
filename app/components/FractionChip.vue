<script setup lang="ts">
// Фракція щебеню з кружечком, розмір якого відповідає розміру зерна
const props = defineProps<{ value: string }>()

const size = computed(() => {
  const [min = 0, max = 0] = props.value.split('–').map(Number)
  const mid = (min + max) / 2
  return Math.round(6 + mid * 0.25)
})
</script>

<template>
  <span class="inline-flex items-center gap-2 rounded-md bg-granite-900 py-1.5 pr-3 pl-2 text-sm font-semibold text-white tabular-nums">
    <span class="inline-flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
      <span class="block rounded-full bg-signal-400" :style="{ width: `${size}px`, height: `${size}px` }" />
    </span>
    {{ value }} мм
  </span>
</template>
