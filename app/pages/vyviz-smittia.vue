<script setup lang="ts">
import { company, messengers, machinery, trucks, wastePriceFrom, wasteKinds, wastePhotos, wasteFaq } from '~/data/site'

const fmt = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
// Техніка, якою вантажимо сміття (гідромолот не вантажить)
const loaders = machinery.filter(m => m.id !== 'gidromolot')
const loaderRate = Math.min(...loaders.map(m => m.pricePerHour))
const loaderMinHours = Math.min(...loaders.map(m => m.minHours))
const loaderDelivery = loaders[0]!.deliveryPrice
// Viber і Telegram — щоб надіслати фото сміття
const photoMessengers = messengers.filter(m => m.name !== 'WhatsApp')

// Cloudflare віддає пререндерений vyviz-smittia/index.html за адресою зі слешем у кінці
const url = `${company.url}/vyviz-smittia/`
// Власне фото: Volvo під завантаженням на розборі будинку. Оригінал лише 800 px
const heroSrc = '/images/mini/rozbir.jpg'
const heroSrcset = srcset(heroSrc)
const heroSizes = '(min-width: 1024px) 55vw, calc(100vw - 2rem)'
const heroAlt = 'Самоскид Volvo Процков Буд під завантаженням сміття на розборі старого будинку у Вінниці'

const title = `Вивіз сміття у Вінниці — від ${fmt(wastePriceFrom)} грн за машину | ${company.name}`
// До ~155 символів, щоб Google не обрізав телефон у кінці
const description = `Вивіз будівельного сміття, ґрунту, гілок і старих меблів самоскидом 7–12 т. Від ${fmt(wastePriceFrom)} грн за машину, Вінниця +30 км. Тел. ${company.phoneDisplay}`

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
            '@type': 'Service',
            '@id': `${url}#service`,
            name: 'Вивіз сміття самоскидом',
            serviceType: 'Вивіз сміття',
            description,
            url,
            image: `${company.url}${heroSrc}`,
            // Повний опис компанії — на головній, тут посилання на нього
            provider: { '@type': 'HomeAndConstructionBusiness', '@id': `${company.url}/#business`, name: company.name, telephone: company.phone, url: company.url },
            areaServed: { '@type': 'City', name: company.city },
            offers: {
              '@type': 'Offer',
              price: wastePriceFrom,
              priceCurrency: 'UAH',
              // «Від 3 000 грн за машину»: ціна залежить від відстані
              priceSpecification: { '@type': 'PriceSpecification', minPrice: wastePriceFrom, priceCurrency: 'UAH' }
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Головна', item: company.url },
              { '@type': 'ListItem', position: 2, name: 'Вивіз сміття', item: url }
            ]
          },
          {
            '@type': 'FAQPage',
            mainEntity: wasteFaq.map(q => ({
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
  { label: 'Вивіз сміття' }
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
              Вивіз
              <span class="box-decoration-clone bg-[linear-gradient(transparent_58%,var(--color-signal-400)_58%,var(--color-signal-400)_90%,transparent_90%)]">сміття</span>
              у Вінниці
            </h1>
            <p class="mt-5 text-lg text-toned">
              Вивеземо будівельне сміття, ґрунт, гілки й старі меблі самоскидом на 7 чи 12 тонн. Завантажите самі або нашою технікою.
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
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Машина по Вінниці</dt>
                <dd class="text-xl font-semibold text-highlighted tabular-nums">від {{ fmt(wastePriceFrom) }} грн</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">За місто</dt>
                <dd class="font-semibold text-highlighted">за відстанню</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Завантаження технікою</dt>
                <dd class="font-semibold text-highlighted tabular-nums">від {{ fmt(loaderRate) }} грн/год</dd>
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
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Що вивозимо</h2>
        <ul class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="k in wasteKinds" :key="k.title" class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-signal-600" />
            <div>
              <h3 class="text-lg font-semibold text-highlighted">{{ k.title }}</h3>
              <p class="mt-1 text-toned">{{ k.text }}</p>
            </div>
          </li>
        </ul>
      </UContainer>
    </section>

    <section class="border-t border-default py-12 md:py-20">
      <UContainer>
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Хто завантажить сміття</h2>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <article class="rounded-lg border border-default p-6 md:p-8">
            <h3 class="text-xl font-semibold text-highlighted">Нашою технікою</h3>
            <p class="mt-3 text-toned">
              Бобкет, мініекскаватор чи екскаватор з водієм завантажать сміття й ґрунт швидко й без ручної праці.
              Техніка оплачується погодинно: від {{ fmt(loaderRate) }} грн за годину, мінімум {{ loaderMinHours }} години, доставка техніки {{ fmt(loaderDelivery) }} грн.
            </p>
            <ul class="mt-5 divide-y divide-default border-y border-default">
              <li v-for="m in loaders" :key="m.id" class="flex items-baseline justify-between gap-4 py-2.5">
                <NuxtLink v-if="m.page" :to="m.page.to" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">{{ m.name }}</NuxtLink>
                <span v-else class="font-semibold text-highlighted">{{ m.name }}</span>
                <span class="whitespace-nowrap text-toned tabular-nums">{{ fmt(m.pricePerHour) }} грн/год</span>
              </li>
            </ul>
          </article>
          <article class="rounded-lg border border-default p-6 md:p-8">
            <h3 class="text-xl font-semibold text-highlighted">Самостійно</h3>
            <p class="mt-3 text-toned">
              Подамо самоскид, ви завантажите його самі, а ми вивеземо. Тоді платите лише за машину: від {{ fmt(wastePriceFrom) }} грн по Вінниці.
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-granite-900 py-12 text-granite-200 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-white md:text-3xl">Яка машина потрібна</h2>
          <p class="mt-4">
            Надішліть фото сміття у Viber чи Telegram, і Олександр скаже, яка машина потрібна і скільки рейсів.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <UButton
              v-for="m in photoMessengers"
              :key="m.name"
              :to="m.href"
              :icon="m.icon"
              :label="`Фото у ${m.name}`"
              size="lg"
              target="_blank"
              rel="noopener"
            />
          </div>
        </div>

        <div class="self-start rounded-lg bg-granite-800 p-5 md:p-8">
          <ul class="divide-y divide-granite-600">
            <li v-for="t in trucks" :key="t.name" class="flex items-baseline justify-between gap-4 py-3">
              <span class="font-semibold text-white">{{ t.name }}</span>
              <span class="text-right">до {{ t.capacity }} т<span v-if="t.capacity < 10" class="block text-sm text-granite-400">заїде у вузький двір</span></span>
            </li>
          </ul>
        </div>
      </UContainer>
    </section>

    <section class="py-12 md:py-20">
      <UContainer>
        <div class="max-w-2xl">
          <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Вивозимо сміття й ґрунт</h2>
          <p class="mt-3 text-toned">Фото з наших замовлень у Вінниці й навколо.</p>
        </div>
        <ul class="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-3">
          <li v-for="p in wastePhotos" :key="p.src">
            <figure>
              <img
                :src="p.src"
                :srcset="srcset(p.src)"
                sizes="(min-width: 1024px) 30vw, 46vw"
                :alt="p.alt"
                width="800"
                height="600"
                loading="lazy"
                class="aspect-[4/3] w-full rounded-md object-cover"
              >
              <figcaption class="mt-2 text-sm text-toned">{{ p.title }}</figcaption>
            </figure>
          </li>
        </ul>
      </UContainer>
    </section>

    <LazyFaqSection hydrate-on-visible :items="wasteFaq" />
    <LazyContactsSection hydrate-on-visible service="Вивіз сміття" />
  </div>
</template>
