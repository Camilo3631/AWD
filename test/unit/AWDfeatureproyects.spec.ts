import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'



import AWDfeatureproyects from '@/components/AWDfeatureproyects.vue'


class MutationObserverMock {
    constructor(cb: any) { }
    observe() { }
    disconnect() { }
}
global.MutationObserver = MutationObserverMock as any

Object.defineProperty(document.body, 'classList', {
  value: {
    contains: () => true
  }
})

const messages = {
    es: {
        "feature.proyects": "Proyectos destacados",
        projects: {
            'invierno-title': 'Invierno',
            'kino-title': 'Kino',
            viewLive: 'Ver Live',
            viewGit: 'Ver GitHub'
        },
        proyects: {
            invierno: { description: 'Descripción invierno' },
            kino: { description: 'Descripción kino' }
        }
    },
    en: {
        "feature.proyects": "Proyectos destacados",
        projects: {
            'invierno-title': 'Winter',
            'kino-title': 'Cinema',
            viewLive: 'View Live',
            viewGit: 'View GitHub'
        },
        proyects: {
            invierno: { description: 'Winter description' },
            kino: { description: 'Cinema description' }
        }
    }
}

describe('AWDfeatureproyects Component', () => {
    it('renders projects correctly with router and i18n', async () => {
  
        const router = createRouter({
            history: createMemoryHistory(),
            routes: [
                { path: '/es', component: { template: '<div />' } },
                { path: '/en', component: { template: '<div />' } }
            ]
        })
        router.push('/es')
        await router.isReady()

     
        const i18n = createI18n({
            legacy: false, 
            locale: 'es',
            fallbackLocale: 'es',
            messages
        })

      
        const wrapper = mount(AWDfeatureproyects, {
            global: { plugins: [router, i18n] }
        })


        expect(wrapper.text()).toContain('Invierno')
        expect(wrapper.text()).toContain('Kino')


        expect(wrapper.find('a[href="https://invierno-shop.vercel.app/"]').exists()).toBe(true)
        expect(wrapper.find('a[href="https://github.com/Camilo3631/invierno-shop"]').exists()).toBe(true)
        expect(wrapper.find('a[href="https://kino-live-start.vercel.app/"]').exists()).toBe(true)
        expect(wrapper.find('a[href="https://github.com/Camilo3631/KinoLiveStart"]').exists()).toBe(true)
    })
})