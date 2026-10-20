<script setup lang="ts">
import { company, messengers, machinery, miniModel, miniSpecs, miniPhotos, miniJobs, miniFaq } from '~/data/site'

const mini = machinery.find(m => m.id === 'miniekskavator')!
const fmt = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
const minTotal = mini.pricePerHour * mini.minHours + mini.deliveryPrice

// Cloudflare віддає пререндерений miniekskavator/index.html за адресою зі слешем у кінці
const url = `${company.url}/miniekskavator/`
const heroSrc = '/images/mini/hero.jpg'
const heroSrcset = srcset(heroSrc, [480, 720, 1120])
const heroSizes = '(min-width: 1024px) 55vw, calc(100vw - 2rem)'

const title = `Оренда мініекскаватора у Вінниці — ${fmt(mini.pricePerHour)} грн/год | ${company.name}`
// До ~155 символів, щоб Google не обрізав телефон у кінці
const description = `Міні-екскаватори ${miniModel} з водієм: траншеї, ями під септик, демонтаж у тісних дворах. ${fmt(mini.pricePerHour)} грн/год. Вінниця +30 км. Тел. ${company.phoneDisplay}`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'uk_UA',
  ogUrl: url,
  ogImage: `${company.url}${heroSrc}`,
  ogImageWidth: 1120,
  ogImageHeight: 840,
  ogImageAlt: 'Мініекскаватор Kubota копає у дворі приватного будинку у Вінниці',
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
            name: 'Оренда мініекскаватора з водієм',
            serviceType: 'Оренда мініекскаватора',
            description,
            url,
            image: `${company.url}${heroSrc}`,
            // Повний опис компанії — на головній, тут посилання на нього
            provider: { '@type': 'HomeAndConstructionBusiness', '@id': `${company.url}/#business`, name: company.name, telephone: company.phone, url: company.url },
            areaServed: { '@type': 'City', name: company.city },
            offers: {
              '@type': 'Offer',
              price: mini.pricePerHour,
              priceCurrency: 'UAH',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: mini.pricePerHour, priceCurrency: 'UAH', unitCode: 'HUR', unitText: 'год' }
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Головна', item: company.url },
              { '@type': 'ListItem', position: 2, name: 'Оренда мініекскаватора', item: url }
            ]
          },
          {
            '@type': 'FAQPage',
            mainEntity: miniFaq.map(q => ({
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
  { label: 'Оренда мініекскаватора' }
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
            <!-- «мініекскаватора» — довге слово без переносу, тож розмір підібрано так, щоб воно влазило в колонку -->
            <h1 class="font-display mt-4 text-[clamp(1.5rem,8vw,3.25rem)] leading-[1.08] font-medium text-highlighted text-balance lg:text-[clamp(1.9rem,2.75vw,2.5rem)]">
              Оренда
              <span class="box-decoration-clone bg-[linear-gradient(transparent_58%,var(--color-signal-400)_58%,var(--color-signal-400)_90%,transparent_90%)]">мініекскаватора</span>
              у Вінниці
            </h1>
            <p class="mt-5 text-lg text-toned">
              Міні-екскаватори {{ miniModel }} з нашим водієм. Копаємо траншеї та ями під септик, розбираємо старі будівлі й працюємо в тісних дворах, куди не заїде великий екскаватор.
            </p>
          </div>

          <figure class="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
            <img
              :src="heroSrc"
              :srcset="heroSrcset"
              :sizes="heroSizes"
              alt="Мініекскаватор Kubota копає у дворі приватного будинку у Вінниці"
              width="1120"
              height="840"
              fetchpriority="high"
              class="aspect-[4/3] w-full rounded-lg object-cover"
            >
          </figure>

          <div class="lg:col-span-5 lg:self-start">
            <dl class="divide-y divide-default border-t border-default">
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Година роботи з водієм</dt>
                <dd class="text-xl font-semibold text-highlighted tabular-nums">{{ fmt(mini.pricePerHour) }} грн</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Мінімальне замовлення</dt>
                <dd class="font-semibold text-highlighted">{{ mini.minHours }} години</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Доставка техніки на об'єкт</dt>
                <dd class="font-semibold text-highlighted tabular-nums">{{ fmt(mini.deliveryPrice) }} грн</dd>
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
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Що робимо мініекскаватором</h2>
        <ul class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="j in miniJobs" :key="j.title" class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-signal-600" />
            <div>
              <h3 class="text-lg font-semibold text-highlighted">{{ j.title }}</h3>
              <p class="mt-1 text-toned">{{ j.text }}</p>
            </div>
          </li>
        </ul>
      </UContainer>
    </section>

    <section class="border-t border-default py-12 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Характеристики {{ miniModel }}</h2>
          <p class="mt-4 text-toned">
            Компактні машини з відвалом, яким одразу засипаємо траншеї й рівняємо ґрунт. Ширина 1,55 м, тож проходять у більшість воріт і проїздів між будинками.
          </p>
        </div>
        <dl class="divide-y divide-default border-y border-default">
          <div v-for="s in miniSpecs" :key="s.label" class="flex items-baseline justify-between gap-4 py-3">
            <dt class="text-toned">{{ s.label }}</dt>
            <dd class="font-semibold text-highlighted tabular-nums">{{ s.value }}</dd>
          </div>
        </dl>
      </UContainer>
    </section>

    <section class="bg-granite-900 py-12 text-granite-200 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-white md:text-3xl">Ціна оренди мініекскаватора</h2>
          <p class="mt-4">
            Ціна за годину вже з водієм. Скільки годин займе робота, Олександр підкаже по телефону, коли опишете завдання.
          </p>
        </div>

        <div class="rounded-lg bg-granite-800 p-6 md:p-8">
          <p class="font-semibold text-white">Найменше замовлення</p>
          <dl class="mt-4 space-y-3 tabular-nums">
            <div class="flex items-baseline justify-between gap-4">
              <dt>Робота, {{ mini.minHours }} год × {{ fmt(mini.pricePerHour) }} грн</dt>
              <dd class="text-white">{{ fmt(mini.pricePerHour * mini.minHours) }} грн</dd>
            </div>
            <div class="flex items-baseline justify-between gap-4">
              <dt>Доставка техніки</dt>
              <dd class="text-white">{{ fmt(mini.deliveryPrice) }} грн</dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 border-t border-granite-600 pt-3">
              <dt class="font-semibold text-white">Разом</dt>
              <dd class="text-2xl font-semibold text-signal-400">{{ fmt(minTotal) }} грн</dd>
            </div>
          </dl>
          <p class="mt-5 text-sm text-granite-400">
            Ґрунт чи сміття вивеземо нашим самоскидом, ціну за машину назвемо одразу.
          </p>
        </div>
      </UContainer>
    </section>

    <section class="py-12 md:py-20">
      <UContainer>
        <div class="max-w-2xl">
          <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Мініекскаватор на наших об'єктах</h2>
          <p class="mt-3 text-toned">Фото з наших замовлень у Вінниці й навколо.</p>
        </div>
        <ul class="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-3">
          <li v-for="p in miniPhotos" :key="p.src">
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

    <LazyFaqSection hydrate-on-visible :items="miniFaq" />
    <LazyContactsSection hydrate-on-visible service="Мініекскаватор" />
  </div>
</template>
