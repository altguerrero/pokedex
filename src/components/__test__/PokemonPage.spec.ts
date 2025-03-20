import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import PokemonPage from '../PokemonPage.vue'
import SearchInput from '../SearchInput.vue'
import ListContainer from '../ListContainer.vue'
import NotFound from '../NotFound.vue'
import SegmentedToggle from '../SegmentedToggle.vue'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useRoute: () => ({
    path: '/pokemons',
  }),
}))

describe('PokemonPage.vue', () => {
  const defaultProps = {
    items: [
      { id: 1, name: 'Bulbasaur', favorite: false },
      { id: 2, name: 'Charmander', favorite: false },
    ],
    search: '',
    isLoadingSearch: false,
    notFound: false,
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders SearchInput, ListContainer, and SegmentedToggle', () => {
    const wrapper = mount(PokemonPage, {
      props: defaultProps,
    })

    expect(wrapper.findComponent(SearchInput).exists()).toBe(true)
    expect(wrapper.findComponent(ListContainer).exists()).toBe(true)
    expect(wrapper.findComponent(SegmentedToggle).exists()).toBe(true)
  })

  it('emits update:search when SearchInput emits update:modelValue', async () => {
    const wrapper = mount(PokemonPage, {
      props: defaultProps,
    })

    const searchInput = wrapper.findComponent(SearchInput)
    await searchInput.vm.$emit('update:modelValue', 'Pikachu')

    expect(wrapper.emitted('update:search')).toBeTruthy()
    expect(wrapper.emitted('update:search')![0]).toEqual(['Pikachu'])
  })

  it('shows NotFound when notFound is true and isLoadingSearch is false', () => {
    const wrapper = mount(PokemonPage, {
      props: { ...defaultProps, notFound: true },
    })

    expect(wrapper.findComponent(NotFound).exists()).toBe(true)
  })

  it('hides NotFound when isLoadingSearch is true', () => {
    const wrapper = mount(PokemonPage, {
      props: { ...defaultProps, notFound: true, isLoadingSearch: true },
    })

    expect(wrapper.findComponent(NotFound).exists()).toBe(false)
  })

  it('emits reset when NotFound emits reset', async () => {
    const wrapper = mount(PokemonPage, {
      props: { ...defaultProps, notFound: true },
    })

    const notFound = wrapper.findComponent(NotFound)
    await notFound.vm.$emit('reset')

    expect(wrapper.emitted('update:search')).toBeTruthy()
    expect(wrapper.emitted('update:search')![0]).toEqual([''])
  })
})
