<script setup lang="ts">
import { company, messengers, machinery, bobcatModel, bobcatSpecs, bobcatJobs, bobcatFaq } from '~/data/site'

const bobcat = machinery.find(m => m.id === 'bobkat')!
const fmt = (n: number) => new Intl.NumberFormat('uk-UA').format(n)
const minTotal = bobcat.pricePerHour * bobcat.minHours + bobcat.deliveryPrice

// Cloudflare віддає пререндерений bobkat/index.html за адресою зі слешем у кінці
const url = `${company.url}/bobkat/`
// Кадр з нашого відео, ширина 1080
const heroSrc = '/images/bobkat/hero.jpg'
const heroSrcset = srcset(heroSrc, [480, 720, 1080])
const heroAlt = 'Два бобкети Bobcat S250 Процков Буд на ділянці під Вінницею'
const video = { src: '/video/bobkat.mp4', poster: '/images/bobkat/video-poster.webp' }
const heroSizes = '(min-width: 1024px) 55vw, calc(100vw - 2rem)'

const title = `Оренда бобкета у Вінниці — ${fmt(bobcat.pricePerHour)} грн/год | ${company.name}`
// До ~155 символів, щоб Google не обрізав телефон у кінці
const description = `Бобкет ${bobcatModel} з водієм: планування ділянки, розрівнювання щебеню, навантаження, вивіз сміття. ${fmt(bobcat.pricePerHour)} грн/год. Вінниця +30 км. Тел. ${company.phoneDisplay}`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'uk_UA',
  ogUrl: url,
  ogImage: `${company.url}${heroSrc}`,
  ogImageWidth: 1080,
  ogImageHeight: 810,
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
            name: 'Оренда бобкета з водієм',
            serviceType: 'Оренда міні-навантажувача',
            description,
            url,
            image: `${company.url}${heroSrc}`,
            // Повний опис компанії — на головній, тут посилання на нього
            provider: { '@type': 'HomeAndConstructionBusiness', '@id': `${company.url}/#business`, name: company.name, telephone: company.phone, url: company.url },
            areaServed: { '@type': 'City', name: company.city },
            offers: {
              '@type': 'Offer',
              price: bobcat.pricePerHour,
              priceCurrency: 'UAH',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: bobcat.pricePerHour, priceCurrency: 'UAH', unitCode: 'HUR', unitText: 'год' }
            }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Головна', item: company.url },
              { '@type': 'ListItem', position: 2, name: 'Оренда бобкета', item: url }
            ]
          },
          {
            '@type': 'VideoObject',
            name: 'Два бобкети Bobcat S250 Процков Буд на ділянці',
            description: 'Два міні-навантажувачі Bobcat S250 розрівнюють ґрунт на ділянці під Вінницею.',
            thumbnailUrl: `${company.url}${heroSrc}`,
            contentUrl: `${company.url}${video.src}`,
            uploadDate: '2026-10-20',
            duration: 'PT10S'
          },
          {
            '@type': 'FAQPage',
            mainEntity: bobcatFaq.map(q => ({
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

// Відео без звуку саме грає, коли його видно. Хто вимкнув анімації в системі, вмикає його сам
const videoEl = useTemplateRef<HTMLVideoElement>('videoEl')
const videoVisible = ref(false)
const reducedMotion = ref(false)
onMounted(() => {
  const el = videoEl.value
  if (!el) return
  reducedMotion.value = matchMedia('(prefers-reduced-motion: reduce)').matches
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry) return
    if (entry.isIntersecting) videoVisible.value = true
    if (reducedMotion.value) return
    if (entry.isIntersecting) nextTick(() => el.play().catch(() => {}))
    else el.pause()
  }, { rootMargin: '200px 0px' })
  observer.observe(el)
  onBeforeUnmount(() => observer.disconnect())
})

const breadcrumbs = [
  { label: 'Головна', to: '/' },
  { label: 'Оренда бобкета' }
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
              Оренда
              <span class="box-decoration-clone bg-[linear-gradient(transparent_58%,var(--color-signal-400)_58%,var(--color-signal-400)_90%,transparent_90%)]">бобкета</span>
              у Вінниці
            </h1>
            <p class="mt-5 text-lg text-toned">
              Два міні-навантажувачі {{ bobcatModel }} з нашим водієм. Плануємо ділянки, розрівнюємо щебінь і ґрунт, вантажимо й вивозимо будівельне сміття.
            </p>
          </div>

          <figure class="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
            <img
              :src="heroSrc"
              :srcset="heroSrcset"
              :sizes="heroSizes"
              :alt="heroAlt"
              width="1080"
              height="810"
              fetchpriority="high"
              class="aspect-[4/3] w-full rounded-lg object-cover"
            >
          </figure>

          <div class="lg:col-span-5 lg:self-start">
            <dl class="divide-y divide-default border-t border-default">
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Година роботи з водієм</dt>
                <dd class="text-xl font-semibold text-highlighted tabular-nums">{{ fmt(bobcat.pricePerHour) }} грн</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Мінімальне замовлення</dt>
                <dd class="font-semibold text-highlighted">{{ bobcat.minHours }} години</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="text-toned">Доставка техніки на об'єкт</dt>
                <dd class="font-semibold text-highlighted tabular-nums">{{ fmt(bobcat.deliveryPrice) }} грн</dd>
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
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Що робимо бобкетом</h2>
        <ul class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="j in bobcatJobs" :key="j.title" class="flex gap-3">
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
          <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Характеристики {{ bobcatModel }}</h2>
          <p class="mt-4 text-toned">
            Бобкет розвертається на місці, тож працює на невеликих ділянках і між будинками. Ковшем рівняє, вантажить і переміщує ґрунт, щебінь і сміття. Обидві наші машини однакові.
          </p>
          <p class="mt-4 text-toned">
            Бобкет не копає глибоко. Для траншей і ям є
            <NuxtLink to="/miniekskavator/" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">мініекскаватори Kubota</NuxtLink>,
            для котлованів —
            <NuxtLink to="/ekskavator/" class="font-semibold text-highlighted underline decoration-signal-500 underline-offset-2 hover:decoration-signal-400">екскаватор JCB 3CX</NuxtLink>.
          </p>
        </div>
        <dl class="divide-y divide-default border-y border-default">
          <div v-for="s in bobcatSpecs" :key="s.label" class="flex items-baseline justify-between gap-4 py-3">
            <dt class="text-toned">{{ s.label }}</dt>
            <dd class="font-semibold text-highlighted tabular-nums">{{ s.value }}</dd>
          </div>
        </dl>
      </UContainer>
    </section>

    <section class="bg-granite-900 py-12 text-granite-200 md:py-20">
      <UContainer class="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-white md:text-3xl">Ціна оренди бобкета</h2>
          <p class="mt-4">
            Ціна за годину вже з водієм. Скільки годин займе робота, Олександр підкаже по телефону, коли опишете завдання.
          </p>
        </div>

        <div class="rounded-lg bg-granite-800 p-6 md:p-8">
          <p class="font-semibold text-white">Найменше замовлення</p>
          <dl class="mt-4 space-y-3 tabular-nums">
            <div class="flex items-baseline justify-between gap-4">
              <dt>Робота, {{ bobcat.minHours }} год × {{ fmt(bobcat.pricePerHour) }} грн</dt>
              <dd class="text-white">{{ fmt(bobcat.pricePerHour * bobcat.minHours) }} грн</dd>
            </div>
            <div class="flex items-baseline justify-between gap-4">
              <dt>Доставка техніки</dt>
              <dd class="text-white">{{ fmt(bobcat.deliveryPrice) }} грн</dd>
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
      <UContainer class="grid items-center gap-10 md:grid-cols-[1fr_auto] lg:gap-16">
        <div class="max-w-xl">
          <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Наші бобкети на об'єкті</h2>
          <p class="mt-4 text-toned">
            Два Bobcat S250 розрівнюють ґрунт на ділянці під Вінницею. На великому об'єкті ставимо обидва, щоб закінчити швидше.
          </p>
        </div>
        <!-- Відео й постер вантажаться, лише коли блок наближається до екрана -->
        <video
          ref="videoEl"
          :src="videoVisible ? video.src : undefined"
          :poster="videoVisible ? video.poster : undefined"
          width="720"
          height="1280"
          muted
          loop
          playsinline
          preload="none"
          :controls="reducedMotion"
          aria-label="Два бобкети Bobcat S250 Процков Буд розрівнюють ґрунт на ділянці"
          class="mx-auto aspect-[9/16] w-full max-w-[22rem] rounded-lg bg-granite-200 object-cover"
        />
      </UContainer>
    </section>

    <LazyFaqSection hydrate-on-visible :items="bobcatFaq" />
    <LazyContactsSection hydrate-on-visible service="Бобкет" />
  </div>
</template>
