<script setup lang="ts">
import { materials, company, photoCredits } from '~/data/site'

const { openFor } = useCalculator()
const price = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
</script>

<template>
  <section id="materialy" class="border-t border-default py-12 md:py-20">
    <UContainer>
      <div class="max-w-2xl">
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Матеріали з доставкою</h2>
        <p class="mt-3 text-toned">
          Возимо насипом, вивантажуємо там, де вам зручно. Ціна залежить від об'єму й відстані, тому точну суму називаємо по телефону.
        </p>
      </div>

      <ul class="mt-10 divide-y divide-default border-t border-default">
        <li
          v-for="m in materials"
          :key="m.id"
          class="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-4 py-6 md:grid-cols-[10rem_1fr_auto] md:items-center md:gap-x-8"
        >
          <img
            v-if="m.photo"
            :src="m.photo"
            :srcset="srcset(m.photo)"
            sizes="(min-width: 768px) 10rem, 5.5rem"
            :alt="m.name"
            width="640"
            height="480"
            loading="lazy"
            class="aspect-[4/3] w-full rounded-md object-cover"
          >

          <div :class="{ 'col-span-2 md:col-span-2': !m.photo }">
            <h3 class="text-xl font-semibold text-highlighted">{{ m.name }}</h3>
            <p class="mt-1 text-toned">{{ m.description }}</p>

            <ul v-if="m.fractionPhotos" class="mt-4 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              <li v-for="f in m.fractions" :key="f" class="flex flex-col items-start gap-2">
                <img
                  :src="m.fractionPhotos[f]"
                  :srcset="srcset(m.fractionPhotos[f]!)"
                  sizes="(min-width: 640px) 9rem, 45vw"
                  :alt="`${m.name}, фракція ${f} мм`"
                  width="640"
                  height="480"
                  loading="lazy"
                  class="aspect-[4/3] w-full rounded-md object-cover"
                >
                <p class="text-sm whitespace-nowrap tabular-nums">
                  <span class="font-semibold text-highlighted">{{ f }} мм</span>
                  <span v-if="m.fractionPrices?.[f]" class="block text-toned">{{ price(m.fractionPrices[f]) }} грн/{{ m.unit }}</span>
                </p>
              </li>
            </ul>
          </div>

          <div class="col-span-2 flex items-center justify-between gap-4 md:col-span-1 md:flex-col md:items-end md:gap-2">
            <p class="text-highlighted">
              <template v-if="m.fractionPrices">від </template><b class="text-xl font-semibold tabular-nums">{{ price(m.priceFrom) }}</b> грн/{{ m.unit }}
            </p>
            <UButton
              v-if="m.density"
              label="Скільки мені треба?"
              icon="i-lucide-calculator"
              color="neutral"
              variant="outline"
              @click="openFor(m.id)"
            />
            <UButton
              v-else
              :to="`tel:${company.phone}`"
              label="Уточнити по телефону"
              icon="i-lucide-phone"
              color="neutral"
              variant="outline"
            />
          </div>
        </li>
      </ul>
      <p class="mt-4 text-sm text-muted">
        Ціни за тонну, без доставки. Доставка самоскидом по Вінниці від {{ price(company.deliveryFrom) }} грн, за місто залежить від відстані.
      </p>
      <p class="mt-2 text-xs text-dimmed">
        Фото матеріалів ілюстративні. Автори:
        <template v-for="(c, i) in photoCredits" :key="c.url">
          <a :href="c.url" target="_blank" rel="noopener" class="underline underline-offset-2 hover:text-toned">{{ c.author }}</a>
          ({{ c.what }}, {{ c.license }}){{ i < photoCredits.length - 1 ? ', ' : '.' }}
        </template>
      </p>
    </UContainer>
  </section>
</template>
