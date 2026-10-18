<script setup lang="ts">
import { company, messengers, machinery } from '~/data/site'

const { openFor } = useCalculator()
const minRate = new Intl.NumberFormat('uk-UA').format(Math.min(...machinery.map(m => m.pricePerHour)))
</script>

<template>
  <section class="border-b border-default">
    <UContainer class="grid gap-8 pt-10 md:pt-16 lg:grid-cols-2 lg:items-end lg:gap-14">
      <div>
        <h1 class="font-display text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.1] font-medium text-highlighted text-balance">
          Оренда спецтехніки з водієм у Вінниці
        </h1>
        <p class="mt-5 max-w-xl text-lg text-toned">
          Екскаватор JCB, мініекскаватор, бобкет і гідромолот від {{ minRate }} грн/год.
          Самоскиди привезуть щебінь і пісок або вивезуть ґрунт. {{ company.area }}.
        </p>
      </div>

      <div>
        <div>
          <a
            :href="`tel:${company.phone}`"
            class="font-display inline-block whitespace-nowrap text-[clamp(2.4rem,7.5vw,4.6rem)] leading-none lg:text-[clamp(2.4rem,4vw,3.6rem)] font-extrabold tracking-tight text-highlighted underline decoration-signal-500 decoration-[0.12em] underline-offset-[0.18em] hover:decoration-signal-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-600"
          >
            {{ company.phoneDisplay }}
          </a>
          <p class="mt-4 text-toned">
            Телефон власника, {{ company.owner }}.
            <span class="block">Дзвоніть {{ company.hours }}.</span>
          </p>
        </div>

        <div class="mt-7 flex flex-wrap items-center gap-2">
          <UButton :to="`tel:${company.phone}`" icon="i-lucide-phone" label="Подзвонити" size="xl" />
          <UButton
            v-for="m in messengers"
            :key="m.name"
            :to="m.href"
            :icon="m.icon"
            :label="m.name"
            color="neutral"
            variant="outline"
            size="xl"
            target="_blank"
            rel="noopener"
          />
        </div>

        <button
          type="button"
          class="mt-6 inline-flex items-center gap-2 text-sm text-muted underline underline-offset-4 hover:text-highlighted"
          @click="openFor()"
        >
          <UIcon name="i-lucide-calculator" class="size-4" />
          Не знаєте, скільки тонн потрібно? Порахуйте
        </button>
      </div>

    </UContainer>

    <UContainer class="mt-10 grid gap-8 md:mt-14 lg:flex lg:items-start lg:gap-10">
      <!-- Ваги колонок = сумарна довжина машин, а основа 48px = два внутрішні проміжки по 24px,
           тож масштаб в обох рядах однаковий і лінія землі на одному рівні -->
      <MachineLineup class="lg:flex-[137_1_48px]" />
      <TruckLineup class="lg:flex-[238_1_48px]" />
    </UContainer>

    <UContainer>
      <ul class="grid gap-x-8 gap-y-3 py-6 text-sm sm:grid-cols-3">
        <li class="flex items-center gap-3">
          <UIcon name="i-lucide-map-pin" class="size-5 shrink-0 text-signal-600" />
          <span><b class="text-highlighted">Вінниця + 30 км.</b> Працюємо й у найближчих селах</span>
        </li>
        <li class="flex items-center gap-3">
          <UIcon name="i-lucide-clock" class="size-5 shrink-0 text-signal-600" />
          <span><b class="text-highlighted">Щодня 6:00–22:00.</b> Без вихідних</span>
        </li>
        <li class="flex items-center gap-3">
          <UIcon name="i-lucide-handshake" class="size-5 shrink-0 text-signal-600" />
          <span><b class="text-highlighted">Понад {{ company.years }} років.</b> Нас радять знайомим</span>
        </li>
      </ul>
    </UContainer>
  </section>
</template>
