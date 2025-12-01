<template>
  <section class="max-w-xl mx-auto p-6 bg-gray-600 rounded-xl shadow-md mt-10 text-2xl">
    <h1 class="text-2xl font-bold mb-6 text-center text-white">{{ $t('from.contact') }}</h1>

    <form
      :action="formspreeURL"
      method="POST"
      @submit.prevent="handleSubmit"
      class="space-y-4"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Nombre -->
        <div>
          <label for="name" class="block text-sm font-medium text-white">{{ $t('from.name') }}</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Tu nombre"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Correo -->
        <div>
          <label for="email" class="block text-sm font-medium text-white">{{ $t('from.email') }}</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="correo@ejemplo.com"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
        </div>
      </div>

      <!-- Mensaje -->
      <div>
        <label for="message" class="block text-sm font-medium text-white">{{ $t('from.message') }}</label>
        <textarea
          id="message"
          v-model="form.message"
          rows="4"
          placeholder="Escribe tu mensaje"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
        <p v-if="errors.message" class="text-red-600 text-sm mt-1">{{ errors.message }}</p>
      </div>

      <!-- Botón enviar -->
      <div class="text-center">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {{ isSubmitting ? $t('form.sending') : $t('form.send') }}
        </button>
      </div>
    </form>

    <!-- Mensaje de éxito o error -->
    <p v-if="successMessage" class="mt-4 text-green-600 text-center">{{ successMessage }}</p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const successMessage = ref('')
const isSubmitting = ref(false)

const formspreeURL = 'https://formspree.io/f/XXXXXXX' // reemplaza con tu ID

const validate = () => {
  let valid = true

  if (!form.name.trim()) {
    errors.name = t('form.errors.nameRequired')
    valid = false
  } else errors.name = ''

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = t('form.errors.emailRequired')
    valid = false
  } else if (!emailPattern.test(form.email)) {
    errors.email = t('form.errors.emailInvalid')
    valid = false
  } else errors.email = ''

  if (!form.message.trim()) {
    errors.message = t('form.errors.messageRequired')
    valid = false
  } else if (form.message.length < 10) {
    errors.message = t('form.errors.messageMin')
    valid = false
  } else errors.message = ''

  return valid
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  try {
    const response = await fetch(formspreeURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (response.ok) {
      successMessage.value = t('form.success')
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      successMessage.value = t('form.fail')
    }
  } catch (error) {
    console.error(error)
    successMessage.value = t('form.fail')
  } finally {
    isSubmitting.value = false
  }
}
</script>
