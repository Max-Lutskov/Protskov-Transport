<script setup lang="ts">
import { company, faq, materials, machinery } from '~/data/site'

const title = 'Щебінь, пісок і камінь з доставкою у Вінниці — Процков Буд'
const description = `Доставка щебеню, відсіву, піску, каменю й чорнозему самоскидами 7–25 т. Екскаватор, мініекскаватор, бобкет з водієм. ${company.area}, ${company.hours}. Тел. ${company.phoneDisplay}`

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
    <MaterialsSection />
    <MachinerySection />
    <FleetSection />
    <StepsSection />
    <TrustSection />
    <FaqSection />
    <ContactsSection />
  </div>
</template>
