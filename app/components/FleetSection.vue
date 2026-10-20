<script setup lang="ts">
import { fleetPhotos, fleetPhotoCredits } from '~/data/site'
</script>

<template>
  <section id="avtopark" class="border-t border-default py-12 md:py-20">
    <UContainer>
      <div class="max-w-2xl">
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Власний автопарк</h2>
        <p class="mt-3 text-toned">
          ЗІЛ на 7 т заїде у вузький двір, КАМАЗ і Volvo на 12 т везуть великі об'єми.
          Під кожне замовлення беремо машину, яка привезе все за один рейс. Ці ж самоскиди
          <NuxtLink to="/vyviz-smittia/" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">вивозять сміття й ґрунт</NuxtLink>.
        </p>
      </div>

      <div class="mt-10 grid gap-8 lg:flex lg:items-start lg:gap-10">
        <!-- Ваги колонок = сумарна довжина машин, а основа 48px = два внутрішні проміжки по 24px,
             тож масштаб в обох рядах однаковий і лінія землі на одному рівні -->
        <MachineLineup class="lg:flex-[137_1_48px]" />
        <TruckLineup class="lg:flex-[220_1_48px]" />
      </div>

      <ul class="mt-10 grid gap-4 sm:grid-cols-3">
        <li v-for="p in fleetPhotos" :key="p.src">
          <figure class="relative">
            <img :src="p.src" :srcset="srcset(p.src)" sizes="(min-width: 640px) 31vw, 92vw" :alt="p.stockPhoto ? `Самоскид ${p.title}, фото для прикладу` : `Самоскид ${p.title}`" width="800" height="600" loading="lazy" class="aspect-[4/3] w-full rounded-md object-cover">
            <span v-if="p.stockPhoto" class="absolute top-2 left-2 rounded bg-granite-950/80 px-2 py-0.5 text-xs text-granite-200">Фото для прикладу</span>
            <figcaption class="mt-2 text-sm font-semibold text-highlighted">{{ p.title }}</figcaption>
          </figure>
        </li>
      </ul>
      <p class="mt-4 text-xs text-dimmed">
        Фото для прикладу:
        <template v-for="(c, i) in fleetPhotoCredits" :key="c.url">
          <a :href="c.url" target="_blank" rel="noopener" class="underline underline-offset-2 hover:text-toned">{{ c.author }}</a>
          ({{ c.what }}, {{ c.license }}){{ i < fleetPhotoCredits.length - 1 ? ', ' : '.' }}
        </template>
      </p>
    </UContainer>
  </section>
</template>
