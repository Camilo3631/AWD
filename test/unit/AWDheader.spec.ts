import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AWDheader from '@/components/AWDheader.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'

const messages = {
  es: {
    header: { home: 'Inicio', poryects: 'Proyectos', contac: 'Contacto' } 
  },
  en: {
    header: { home: 'Home', poryects: 'Proyects', contac: 'Contact' }
  }
}

const router = createRouter({
   history: createMemoryHistory(),
   routes: [
    { path: '/', name: 'home', component: { template: '<div />'} },
    { path: '/proyects', name: 'proyects', component: { template: '<div />'} },
    { path: '/contact', name: 'contact', component: { template: '<div />'} }
   ] 
})

const i18n = createI18n({
   legacy: false,
   locale: 'es',
   messages
})

describe('AWDheader component', () => {
  it('renders desktop navigation links correctly', async () => {
      const wrapper = mount(AWDheader, {
          global: {
             plugins: [router, i18n],
             stubs: {
                AWDswitch: true,
                NuxtLink: { template: '<a><slot /></a>'}   
             }
          }
      })

      const mobileNavLinks = wrapper.findAll('nav.sm\\:hidden li')

      expect(wrapper.vm.menuOpen).toBe(false)
      expect(mobileNavLinks.length).toBe(3)

      await wrapper.find('button').trigger('click')
      expect(wrapper.vm.menuOpen).toBe(true)
      expect(mobileNavLinks.length).toBe(3)

      await wrapper.find('button').trigger('click')
      expect(wrapper.vm.menuOpen).toBe(false)
  })
})