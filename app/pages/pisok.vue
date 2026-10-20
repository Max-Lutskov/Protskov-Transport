<script setup lang="ts">
import { company, messengers, materials, trucks, sandIds, sandInfo, sandFaq, photoCredits } from '~/data/site'

const { openFor } = useCalculator()
const fmt = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
const sands = sandIds.map(id => materials.find(m => m.id === id)!)
const minPrice = Math.min(...sands.map(s => s.priceFrom))
// «Пісок митий» → «Митий»: у вузькій таблиці на телефоні повна назва не влазить
const shortName = (name: string) => name.replace(/^Пісок\s+/, '').replace(/^./, c => c.toUpperCase())

// Скільки піску везе машина і скільки він коштує. КАМАЗ і Volvo однакові, тож одним рядком
const truckRows = [...new Set(trucks.map(t => t.capacity))].sort((a, b) => a - b).map(capacity => ({
  names: trucks.filter(t => t.capacity === capacity).map(t => t.name).join(' або '),
  capacity
}))

// Cloudflare віддає пререндерений pisok/index.html за адресою зі слешем у кінці
const url = `${company.url}/pisok/`
// Власне фото: КАМАЗ щойно вивантажив пісок. Оригінал лише 800 px
const heroSrc = '/images/fleet/kamaz.jpg'
const heroSrcset = srcset(heroSrc)
const heroSizes = '(min-width: 1024px) 55vw, calc(100vw - 2rem)'
const heroAlt = 'КАМАЗ Процков Буд вивантажив пісок біля будинку у Вінниці'

const title = `Купити пісок у Вінниці — від ${fmt(minPrice)} грн/т з доставкою | ${company.name}`
// До ~155 символів, щоб Google не обрізав телефон у кінці
const description = `Пісок митий ${fmt(sands[0]!.priceFrom)} грн/т і яружний ${fmt(sands[1]!.priceFrom)} грн/т. Доставка самоскидом 7–12 т по Вінниці та до 30 км, щодня 6:00–22:00. Тел. ${company.phoneDisplay}`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'uk_UA',
  ogUrl: url,
  ogImage: `${company.url}${heroSrc}`,
  ogImageWidth: 800,
  ogImageHeight: 600,
  ogImageAlt: heroAlt,
  twitterCard: 'summary_large_image'
})

// Як на головній: у кожного Product власні offers з ціною за тонну, інакше Search Console дає помилку
const shippingDetails = {
  '@type': 'OfferShippingDetails',
  shippingRate: { '@type': 'MonetaryAmount', value: company.deliveryFrom, currency: 'UAH' },
  shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'UA' }
}

useHead({
  link: [
    { rel: 'canonical', href: url },
    { rel: 'preload', as: 'image', imagesrcset: heroSrcset, imagesizes: heroSizes, fetchpriority: 'high', tagPriority: -10 }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          ...sands.map(s => ({
            '@type': 'Product',
            name: s.name,
            description: `${s.description} ${sandInfo[s.id]!.text}`,
            image: s.photo ? `${company.url}${s.photo}` : undefined,
            url,
            brand: { '@type': 'Brand', name: company.name },
            offers: {
              '@type': 'Offer',
              price: s.priceFrom,
              priceCurrency: 'UAH',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: s.priceFrom, priceCurrency: 'UAH', unitCode: 'TNE', unitText: 'т' },
              availability: 'https://schema.org/InStock',
              url,
              shippingDetails,
              seller: { '@type': 'HomeAndConstructionBusiness', '@id': `${company.url}/#business`, name: company.name }
            }
          })),
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Головна', item: company.url },
              { '@type': 'ListItem', position: 2, name: 'Пісок', item: url }
            ]
          },
          {
            '@type': 'FAQPage',
            mainEntity: sandFaq.map(q => ({
              '@type': 'Question',
              name: q.label,
              acceptedAnswer: { '@type': 'Answer', text: q.content }
            }))
          }
        ]
      })
    }
  ]
})

// Підписи лише до тих тимчасових фото, що є на цій сторінці
const credits = photoCredits.filter(c => c.what.startsWith('пісок'))

