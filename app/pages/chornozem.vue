<script setup lang="ts">
import { company, messengers, materials, trucks, soilUses, soilLayers, soilFaq } from '~/data/site'

const { openFor } = useCalculator()
const fmt = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
const soil = materials.find(m => m.id === 'chornozem')!

// Скільки чорнозему везе машина і скільки він коштує. КАМАЗ і Volvo однакові, тож одним рядком
const truckRows = [...new Set(trucks.map(t => t.capacity))].sort((a, b) => a - b).map(capacity => ({
  names: trucks.filter(t => t.capacity === capacity).map(t => t.name).join(' або '),
  capacity
}))

// Приклад розрахунку: газон 100 м² шаром 10 см
const example = { area: 100, cm: 10 }
const exampleM3 = example.area * example.cm / 100
const exampleT = exampleM3 * soil.density!

// Cloudflare віддає пререндерений chornozem/index.html за адресою зі слешем у кінці
const url = `${company.url}/chornozem/`
// Власне фото: чорнозем у кузові нашого КАМАЗа. Оригінал лише 640 px
const heroSrc = soil.photo!
const heroSrcset = srcset(heroSrc)
const heroSizes = '(min-width: 1024px) 55vw, calc(100vw - 2rem)'
const heroAlt = 'Родючий чорнозем у кузові самоскида Процков Буд'

