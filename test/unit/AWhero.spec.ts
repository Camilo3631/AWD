import { mount, VueWrapper } from '@vue/test-utils'
import AWDhero from '@/components/AWDhero.vue'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'

const messages = {
  en: {
    heroText1: 'Hi, I am Camilo Acosta',
    heroText2: 'Front-end Developer creating elegant and functional digital experiences.',
  },
  es: {
    heroText1: 'Hola, soy Camilo Acosta',
    heroText2: 'Desarrollador Front-end creando experiencias digitales elegantes y funcionales.' 
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

describe('AWDhero Component – Typewriter', () => {
  let wrapper: VueWrapper<any>
  const typingSpeed = 90

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(AWDhero, {
      global: {
        plugins: [i18n]
      }
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the typewriter span', () => {
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('types heroText1 correctly', async () => {
    const span = wrapper.find('span')
    const text = messages.en.heroText1

    vi.advanceTimersByTime(text.length * typingSpeed)
    await nextTick()

    expect(span.text()).toBe(text)
  })

  it('renders heroText2 in the paragraph', () => {
    const paragraph = wrapper.find('p')
    expect(paragraph.text()).toBe(messages.en.heroText2)
  })
})