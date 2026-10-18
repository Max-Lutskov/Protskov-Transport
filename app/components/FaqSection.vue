<script setup lang="ts">
import { faq } from '~/data/site'
</script>

<template>
  <section id="pytannia" class="border-t border-default bg-default py-14 md:py-20">
    <UContainer class="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Часті питання</h2>
      <UAccordion
        :items="faq"
        type="multiple"
        :ui="{ trigger: 'text-base font-semibold text-highlighted py-4', body: 'text-toned text-base pb-5' }"
      />
    </UContainer>
  </section>
</template>
