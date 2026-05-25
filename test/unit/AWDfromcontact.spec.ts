import { mount, VueWrapper } from '@vue/test-utils'
import AWDfromcontact from '@/components/AWDfromcontact.vue'
import { describe, it, expect, beforeEach } from 'vitest'
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
      message: 'Escribe tu mensaje'
    },
    email_placeholder: 'Ingresa tu correo'
  }
} as const

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

describe('AWD Contact Form', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(AWDfromcontact, {
      global: {
        plugins: [i18n]
      }
    })
  })

  it('renders form elements correctly', () => {
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('binds v-model correctly', async () => {
    await wrapper.find('input[type="text"]').setValue('Camilo')
    await wrapper.find('input[type="email"]').setValue('test@mail.com')
    await wrapper.find('textarea').setValue('Hello world')

    expect(wrapper.vm.form.name).toBe('Camilo')
    expect(wrapper.vm.form.email).toBe('test@mail.com')
    expect(wrapper.vm.form.message).toBe('Hello world')
  })

  it('shows validation errors when form is empty', async () => {
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.vm.errors.name).toBeTruthy()
    expect(wrapper.vm.errors.email).toBeTruthy()
    expect(wrapper.vm.errors.message).toBeTruthy()
  })

  it('validates email format', async () => {
    await wrapper.find('input[type="text"]').setValue('Camilo')
    await wrapper.find('input[type="email"]').setValue('invalid-email')
    await wrapper.find('textarea').setValue('Hello world')

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(wrapper.vm.errors.email).toBeTruthy()
  })

  it('disables button while submitting', async () => {
    wrapper.vm.isSubmitting = true
    await nextTick()

    expect(
      wrapper.find('button[type="submit"]').attributes('disabled')
    ).toBeDefined()
  })
})