import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import AWDfooter from '@/components/AWDfooter.vue'


class MutationObserverMock {
    constructor(cb: any) { }
    observe() { }
    disconnect() { }
}
global.MutationObserver = MutationObserverMock as any


const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/proyects', component: { template: '<div />' } },
        { path: '/contact', component: { template: '<div />' } }
    ]
})


const messages = {
    es: {
        footer: {
            projects: 'Proyectos',
            contact: 'Contacto',
            downloadCV: 'Descargar CV',
            rights: 'Todos los derechos'
        }
    },
    en: {
        footer: {
            projects: 'Projects',
            contact: 'Contact',
            downloadCV: 'Download CV',
            rights: 'All rights reserved'
        }
    }
}


beforeAll(async () => {
    router.push('/proyects')
    await router.isReady()
})


function mountFooter(locale: 'es' | 'en') {
    const i18n = createI18n({
        legacy: false,
        locale,
        fallbackLocale: 'es',
        messages
    })

    return mount(AWDfooter, {
        global: {
            plugins: [router, i18n],
            stubs: {
                NuxtLink: {
                    props: ['to'],
                    template: `<a :href="to"><slot /></a>` // <a> real
                },
                UIcon: true
            }
        }
    })
}

describe('Footer Component', () => {
    it('renders correctly in Spanish and English', () => {

        let wrapper = mountFooter('es')
        expect(wrapper.text()).toContain('Proyectos')
        expect(wrapper.text()).toContain('Contacto')
        expect(wrapper.text()).toContain('Todos los derechos')


        wrapper = mountFooter('en')
        expect(wrapper.text()).toContain('Projects')
        expect(wrapper.text()).toContain('Contact')
        expect(wrapper.text()).toContain('All rights reserved')
    })
})