const title = `Купити чорнозем у Вінниці — ${fmt(soil.priceFrom)} грн/т з доставкою | ${company.name}`
// До ~155 символів, щоб Google не обрізав телефон у кінці
const description = `Родючий чорнозем для газону, клумб і городу, ${fmt(soil.priceFrom)} грн/т. Доставка самоскидом 7–12 т по Вінниці та до 30 км, щодня 6:00–22:00. Тел. ${company.phoneDisplay}`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'uk_UA',
  ogUrl: url,
  ogImage: `${company.url}${heroSrc}`,
  ogImageWidth: 640,
  ogImageHeight: 480,
  ogImageAlt: heroAlt,
  twitterCard: 'summary_large_image'
})

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
          {
            // Як на головній: у Product власні offers з ціною за тонну, інакше Search Console дає помилку
            '@type': 'Product',
            name: soil.name,
            description: `${soil.description} Доставка самоскидом по Вінниці та до 30 км.`,
            image: `${company.url}${heroSrc}`,
            url,
            brand: { '@type': 'Brand', name: company.name },
            offers: {
              '@type': 'Offer',
              price: soil.priceFrom,
              priceCurrency: 'UAH',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: soil.priceFrom, priceCurrency: 'UAH', unitCode: 'TNE', unitText: 'т' },
              availability: 'https://schema.org/InStock',
              url,
              shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: { '@type': 'MonetaryAmount', value: company.deliveryFrom, currency: 'UAH' },
                shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'UA' }
              },
              seller: { '@type': 'HomeAndConstructionBusiness', '@id': `${company.url}/#business`, name: company.name }
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Головна', item: company.url },
              { '@type': 'ListItem', position: 2, name: 'Чорнозем', item: url }
            ]
          },
          {
            '@type': 'FAQPage',
            mainEntity: soilFaq.map(q => ({
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

const breadcrumbs = [
  { label: 'Головна', to: '/' },
  { label: 'Чорнозем' }
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
              <span class="box-decoration-clone bg-[linear-gradient(transparent_58%,var(--color-signal-400)_58%,var(--color-signal-400)_90%,transparent_90%)]">чорнозем</span>
              у Вінниці
            </h1>
            <p class="mt-5 text-lg text-toned">
              Родючий чорнозем для газону, клумб і городу. Привеземо самоскидом на 7 чи 12 тонн і вивантажимо там, де вам зручно.
            </p>
          </div>

          <figure class="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
            <img
              :src="heroSrc"
              :srcset="heroSrcset"
              :sizes="heroSizes"
              :alt="heroAlt"
              width="640"
              height="480"
              fetchpriority="high"
              class="aspect-[4/3] w-full rounded-lg object-cover"
            >
          </figure>

          <div class="lg:col-span-5 lg:self-start">
            <dl class="divide-y divide-default border-t border-default">
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">{{ soil.name }}</dt>
                <dd class="text-xl font-semibold text-highlighted tabular-nums">{{ fmt(soil.priceFrom) }} грн/т</dd>
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
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Для чого беруть чорнозем</h2>
        <ul class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="u in soilUses" :key="u.title" class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-signal-600" />
            <div>
              <h3 class="text-lg font-semibold text-highlighted">{{ u.title }}</h3>
              <p class="mt-1 text-toned">{{ u.text }}</p>
            </div>
          </li>
        </ul>
      </UContainer>
    </section>

    <section class="border-t border-default py-12 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Скільки чорнозему потрібно</h2>
          <p class="mt-4 text-toned">
            Помножте площу на товщину шару: так вийдуть кубометри. Кубометр чорнозему важить близько {{ formatNumber(soil.density!) }} т.
          </p>
          <dl class="mt-6 divide-y divide-default border-y border-default">
            <div v-for="l in soilLayers" :key="l.title" class="flex items-baseline justify-between gap-4 py-3">
              <dt class="text-toned">{{ l.title }}</dt>
              <dd class="font-semibold text-highlighted">шар {{ l.cm }} см</dd>
            </div>
          </dl>
        </div>

        <div class="rounded-lg border border-default bg-white p-6 md:p-8">
          <p class="font-semibold text-highlighted">Приклад: газон {{ example.area }} м²</p>
          <p class="mt-3 text-toned tabular-nums">
            {{ example.area }} м² × {{ example.cm }} см = {{ formatNumber(exampleM3) }} м³ ≈ {{ formatNumber(exampleT) }} т.
            Це одна машина КАМАЗ чи Volvo.
          </p>
          <UButton class="mt-6" label="Порахувати для своєї ділянки" icon="i-lucide-calculator" @click="openFor(soil.id)" />
        </div>
      </UContainer>
    </section>

    <section class="bg-granite-900 py-12 text-granite-200 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-white md:text-3xl">Скільки коштує машина чорнозему</h2>
          <p class="mt-4">
            Ціна чорнозему за повну машину, без доставки. Доставка по Вінниці від {{ fmt(company.deliveryFrom) }} грн, за місто залежить від відстані.
          </p>
        </div>

        <div class="self-start rounded-lg bg-granite-800 p-5 md:p-8">
          <ul class="divide-y divide-granite-600 tabular-nums">
            <li v-for="r in truckRows" :key="r.capacity" class="flex items-baseline justify-between gap-4 py-3">
              <span>
                <span class="block font-semibold text-white">{{ r.names }}</span>
                <span class="text-sm text-granite-400">до {{ r.capacity }} т, ≈ {{ formatNumber(r.capacity / soil.density!) }} м³</span>
              </span>
              <span class="font-semibold whitespace-nowrap text-white">{{ fmt(r.capacity * soil.priceFrom) }} грн</span>
            </li>
          </ul>
        </div>
      </UContainer>
    </section>

    <section class="py-12 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Привеземо й розрівняємо</h2>
          <p class="mt-4 text-toned">
            Окрім чорнозему, маємо власну техніку з водієм. Не треба шукати окремо, хто розрівняє ґрунт чи прибере сміття після будівництва.
          </p>
        </div>
        <ul class="space-y-6">
          <li class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-signal-600" />
            <p class="text-toned">
              <NuxtLink to="/bobkat/" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">Бобкет</NuxtLink>
              розрівняє чорнозем по ділянці одразу після вивантаження.
            </p>
          </li>
          <li class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-signal-600" />
            <p class="text-toned">
              Після будівництва спершу
              <NuxtLink to="/vyviz-smittia/" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">вивеземо сміття</NuxtLink>,
              а потім привеземо чорнозем.
            </p>
          </li>
        </ul>
      </UContainer>
    </section>

    <LazyFaqSection hydrate-on-visible :items="soilFaq" />
    <LazyContactsSection hydrate-on-visible :service="soil.name" />
  </div>
</template>
