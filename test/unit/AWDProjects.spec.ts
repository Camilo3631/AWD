import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import AWDProjects from '@/components/AWDprojects.vue'
import projectsData from '@/data/projects.json'

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  messages: {
    es: {
      Projects: 'Proyectos',
      projects: {
        viewLive: 'Ver Live',
        viewGit: 'Ver GitHub',
      },
    },
    en: {
      Projects: 'Projects',
      projects: {
        viewLive: 'View Live',
        viewGit: 'View GitHub',
      },
    },
  },
})

describe('AWDProjects Component', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(AWDProjects, { global: { plugins: [i18n] } })
  })

  it('renders the title correctly in English', async () => {
    i18n.global.locale.value = 'en'
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h1').text()).toBe('Projects')
  })

  it('renders the title correctly in Spanish', async () => {
    i18n.global.locale.value = 'es'
    await wrapper.vm.$nextTick()
    expect(wrapper.find('h1').text()).toBe('Proyectos')
  })

  it('displays the first project description according to English', async () => {
    i18n.global.locale.value = 'en'
    await wrapper.vm.$nextTick()
    const firstProject = projectsData[0]
    const desc = firstProject?.description?.en || ''
    expect(wrapper.html()).toContain(desc)
  })

  it('displays the first project description according to Spanish', async () => {
    i18n.global.locale.value = 'es'
    await wrapper.vm.$nextTick()
    const firstProject = projectsData[0]
    const desc = firstProject?.description?.es || ''
    expect(wrapper.html()).toContain(desc)
  })

  it('shows the correct number of projects per page', () => {
    const perPage = 6
    const cards = wrapper.findAll('div.flex > div.flex-col')
    expect(cards.length).toBeLessThanOrEqual(perPage)
  })

  it('changes page when clicking on pagination', async () => {
    const buttons = wrapper.findAll('button')
    if (buttons[1]) {
      await buttons[1].trigger('click')
      expect((wrapper.vm as any).currentPage).toBe(2)
    }
  })

  it('Live and GitHub links have the correct href', () => {
    const firstCardLinks = wrapper.findAll('div.flex-col > div.mt-auto a')
    const firstProject = projectsData[0]
    expect(firstCardLinks[0]?.attributes('href')).toBe(firstProject?.liveLink || '')
    expect(firstCardLinks[1]?.attributes('href')).toBe(firstProject?.gitLink || '')
  })

  it('changes button classes when toggling isDay', async () => {
    const wrapperDay = mount(AWDProjects, {
      global: { plugins: [i18n] },
      data() { return { isDay: true } }
    })

    const firstLink = wrapperDay.find('div.flex-col > div.mt-auto a')
    expect(firstLink.classes()).toContain('bg-black')
    expect(firstLink.classes()).toContain('text-white')

    await wrapperDay.setData({ isDay: false })
    await wrapperDay.vm.$nextTick()
    expect(firstLink.classes()).toContain('bg-gray-200')
    expect(firstLink.classes()).toContain('text-black')
  })
})