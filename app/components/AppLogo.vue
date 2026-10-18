<script setup lang="ts">
import { company } from '~/data/site'

defineProps<{ inverted?: boolean }>()
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-3" :aria-label="`${company.name} — на головну`">
    <svg viewBox="0 0 40 40" class="size-10 shrink-0" aria-hidden="true">
      <rect width="40" height="40" rx="6" fill="#f5b800" />
      <path d="M6 31 L17 15 L22 21 L26 17 L34 31 Z" fill="#262b2e" />
      <circle cx="13" cy="28" r="1.6" fill="#f5b800" />
      <circle cx="19" cy="26" r="1.2" fill="#f5b800" />
      <circle cx="25" cy="28.5" r="1.4" fill="#f5b800" />
    </svg>
    <span class="leading-tight">
      <span class="font-display block text-lg font-bold" :class="inverted ? 'text-white' : 'text-highlighted'">
        {{ company.name }}
      </span>
      <span class="block text-xs" :class="inverted ? 'text-granite-300' : 'text-muted'">
        {{ company.tagline }}
      </span>
    </span>
  </NuxtLink>
</template>
