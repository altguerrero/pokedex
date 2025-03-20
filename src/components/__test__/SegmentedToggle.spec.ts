import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import SegmentedToggle from '../SegmentedToggle.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const Dummy = { template: '<div>Dummy</div>' }

const routes = [
  { path: '/pokemons', name: 'Pokemons', component: Dummy },
  { path: '/favorites', name: 'Favorites', component: Dummy },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

describe('SegmentedToggle.vue', () => {
  beforeEach(async () => {
    router.push('/pokemons')
    await router.isReady()
  })

  it('highlights "All" button when on /pokemons route', () => {
    const wrapper = mount(SegmentedToggle, {
      global: { plugins: [router] },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('cursor-default')
    expect(buttons[1].classes()).toContain('bg-content-disabled')
  })

  it('highlights "Favorites" button when on /favorites route', async () => {
    await router.push('/favorites')
    await flushPromises()

    const wrapper = mount(SegmentedToggle, {
      global: { plugins: [router] },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[1].classes()).toContain('cursor-default')
    expect(buttons[0].classes()).toContain('bg-content-disabled')
  })

  it('navigates to /favorites when Favorites button is clicked', async () => {
    const wrapper = mount(SegmentedToggle, {
      global: { plugins: [router] },
    })

    const favoritesButton = wrapper.findAll('button')[1]
    await favoritesButton.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/favorites')
  })

  it('navigates to /pokemons when All button is clicked', async () => {
    await router.push('/favorites')
    await flushPromises()

    const wrapper = mount(SegmentedToggle, {
      global: { plugins: [router] },
    })

    const allButton = wrapper.findAll('button')[0]
    await allButton.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/pokemons')
  })
})
