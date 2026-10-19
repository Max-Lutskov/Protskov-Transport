<script setup lang="ts">
import { works } from '~/data/site'
</script>

<template>
  <section id="roboty" class="py-14 md:py-20">
    <UContainer>
      <div class="max-w-2xl">
        <h2 class="font-display text-2xl font-medium text-highlighted md:text-3xl">Наші роботи</h2>
        <p class="mt-3 text-toned">Фото з наших замовлень у Вінниці й навколо: котловани, септики, траншеї, демонтаж і вивіз.</p>
      </div>

      <ul class="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
        <li v-for="w in works" :key="w.src">
          <figure>
            <img :src="w.src" :alt="w.title" width="800" height="600" loading="lazy" class="aspect-[4/3] w-full rounded-md object-cover">
            <figcaption class="mt-2 text-sm text-toned">{{ w.title }}</figcaption>
          </figure>
        </li>
      </ul>
    </UContainer>
  </section>
</template>
