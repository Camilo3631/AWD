import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import AWDswitch from '@/components/AWDswitch.vue'

describe('AWDswitch toggle full cycle', () => {
  let localStorageMock: Record<string, string> = {}

  beforeEach(() => {

    document.body.className = ''


    localStorageMock = {}
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => localStorageMock[key] || null,
        setItem: (key: string, value: string) => { localStorageMock[key] = value },
        removeItem: (key: string) => { delete localStorageMock[key] },
        clear: () => { localStorageMock = {} }
      },
      configurable: true,
    })
  })

  it('toggles from day ☀️ to night 🌙 and back to day ☀️', async () => {
    const wrapper = shallowMount(AWDswitch, { props: { modelValue: true } })


    wrapper.vm!.isOn = true
    document.body.className = 'light'

 
    await wrapper.vm!.toggle()
    const events1 = wrapper.emitted('update:modelValue')!
    expect(wrapper.text()).toContain('🌙')
    expect(events1[0]).toEqual([false])
    expect(document.body.classList.contains('dark')).toBe(true)
    expect(document.body.classList.contains('light')).toBe(false)
    expect(localStorageMock['theme']).toBe('dark')

  
    await wrapper.vm!.toggle()
    const events2 = wrapper.emitted('update:modelValue')!
    expect(wrapper.text()).toContain('☀️')
    expect(events2[1]).toEqual([true])
    expect(document.body.classList.contains('light')).toBe(true)
    expect(document.body.classList.contains('dark')).toBe(false)
    expect(localStorageMock['theme']).toBe('light')
  })
})