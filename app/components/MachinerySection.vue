<script setup lang="ts">
import { machinery, company, techPhotoCredits } from '~/data/site'

const price = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
</script>

<template>
  <section id="tekhnika" class="bg-granite-900 py-12 text-granite-200 md:py-20">
    <UContainer>
      <div class="max-w-2xl">
        <h2 class="font-display text-2xl font-medium text-white md:text-3xl">Послуги спецтехніки</h2>
        <p class="mt-3">
          Уся техніка працює з нашим водієм, тож шукати оператора окремо не потрібно. Можна замовити разом із матеріалом: привеземо щебінь і одразу розрівняємо.
        </p>
      </div>

      <div class="mt-10 grid gap-px overflow-hidden rounded-lg bg-granite-700 md:grid-cols-2 lg:grid-cols-4">
        <article v-for="m in machinery" :key="m.id" class="flex flex-col bg-granite-900 p-6 md:p-8">
          <figure v-if="m.photo" class="relative mb-5">
            <img
              :src="m.photo"
              :srcset="srcset(m.photo)"
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 92vw"
              :alt="m.photoAlt ?? (m.stockPhoto ? `${m.name}, фото для прикладу` : `${m.name}${m.spec ? ` ${m.spec}` : ''} Процков Буд на об'єкті`)"
              width="800"
              height="600"
              loading="lazy"
              class="aspect-[4/3] w-full rounded-md object-cover"
            >
            <figcaption v-if="m.stockPhoto" class="absolute bottom-2 left-2 rounded bg-granite-950/80 px-2 py-0.5 text-xs text-granite-200">Фото для прикладу</figcaption>
          </figure>
          <h3 class="text-2xl font-semibold text-white">
            <!-- Назва веде на окрему сторінку послуги, якщо вона є; так ціни в картках лишаються на одній висоті -->
            <NuxtLink v-if="m.page" :to="m.page.to" :title="m.page.label" class="underline decoration-signal-400 decoration-2 underline-offset-[0.2em] hover:text-signal-300">{{ m.name }}</NuxtLink>
            <template v-else>{{ m.name }}</template>
          </h3>
          <!-- Рядок моделі є в усіх картках, навіть порожній, щоб списки робіт починались на одній висоті -->
          <p class="mt-1 h-6 text-granite-400">{{ m.spec }}</p>
          <ul class="mt-4 flex-1 space-y-2.5">
            <li v-for="job in m.jobs" :key="job" class="flex gap-3">
              <UIcon name="i-lucide-check" class="mt-0.5 size-5 shrink-0 text-signal-400" />
              <span>{{ job }}</span>
            </li>
          </ul>
          <div class="mt-6 text-granite-300">
            <p><b class="text-xl font-semibold text-white tabular-nums">{{ price(m.pricePerHour) }}</b> грн/год</p>
            <p class="mt-1 text-sm">від {{ m.minHours }} годин, доставка {{ price(m.deliveryPrice) }} грн</p>
          </div>
        </article>
      </div>

      <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <UButton :to="`tel:${company.phone}`" icon="i-lucide-phone" label="Замовити техніку" size="xl" />
        <p class="text-sm text-granite-400">Ціна за годину роботи з водієм. Доставка техніки на об'єкт оплачується окремо.</p>
      </div>
      <p class="mt-6 text-xs text-granite-400">
        Фото для прикладу:
        <template v-for="(c, i) in techPhotoCredits" :key="c.url">
          <a :href="c.url" target="_blank" rel="noopener" class="underline underline-offset-2 hover:text-granite-300">{{ c.author }}</a>
          ({{ c.what }}, {{ c.license }}){{ i < techPhotoCredits.length - 1 ? ', ' : '.' }}
        </template>
      </p>
    </UContainer>
  </section>
</template>
