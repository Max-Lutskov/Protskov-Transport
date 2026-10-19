<script setup lang="ts">
import { company, messengers } from '~/data/site'
</script>

<template>
  <section id="kontakty" class="py-14 md:py-20">
    <UContainer class="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div>
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Замовити</h2>
        <p class="mt-3 text-toned">Найшвидше — подзвонити. Або залиште заявку, і ми передзвонимо.</p>

        <a :href="`tel:${company.phone}`" class="font-display mt-8 block text-4xl font-extrabold text-highlighted hover:text-granite-700">
          {{ company.phoneDisplay }}
        </a>
        <p class="mt-2 text-toned">{{ company.owner }}</p>

        <ul class="mt-6 flex flex-wrap gap-3">
          <li v-for="m in messengers" :key="m.name">
            <UButton :to="m.href" :icon="m.icon" :label="m.name" color="neutral" variant="outline" size="lg" target="_blank" rel="noopener" />
          </li>
        </ul>

        <dl class="mt-8 space-y-4">
          <!-- Іконка всередині dt: у dl дозволені лише групи dt/dd -->
          <div>
            <dt class="flex gap-3 font-semibold text-highlighted">
              <UIcon name="i-lucide-clock" class="mt-0.5 size-5 shrink-0 text-signal-600" />
              Графік
            </dt>
            <dd class="pl-8 text-toned">Приймаємо замовлення {{ company.hours }}</dd>
          </div>
          <div>
            <dt class="flex gap-3 font-semibold text-highlighted">
              <UIcon name="i-lucide-map-pin" class="mt-0.5 size-5 shrink-0 text-signal-600" />
              Де працюємо
            </dt>
            <dd class="pl-8 text-toned">{{ company.area }}</dd>
          </div>
        </dl>
      </div>

      <div class="rounded-lg border border-default bg-default p-6 md:p-8">
        <h3 class="mb-6 text-xl font-semibold text-highlighted">Заявка на дзвінок</h3>
        <LeadForm />
      </div>
    </UContainer>
  </section>
</template>
