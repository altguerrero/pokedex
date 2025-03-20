import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import FavoritesView from '@/views/FavoritesView.vue'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import PokemonPage from '@/components/PokemonPage.vue'

vi.mock('@/components/PokemonPage.vue', () => ({
  default: {
    template: '<div></div>',
    props: ['items', 'search', 'notFound', 'isLoadingSearch', 'showInfiniteScroll', 'modelValue'],
    emits: ['update:search'],
  },
}))

describe('FavoritesView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders PokemonPage with favorite items', () => {
    const store = useFavoritesStore()
    store.favorites = [
      { id: 1, name: 'Bulbasaur', favorite: true },
      { id: 2, name: 'Charmander', favorite: true },
    ]

    const wrapper = shallowMount(FavoritesView)
    const pokemonPage = wrapper.findComponent(PokemonPage)
    expect(pokemonPage.exists()).toBe(true)
    expect(pokemonPage.props('items')).toHaveLength(2)
    expect(pokemonPage.props('notFound')).toBe(false)
  })

  it('filters favorites based on search', async () => {
    const store = useFavoritesStore()
    store.favorites = [
      { id: 1, name: 'Bulbasaur', favorite: true },
      { id: 2, name: 'Charmander', favorite: true },
    ]

    const wrapper = shallowMount(FavoritesView)
    const pokemonPage = wrapper.findComponent(PokemonPage)

    await pokemonPage.vm.$emit('update:search', 'bulb')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(PokemonPage).props('items')).toEqual([
      { id: 1, name: 'Bulbasaur', favorite: true },
    ])
    expect(wrapper.findComponent(PokemonPage).props('notFound')).toBe(false)
  })

  it('shows notFound when no match is found', async () => {
    const store = useFavoritesStore()
    store.favorites = [{ id: 1, name: 'Bulbasaur', favorite: true }]

    const wrapper = shallowMount(FavoritesView)
    const pokemonPage = wrapper.findComponent(PokemonPage)

    await pokemonPage.vm.$emit('update:search', 'pikachu')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(PokemonPage).props('items')).toEqual([])
    expect(wrapper.findComponent(PokemonPage).props('notFound')).toBe(true)
  })
})
