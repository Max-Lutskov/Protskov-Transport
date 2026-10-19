<script setup lang="ts">
import { company, faq, materials, machinery } from '~/data/site'

const minRate = Math.min(...machinery.map(m => m.pricePerHour))
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
              ...materials.map(m => ({ '@type': 'Offer', itemOffered: { '@type': 'Product', name: m.name } })),
              ...machinery.map(m => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Послуги: ${m.name.toLowerCase()}` } }))
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
