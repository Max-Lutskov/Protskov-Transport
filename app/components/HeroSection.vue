<script setup lang="ts">
import { company, messengers, machinery } from '~/data/site'

const { openFor } = useCalculator()
const fmt = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
const minRate = fmt(Math.min(...machinery.map(m => m.pricePerHour)))
const jcb = machinery.find(m => m.id === 'ekskavator')!
const mini = machinery.find(m => m.id === 'miniekskavator')!

// Головне фото — найбільший елемент першого екрана, тож вантажимо його одразу, ще до розбору CSS
// На телефоні фото на всю ширину мінус поля контейнера (по 1 rem з боків)
const heroSrcset = srcset('/images/hero-jcb.jpg', [480, 720, 960, 1200])
const heroSizes = '(min-width: 1024px) 55vw, calc(100vw - 2rem)'
useHead({
  link: [{ rel: 'preload', as: 'image', imagesrcset: heroSrcset, imagesizes: heroSizes, fetchpriority: 'high' }]
})
</script>

<template>
  <section class="border-b border-default">
    <!-- Ліва колонка: заголовок і телефон, права — фото техніки на всю висоту.
         На телефоні порядок природний: заголовок, фото, телефон. -->
    <UContainer class="grid gap-x-12 gap-y-8 pt-8 pb-10 md:pt-12 lg:grid-cols-12 lg:pb-16">
      <div class="lg:col-span-5 lg:self-end">
        <p class="flex items-center gap-2 text-sm text-muted">
          <UIcon name="i-lucide-map-pin" class="size-4 text-signal-600" />
          {{ company.area }}
        </p>
        <h1 class="font-display mt-4 text-[clamp(2rem,7vw,3.25rem)] leading-[1.08] font-medium text-highlighted text-balance lg:text-[clamp(2.1rem,3.6vw,3.25rem)]">
          Оренда спецтехніки та
          <span class="box-decoration-clone bg-[linear-gradient(transparent_58%,var(--color-signal-400)_58%,var(--color-signal-400)_90%,transparent_90%)]">мінітехніки</span>
          у Вінниці
        </h1>
        <p class="mt-5 text-lg text-toned">
          Екскаватор JCB, мініекскаватор Kubota, бобкет і гідромолот з водієм від {{ minRate }} грн/год.
          Самоскиди привезуть щебінь і пісок або вивезуть ґрунт.
        </p>
      </div>

      <div class="relative pb-12 sm:pb-16 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:self-center lg:pb-0">
        <figure class="relative">
          <img
            src="/images/hero-jcb.jpg"
            :srcset="heroSrcset"
            :sizes="heroSizes"
            alt="Екскаватор JCB Процков Буд розсипає щебінь біля приватного будинку"
            width="1200"
            height="900"
            fetchpriority="high"
            class="aspect-[4/3] w-full rounded-lg object-cover"
          >
          <figcaption class="absolute top-3 left-3 rounded-md bg-granite-950/85 px-3 py-2 leading-tight text-white">
            <b class="block font-semibold">Екскаватор {{ jcb.spec }}</b>
            <span class="text-sm text-signal-300 tabular-nums">{{ fmt(jcb.pricePerHour) }} грн/год</span>
          </figcaption>
        </figure>

        <figure class="absolute right-4 bottom-0 w-[44%] rounded-lg bg-default p-1 shadow-xl sm:right-6 sm:w-[38%] lg:right-auto lg:-bottom-8 lg:-left-6 lg:w-[30%]">
          <img
            src="/images/hero-kubota.jpg"
            :srcset="srcset('/images/hero-kubota.jpg', [300, 600])"
            sizes="(min-width: 1024px) 18vw, 44vw"
            fetchpriority="low"
            alt="Мініекскаватор Kubota Процков Буд на демонтажі у дворі"
            width="600"
            height="600"
            class="aspect-square w-full rounded-md object-cover"
          >
          <figcaption class="absolute top-3 left-3 rounded-md bg-granite-950/85 px-2.5 py-1.5 leading-tight text-white">
            <b class="block text-sm font-semibold">Мініекскаватор</b>
            <span class="text-sm text-signal-300 tabular-nums">{{ fmt(mini.pricePerHour) }} грн/год</span>
          </figcaption>
        </figure>
      </div>

      <div class="lg:col-span-5 lg:self-start">
        <a
          :href="`tel:${company.phone}`"
          class="font-display inline-block whitespace-nowrap text-[clamp(2.4rem,9vw,3.6rem)] leading-none font-extrabold tracking-tight text-highlighted underline decoration-signal-500 decoration-[0.12em] underline-offset-[0.18em] hover:decoration-signal-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-600 lg:text-[clamp(2rem,2.9vw,2.75rem)]"
        >
          {{ company.phoneDisplay }}
        </a>
        <p class="mt-4 text-toned">
          Телефон власника, {{ company.owner }}. Дзвоніть {{ company.hours }}.
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-2">
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
          class="mt-5 inline-flex items-center gap-2 text-left text-sm text-muted underline underline-offset-4 hover:text-highlighted"
          @click="openFor()"
        >
          <UIcon name="i-lucide-calculator" class="size-4" />
          Скільки тонн щебеню чи піску потрібно?
        </button>
      </div>
    </UContainer>

    <UContainer class="border-t border-default">
      <ul class="grid gap-x-8 gap-y-3 py-6 text-sm sm:grid-cols-3">
        <li class="flex items-center gap-3">
          <UIcon name="i-lucide-user-round-check" class="size-5 shrink-0 text-signal-600" />
          <span><b class="text-highlighted">З водієм.</b> Оператора шукати не треба</span>
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
