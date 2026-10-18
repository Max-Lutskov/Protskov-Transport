<script setup lang="ts">
import type { FormError } from '@nuxt/ui'
import { materials, machinery } from '~/data/site'

const props = defineProps<{
  /** Готовий текст, напр. результат калькулятора */
  prefill?: string
  service?: string
  compact?: boolean
}>()

const emit = defineEmits<{ sent: [] }>()

const services = [...materials.map(m => m.name), ...machinery.map(m => m.name), 'Інше']

const state = reactive({
  phone: '',
  name: '',
  service: props.service ?? '',
  address: '',
  comment: props.prefill ?? '',
  website: ''
})

watch(() => props.prefill, v => { state.comment = v ?? '' })
watch(() => props.service, v => { if (v) state.service = v })

const { send, sending } = useLead()

function validate(s: typeof state): FormError[] {
  return isValidPhone(s.phone) ? [] : [{ name: 'phone', message: 'Вкажіть номер у форматі 097 123 45 67' }]
}

async function onSubmit() {
  const ok = await send({ ...state })
  if (ok) {
    state.phone = ''
    state.name = ''
    state.address = ''
    if (!props.prefill) state.comment = ''
    emit('sent')
  }
}
</script>

<template>
  <UForm :state="state" :validate="validate" :validate-on="['blur']" class="space-y-4" @submit="onSubmit">
    <div class="grid gap-4" :class="compact ? '' : 'sm:grid-cols-2 sm:items-end'">
      <UFormField name="phone" label="Телефон" required>
        <UInput v-model="state.phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="097 123 45 67" size="xl" class="w-full" />
      </UFormField>
      <UFormField v-if="!compact" name="name" label="Ім'я" hint="Необов'язково">
        <UInput v-model="state.name" autocomplete="given-name" size="xl" class="w-full" />
      </UFormField>
    </div>

    <template v-if="!compact">
      <div class="grid gap-4 sm:grid-cols-2 sm:items-end">
        <UFormField name="service" label="Що потрібно">
          <USelect v-model="state.service" :items="services" placeholder="Оберіть" size="xl" class="w-full" />
        </UFormField>
        <UFormField name="address" label="Адреса" hint="Необов'язково">
          <UInput v-model="state.address" placeholder="Вулиця або село" size="xl" class="w-full" />
        </UFormField>
      </div>
      <UFormField name="comment" label="Коментар" hint="Необов'язково">
        <UTextarea v-model="state.comment" :rows="3" placeholder="Наприклад: 10 т щебеню 20–40 на четвер" size="xl" class="w-full" />
      </UFormField>
    </template>

    <!-- Пастка для спам-ботів -->
    <input v-model="state.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">

    <UButton type="submit" label="Надіслати заявку" icon="i-lucide-send" size="xl" :loading="sending" block />
    <p class="text-sm text-muted">Передзвонимо, щоб уточнити деталі.</p>
  </UForm>
</template>