const breadcrumbs = [
  { label: 'Головна', to: '/' },
  { label: 'Пісок' }
]
</script>

<template>
  <div>
    <section class="border-b border-default">
      <UContainer class="pt-5 pb-10 md:pt-6 lg:pb-16">
        <UBreadcrumb :items="breadcrumbs" color="neutral" class="mb-6 md:mb-8" />

        <!-- Як на головній: на телефоні заголовок, фото, ціни й телефон; на десктопі фото праворуч -->
        <div class="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div class="lg:col-span-5 lg:self-end">
            <p class="flex items-center gap-2 text-sm text-muted">
              <UIcon name="i-lucide-map-pin" class="size-4 text-signal-600" />
              {{ company.area }}
            </p>
            <h1 class="font-display mt-4 text-[clamp(1.5rem,8vw,3.25rem)] leading-[1.08] font-medium text-highlighted text-balance lg:text-[clamp(1.9rem,2.75vw,2.5rem)]">
              Купити
              <span class="box-decoration-clone bg-[linear-gradient(transparent_58%,var(--color-signal-400)_58%,var(--color-signal-400)_90%,transparent_90%)]">пісок</span>
              у Вінниці
            </h1>
            <p class="mt-5 text-lg text-toned">
              Митий пісок для бетону й стяжки та яружний для засипки й підсипки. Привеземо самоскидом на 7 чи 12 тонн і вивантажимо там, де вам зручно.
            </p>
          </div>

          <figure class="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
            <img
              :src="heroSrc"
              :srcset="heroSrcset"
              :sizes="heroSizes"
              :alt="heroAlt"
              width="800"
              height="600"
              fetchpriority="high"
              class="aspect-[4/3] w-full rounded-lg object-cover"
            >
          </figure>

          <div class="lg:col-span-5 lg:self-start">
            <dl class="divide-y divide-default border-t border-default">
              <div v-for="s in sands" :key="s.id" class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">{{ s.name }}</dt>
                <dd class="text-xl font-semibold text-highlighted tabular-nums">{{ fmt(s.priceFrom) }} грн/т</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Доставка по Вінниці</dt>
                <dd class="font-semibold text-highlighted tabular-nums">від {{ fmt(company.deliveryFrom) }} грн</dd>
              </div>
            </dl>

            <a
              :href="`tel:${company.phone}`"
              class="font-display mt-8 inline-block whitespace-nowrap text-[clamp(1.75rem,9.5vw,3rem)] leading-none font-extrabold tracking-tight text-highlighted underline decoration-signal-500 decoration-[0.12em] underline-offset-[0.18em] hover:decoration-signal-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-600 lg:text-[clamp(2rem,2.9vw,2.6rem)]"
            >
              {{ company.phoneDisplay }}
            </a>
            <p class="mt-3 text-toned">{{ company.owner }}, {{ company.hours }}</p>

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
          </div>
        </div>
      </UContainer>
    </section>

    <section class="py-12 md:py-20">
      <UContainer>
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Митий чи яружний: що вибрати</h2>
        <div class="mt-10 grid gap-10 md:grid-cols-2 lg:gap-16">
          <article v-for="s in sands" :key="s.id" class="flex flex-col">
            <figure v-if="s.photo" class="relative">
              <img
                :src="s.photo"
                :srcset="srcset(s.photo)"
                sizes="(min-width: 768px) 45vw, calc(100vw - 2rem)"
                :alt="`${s.name}, фото для прикладу`"
                width="640"
                height="480"
                loading="lazy"
                class="aspect-[16/9] w-full rounded-md object-cover"
              >
              <figcaption class="absolute bottom-2 left-2 rounded bg-granite-950/80 px-2 py-0.5 text-xs text-granite-200">Фото для прикладу</figcaption>
            </figure>
            <div class="mt-5 flex items-baseline justify-between gap-4">
              <h3 class="text-2xl font-semibold text-highlighted">{{ s.name }}</h3>
              <p class="whitespace-nowrap text-highlighted"><b class="text-xl font-semibold tabular-nums">{{ fmt(s.priceFrom) }}</b> грн/т</p>
            </div>
            <p class="mt-3 text-toned">{{ sandInfo[s.id]!.text }}</p>
            <ul class="mt-4 flex-1 space-y-2">
              <li v-for="u in sandInfo[s.id]!.uses" :key="u" class="flex gap-3">
                <UIcon name="i-lucide-check" class="mt-0.5 size-5 shrink-0 text-signal-600" />
                <span>{{ u }}</span>
              </li>
            </ul>
            <div class="mt-6">
              <UButton label="Скільки мені треба?" icon="i-lucide-calculator" color="neutral" variant="outline" @click="openFor(s.id)" />
            </div>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-granite-900 py-12 text-granite-200 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-white md:text-3xl">Скільки коштує машина піску</h2>
          <p class="mt-4">
            Ціна піску за повну машину, без доставки. Доставка по Вінниці від {{ fmt(company.deliveryFrom) }} грн, за місто залежить від відстані.
          </p>
        </div>

        <div class="overflow-x-auto rounded-lg bg-granite-800 p-5 md:p-8">
          <table class="w-full text-left tabular-nums">
            <thead class="text-sm text-granite-400">
              <tr>
                <th scope="col" class="pb-3 font-normal">Машина</th>
                <th v-for="s in sands" :key="s.id" scope="col" class="pb-3 pl-4 text-right font-normal">{{ shortName(s.name) }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-granite-600">
              <tr v-for="r in truckRows" :key="r.capacity">
                <th scope="row" class="py-3 pr-2 font-normal">
                  <span class="block font-semibold text-white">{{ r.names }}</span>
                  <span class="text-sm text-granite-400">до {{ r.capacity }} т</span>
                </th>
                <td v-for="s in sands" :key="s.id" class="py-3 pl-4 text-right">
                  <span class="block font-semibold whitespace-nowrap text-white">{{ fmt(r.capacity * s.priceFrom) }} грн</span>
                  <span class="text-sm text-granite-400">≈ {{ formatNumber(r.capacity / s.density!) }} м³</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="mt-5 text-sm text-granite-400">
            Кубометри приблизні: кубометр митого піску важить близько {{ formatNumber(sands[0]!.density!) }} т, яружного близько {{ formatNumber(sands[1]!.density!) }} т.
          </p>
        </div>
      </UContainer>
    </section>

    <section class="py-12 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Привеземо й розрівняємо</h2>
          <p class="mt-4 text-toned">
            Окрім піску, маємо власну техніку з водієм. Не треба шукати окремо, хто розрівняє купу чи засипле траншею.
          </p>
        </div>
        <ul class="space-y-6">
          <li class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-signal-600" />
            <p class="text-toned">
              <NuxtLink to="/bobkat/" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">Бобкет</NuxtLink>
              розрівняє пісок на ділянці одразу після вивантаження.
            </p>
          </li>
          <li class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-signal-600" />
            <p class="text-toned">
              <NuxtLink to="/miniekskavator/" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">Мініекскаватор</NuxtLink>
              викопає траншею під комунікації, а потім засипле її піском.
            </p>
          </li>
          <li class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-signal-600" />
            <p class="text-toned">
              <NuxtLink to="/ekskavator/" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">Екскаватор JCB</NuxtLink>
              викопає котлован, а під фундамент привеземо яружний пісок для підсипки.
            </p>
          </li>
        </ul>
      </UContainer>
    </section>

    <LazyFaqSection hydrate-on-visible :items="sandFaq" />
    <LazyContactsSection hydrate-on-visible />

    <UContainer class="pb-8">
      <p class="text-xs text-dimmed">
        Фото піску ілюстративні.
        <template v-if="credits.length">
          Автори:
          <template v-for="(c, i) in credits" :key="c.url">
            <a :href="c.url" target="_blank" rel="noopener" class="underline underline-offset-2 hover:text-toned">{{ c.author }}</a>
            ({{ c.what }}, {{ c.license }}){{ i < credits.length - 1 ? ', ' : '.' }}
          </template>
        </template>
      </p>
    </UContainer>
  </div>
</template>
