<script setup lang="ts">
import { company } from '~/data/site'

const steps = [
  { title: 'Зателефонуйте або напишіть', text: 'Скажіть, що потрібно і куди везти. Якщо не знаєте об\'єм, порахуємо разом.' },
  { title: 'Домовляємось про ціну й час', text: 'Називаємо вартість із доставкою та час, коли приїде машина чи техніка.' },
  { title: 'Привозимо або виконуємо роботу', text: 'Вивантажуємо в зручному місці, техніка працює з нашим водієм.' }
]
</script>

<template>
  <section class="border-t border-default py-12 md:py-20">
    <UContainer>
      <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Як замовити</h2>
      <ol class="mt-10 grid gap-8 md:grid-cols-3">
        <li v-for="(s, i) in steps" :key="s.title" class="flex gap-4">
          <span class="font-display flex size-11 shrink-0 items-center justify-center rounded-full bg-signal-500 text-lg font-bold text-granite-950">
            {{ i + 1 }}
          </span>
          <div>
            <h3 class="text-lg font-semibold text-highlighted">{{ s.title }}</h3>
            <p class="mt-1 text-toned">{{ s.text }}</p>
            <p v-if="i === 0" class="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <a :href="`tel:${company.phone}`" class="font-display text-lg font-extrabold text-highlighted hover:text-granite-700">{{ company.phoneDisplay }}</a>
              <a href="#kontakty" class="text-sm text-muted underline underline-offset-4 hover:text-highlighted">або залиште заявку</a>
            </p>
          </div>
        </li>
      </ol>
    </UContainer>
  </section>
</template>
