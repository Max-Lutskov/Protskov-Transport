<script setup lang="ts">
import { company, faq, materials, machinery, type Material } from '~/data/site'

const minRate = Math.min(...machinery.map(m => m.pricePerHour))

// Доставка самоскидом по Вінниці. Google приймає регіон доставки лише на рівні країни,
// тож зона «Вінниця + 30 км» тут не уточнюється. Умов повернення не вказуємо: на SEO не впливає.
const shippingDetails = {
  '@type': 'OfferShippingDetails',
  shippingRate: { '@type': 'MonetaryAmount', value: company.deliveryFrom, currency: 'UAH' },
  shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'UA' }
}

// Ціна за тонну без доставки. Щебінь має кілька фракцій з різною ціною, тож для нього діапазон.
const materialOffer = (m: Material) => {
  const prices = m.fractionPrices ? Object.values(m.fractionPrices) : [m.priceFrom]
  const base = { priceCurrency: 'UAH', availability: 'https://schema.org/InStock', url: `${company.url}/#materialy`, shippingDetails }
  return prices.length > 1
    ? { '@type': 'AggregateOffer', lowPrice: Math.min(...prices), highPrice: Math.max(...prices), offerCount: prices.length, ...base }
    : {
        '@type': 'Offer',
        price: prices[0],
        priceSpecification: { '@type': 'UnitPriceSpecification', price: prices[0], priceCurrency: 'UAH', unitCode: 'TNE', unitText: 'т' },
        ...base
      }
}
const materialImage = (m: Material) => {
  const src = m.photo ?? Object.values(m.fractionPhotos ?? {})[0]
  return src ? `${company.url}${src}` : undefined
}
const title = 'Оренда спецтехніки та мініекскаватора у Вінниці — Процков Буд'
const description = `Оренда екскаватора JCB, мініекскаватора Kubota, бобкета й гідромолота з водієм від ${minRate} грн/год. Самоскиди 7–12 т: щебінь, пісок, вивіз ґрунту. ${company.area}, ${company.hours}. Тел. ${company.phoneDisplay}`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'uk_UA'
})

useHead({
  link: [{ rel: 'canonical', href: company.url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'HomeAndConstructionBusiness',
            '@id': `${company.url}/#business`,
            name: company.name,
            description,
            url: company.url,
            telephone: company.phone,
            founder: { '@type': 'Person', name: company.owner },
            openingHours: company.hoursSchema,
            address: { '@type': 'PostalAddress', addressLocality: company.city, addressRegion: 'Вінницька область', addressCountry: 'UA' },
            areaServed: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: 49.2331, longitude: 28.4682 }, geoRadius: 30000 },
            makesOffer: [
              // Google вимагає, щоб у Product були власні offers, тож ціну кладемо всередину товару
              ...materials.map(m => ({
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Product',
                  name: m.name,
                  description: m.description,
                  image: materialImage(m),
                  brand: { '@type': 'Brand', name: company.name },
                  offers: materialOffer(m)
                }
              })),
              ...machinery.map(m => ({
                '@type': 'Offer',
                price: m.pricePerHour,
                priceCurrency: 'UAH',
                priceSpecification: { '@type': 'UnitPriceSpecification', price: m.pricePerHour, priceCurrency: 'UAH', unitCode: 'HUR', unitText: 'год' },
                itemOffered: { '@type': 'Service', name: `Оренда: ${m.name.toLowerCase()}${m.spec ? ` ${m.spec}` : ''} з водієм` }
              }))
            ]
          },
          {
            '@type': 'FAQPage',
            mainEntity: faq.map(q => ({
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
</script>

<template>
  <div>
    <HeroSection />
    <MachinerySection />
    <WorksSection />
    <MaterialsSection />
    <FleetSection />
    <StepsSection />
    <TrustSection />
    <FaqSection />
    <ContactsSection />
  </div>
</template>
