import { mount, VueWrapper } from '@vue/test-utils'
import AWDfromcontact from '@/components/AWDfromcontact.vue'
import { describe, it, expect, beforeEach} from 'vitest'
import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'



const messages = {
  en: {
     form: {
        send: 'Send',
        sending: 'Sending...',
        success: 'Message sent!',
        fail: 'Failed to send',
        errors: {
          nameRequired: 'Name required',
          emailRequired: 'Email required',
          emailInvalid: 'Email invalid',
          messageRequired: 'Message required',
          messageMin: 'Message too short'
        }
     },
     from: {
        contact: 'Contact',
        name: 'Name',
        email: 'Email',
        message: 'Message'
     },
     placeholder: {
       message: 'Write your message'
     },
     email_placeholder: 'Enter your email'
  },
  es: {
   form: {
     send: 'Enviar',
     sending: 'Enviando...',
     success: '¡Mensaje enviado!',
     fail: 'Error al enviar',
     errors: {
        nameRequired: 'Nombre requerido',
        emailRequired: 'Correo requerido',
        emailInvalid: 'Correo inválido',
        messageRequired: 'Mensaje requerido',
        messageMin: 'Mensaje muy corto'
     }
   },
   from: {
     contact: 'Contacto',
     name: 'Nombre',
     email: 'Correo',
     message: 'Mensaje'
   },
   placeholder: {
     message: 'Escribe tu mensaje aquí...'
   },
   email_placeholder: 'Ingresa tu correo'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})


describe('AWDfromcontact Component - Contact form', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(AWDfromcontact, {
      global:{ 
         plugins: [i18n]
      } 
    })
  })

  it('renders all form fields and button', () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows error messages if fields are empty', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.text()).toContain('Name required')
    expect(wrapper.text()).toContain('Email required')
    expect(wrapper.text()).toContain('Message required')
  })

  it('updates v-model correctly', async () => {
    await wrapper.find('input[type="text"]').setValue('Camilo')
    expect((wrapper.vm as any).form.name).toBe('Camilo')

    await wrapper.find('input[type="email"]').setValue('Camilotest.com')
    expect((wrapper.vm as any).form.email).toBe('Camilotest.com')

    await wrapper.find('textarea').setValue('Hello world')
    expect((wrapper.vm as any).form.message).toBe('Hello world')

  })

  it('disables button while submitting', async () => {
    (wrapper.vm as any).isSubmitting = true
    await nextTick()

    expect(
       wrapper.find('button[type="submit"]').attributes('disabled')
    ).toBeDefined()
  }) 
})


  




