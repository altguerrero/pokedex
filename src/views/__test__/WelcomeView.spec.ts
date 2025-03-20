import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WelcomeView from '../WelcomeView.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const DummyComponent = { template: '<div>Pokemons Page</div>' }

describe('WelcomeView.vue', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/pokemons', name: 'Pokemons', component: DummyComponent }],
  })

  it('renders welcome text and image', () => {
    const wrapper = mount(WelcomeView, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('h1').text()).toBe('Welcome to Pokédex')
    expect(wrapper.find('p').text()).toContain('Professor Oak')
    expect(wrapper.find('img').attributes('src')).toBeTruthy()
  })

  it('navigates to /pokemons when button is clicked', async () => {
    const pushSpy = vi.spyOn(router, 'push')

    const wrapper = mount(WelcomeView, {
      global: {
        plugins: [router],
      },
    })

    await router.isReady()

    const button = wrapper.find('a')
    await button.trigger('click')

    expect(pushSpy).toHaveBeenCalledWith('/pokemons')
  })
})
