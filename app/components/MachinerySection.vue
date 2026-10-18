<script setup lang="ts">
import { machinery, company } from '~/data/site'

const price = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
</script>

<template>
  <section id="tekhnika" class="bg-granite-900 py-14 text-granite-200 md:py-20">
    <UContainer>
      <div class="max-w-2xl">
        <h2 class="font-display text-2xl font-medium text-white md:text-3xl">Послуги спецтехніки</h2>
        <p class="mt-3">
          Уся техніка працює з нашим водієм, тож шукати оператора окремо не потрібно. Можна замовити разом із матеріалом: привеземо щебінь і одразу розрівняємо.
        </p>
      </div>

      <div class="mt-10 grid gap-px overflow-hidden rounded-lg bg-granite-700 md:grid-cols-3">
        <article v-for="m in machinery" :key="m.id" class="flex flex-col bg-granite-900 p-6 md:p-8">
          <h3 class="text-2xl font-semibold text-white">{{ m.name }}</h3>
          <ul class="mt-5 flex-1 space-y-2.5">
            <li v-for="job in m.jobs" :key="job" class="flex gap-3">
              <UIcon name="i-lucide-check" class="mt-0.5 size-5 shrink-0 text-signal-400" />
              <span>{{ job }}</span>
            </li>
          </ul>
          <p class="mt-6 text-granite-300">
            від <b class="text-xl font-semibold text-white tabular-nums">{{ price(m.priceFrom) }}</b> грн/год
          </p>
        </article>
      </div>

      <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <UButton :to="`tel:${company.phone}`" icon="i-lucide-phone" label="Замовити техніку" size="xl" />
        <p class="text-sm text-granite-400">Ціни орієнтовні. Вартість залежить від обсягу робіт і відстані.</p>
      </div>
    </UContainer>
  </section>
</template>
