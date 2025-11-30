<template>
  <section class="max-w-xl-15 mx-auto p-15 bg-gray-600 rounded-xl shadow-md  mt-10 text-2xl">
    <h2 class="text-2xl font-bold mb-6 text-center text-white">Contáctame</h2>

    <form
      :action="formspreeURL"
      method="POST"
      @submit.prevent="handleSubmit"
      class="space-y-4 "
    >
      <!-- Nombre y Correo en la misma línea -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Nombre -->
        <div>
          <label for="name" class="block text-sm font-medium text-white">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="form.name"
            placeholder="Tu nombre"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Correo -->
        <div>
          <label for="email" class="block text-sm font-medium text-white">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="form.email"
            placeholder="correo@ejemplo.com"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
        </div>
      </div>

      <!-- Mensaje -->
      <div>
        <label for="message" class="block text-sm font-medium text-white">Mensaje</label>
        <textarea
          id="message"
          name="message"
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
          class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {{ isSubmitting ? 'Enviando...' : 'Enviar' }}
        </button>
      </div>

    </form>

    <!-- Mensaje de éxito -->
    <p v-if="successMessage" class="mt-4 text-green-600 text-center">{{ successMessage }}</p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

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

// Tu URL de Formspree
const formspreeURL = 'https://formspree.io/f/XXXXXXX' // reemplaza con tu ID

// Validación
const validate = () => {
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'El nombre es obligatorio'
    valid = false
  } else errors.name = ''

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio'
    valid = false
  } else if (!emailPattern.test(form.email)) {
    errors.email = 'El correo no es válido'
    valid = false
  } else errors.email = ''

  if (!form.message.trim()) {
    errors.message = 'El mensaje es obligatorio'
    valid = false
  } else if (form.message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
    valid = false
  } else errors.message = ''

  return valid
}

// Enviar formulario
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
      successMessage.value = 'Gracias por contactarme. Te responderé pronto.'
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      successMessage.value = 'Error al enviar el mensaje. Intenta de nuevo.'
    }
  } catch (error) {
    console.error(error)
    successMessage.value = 'Error al enviar el mensaje. Intenta de nuevo.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
