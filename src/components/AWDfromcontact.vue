<template>
   <section class="max-w-2xl mx-auto p-8 bg-gray-600 rounded-xl shadow-md mt-10 text-2xl">
     <h1 class="text-3xl font-bold mb-8 text-center text-white">{{ $t('from.contact') }}</h1>

     <form
      :action="formspreeURL" 
      method="POST"
      @submit.prevent="handleSubmit"
      class="space-y-6"
      >

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        
       <!-- Nombre -->
      <div>
        <label for="name" class="block text-lg font-medium text-white mb-2">{{ $t('from.name') }}</label>
        <input
          type="text"
          v-model="form.name"
          class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500
          text-lg"
          />
          <p v-if="errors.name" class="text-red-600 text-sm mt-2">{{ errors.name }}</p>
      </div>

      <!-- Correo -->
       <div>
         <label for="email" class="block text-lg font-medium text-white mb-2">{{ $t('from.email') }}</label>
         <input
           type="email"
           id="email"
           v-model="form.email"
            :placeholder="$t('email_placeholder')" 
           class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-indigo-500 focus:ring-indigo-500
           text-xl"
           />
           <p v-if="errors.email" class="text-red-600 text-sm mt-2">{{ errors.email }}</p>
       </div>
      </div>

      <!-- Mensaje -->
      <div>
       <label for="message" class="block text-lg font-medium text-white mb-2">{{ $t('from.message') }}</label>
       <textarea
        id="message"
        v-model="form.message"
        rows="6"
       :placeholder="$t('placeholder.message')"
        class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3
        focus:border-indigo-500 focus:ring-indigo-500 text-lg"
        ></textarea>
        <p v-if="errors.message" class="text-red-600 text-sm mt-2">{{ errors.message }}</p>
      </div>

         <!-- Botón enviar -->
          <div class="text-center">
            <button
             type="submit"
             :disabled="isSubmitting"
             class="inline-flex justify-center py-3 px-8 border border-transparent shadow-sm
             text-lg font-medium rounded-lg text-white bg-red-600 hover:bg-red-700
             disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
             >
             {{ isSubmitting ? $t('form.sending') :$t('form.send') }}
          </button>
        </div>  
   </form>

   <p v-if="successMessage" class="mt-6 text-green-600 text-center text-lg">{{ successMessage }}</p>
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
