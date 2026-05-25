<template>
   <section class="max-w-2xl mx-auto p-8 bg-gray-600 rounded-xl shadow-md mt-10 text-2xl">
     <h1 class="text-3xl font-bold mb-8 text-center text-white">{{ $t('from.contact') }}</h1>

     <form
      @submit.prevent="handleSubmit"
      class="space-y-6"
      >

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

   
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
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const successMessage = ref('');
const isSubmitting = ref(false);

const validate = () => {
   let valid = true;

    if (!form.name) {
      errors.name = t('form.errors.nameRequired');
      valid = false;
    } else {
       errors.name = '' 
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email) {
      errors.email = t('form.errors.emailRequired');
      valid = false;
    } else if (!emailPattern.test(form.email)) {
       errors.email = t('form.errors.emailInvalid')
       valid = false;
    } else errors.email = ''

    if (!form.message.trim()) {
        errors.message = t('form.errors.messageRequired')
        valid = false;
    } else if (form.message.length < 10) {
       errors.message = t('form.errors.messageMin')
       valid = false;
    } else {
      errors.message = ''
    }

    return valid;
}

const handleSubmit = async () => {
   if (!validate()) return

   isSubmitting.value = true

   try {
     const response = await $fetch('/api/send-email', {
       method: 'POST',
       body: {
          name: form.name,
          email: form.email,
          message: form.message
       }
     })

     if (response.ok) {
       successMessage.value = t('form.success')

       form.name = '',
       form.email = '',
       form.message = ''
     } else {
       successMessage.value = t('form.fail')
     }

    } catch (error) {
      successMessage.value = t('form.fil')
    }

    isSubmitting.value = false
} 

 
</script>