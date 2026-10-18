<script setup lang="ts">
import { company } from '~/data/site'

const facts = [
  { title: `Понад ${company.years} років роботи`, text: 'Возимо матеріали й працюємо технікою у Вінниці та навколо.' },
  { title: 'Власні машини й техніка', text: 'Самоскиди, екскаватор, мініекскаватор і бобкет працюють з нашими водіями.' },
  { title: 'Розмова з власником', text: `На дзвінки відповідає ${company.owner}. Об'єм, ціну й час доставки погоджуєте з ним одразу.` }
]
</script>

<template>
  <section class="py-14 md:py-20">
    <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div class="max-w-xl">
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">
          Нас радять знайомим
        </h2>
        <p class="mt-4 text-lg text-toned">
          Більшість замовлень приходить від людей, яким ми вже возили щебінь чи копали котлован, або від їхніх знайомих. Тому працюємо так, щоб нас рекомендували й далі.
        </p>
      </div>

      <dl class="divide-y divide-default border-y border-default">
        <div v-for="f in facts" :key="f.title" class="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
          <dt class="font-semibold text-highlighted">{{ f.title }}</dt>
          <dd class="text-toned">{{ f.text }}</dd>
        </div>
      </dl>
    </UContainer>
  </section>
</template>
