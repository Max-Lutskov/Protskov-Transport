<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { company, messengers, materials, machinery } from '~/data/site'

const techPages = [
  ...machinery.filter(m => m.page).map(m => ({ label: m.name, to: m.page!.to })),
  { label: 'Вивіз сміття', to: '/vyviz-smittia/' }
]

// У кількох матеріалів одна сторінка (пісок митий і яружний), тож лишаємо по одному пункту
const materialPages = [...new Map(
  materials.filter(m => m.page).map(m => [m.page!, { label: m.name.split(' ')[0]!, to: m.page! }])
).values()]

// Якорі головної без active: інакше на головній підсвічуються всі одразу
const sectionLinks = [
  { label: 'Роботи', to: '/#roboty' },
  { label: 'Автопарк', to: '/#avtopark' },
  { label: 'Питання', to: '/#pytannia' },
  { label: 'Контакти', to: '/#kontakty' }
].map(link => ({ ...link, active: false }))

const desktopItems: NavigationMenuItem[] = [
  { label: 'Спецтехніка', children: [{ label: 'Уся техніка й ціни', to: '/#tekhnika', active: false }, ...techPages] },
  sectionLinks[0]!,
  { label: 'Матеріали', children: [{ label: 'Усі матеріали й ціни', to: '/#materialy', active: false }, ...materialPages] },
  ...sectionLinks.slice(1)
]

const menuOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-default bg-default/95 backdrop-blur">
    <UContainer class="flex h-16 items-center justify-between gap-6">
      <AppLogo />

      <UNavigationMenu
        :items="desktopItems"
        content-orientation="vertical"
        color="neutral"
        aria-label="Основна навігація"
        class="hidden xl:flex"
      />

      <div class="flex items-center gap-2">
        <UButton
          :to="`tel:${company.phone}`"
          icon="i-lucide-phone"
          :label="company.phoneDisplay"
          color="neutral"
          variant="solid"
          class="hidden sm:inline-flex"
        />

        <USlideover v-model:open="menuOpen" title="Меню" :description="company.tagline" class="xl:hidden">
          <UButton
            icon="i-lucide-menu"
            aria-label="Відкрити меню"
            color="neutral"
            variant="ghost"
            size="xl"
            class="xl:hidden"
          />

          <template #body>
            <nav aria-label="Меню на телефоні" class="space-y-6">
              <div>
                <h2 class="mb-1 px-2.5 text-sm text-muted">
                  <NuxtLink to="/#tekhnika" class="hover:text-highlighted">Спецтехніка</NuxtLink>
                </h2>
                <ul>
                  <li v-for="link in techPages" :key="link.to">
                    <UButton :to="link.to" :label="link.label" color="neutral" variant="ghost" size="lg" block class="justify-start" />
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-1 px-2.5 text-sm text-muted">
                  <NuxtLink to="/#materialy" class="hover:text-highlighted">Матеріали</NuxtLink>
                </h2>
                <ul>
                  <li v-for="link in materialPages" :key="link.to">
                    <UButton :to="link.to" :label="link.label" color="neutral" variant="ghost" size="lg" block class="justify-start" />
                  </li>
                </ul>
              </div>
              <ul class="border-t border-default pt-4">
                <li v-for="link in sectionLinks" :key="link.to">
                  <UButton :to="link.to" :label="link.label" color="neutral" variant="ghost" size="lg" block class="justify-start" />
                </li>
              </ul>
            </nav>
          </template>

          <template #footer>
            <div class="flex w-full items-stretch gap-2">
              <UButton
                :to="`tel:${company.phone}`"
                icon="i-lucide-phone"
                :label="company.phoneDisplay"
                size="xl"
                block
                class="flex-1"
              />
              <UButton
                v-for="m in messengers"
                :key="m.name"
                :to="m.href"
                :icon="m.icon"
                :aria-label="`Написати у ${m.name}`"
                color="neutral"
                variant="outline"
                size="xl"
                target="_blank"
                rel="noopener"
              />
            </div>
          </template>
        </USlideover>
      </div>
    </UContainer>
  </header>
</template>
