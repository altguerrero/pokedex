import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import ListContainer from '@/components/ListContainer.vue'
import ListItem from '@/components/ListItem.vue'
import { useFavoritesStore } from '@/stores/favorites'
import PokemonModal from '@/components/PokemonModal.vue'
import { flushPromises } from '@vue/test-utils'

vi.mock('@/services/pokemon.service', () => ({
  getPokemonById: vi.fn(() =>
    Promise.resolve({
      id: 1,
      name: 'Bulbasaur',
      image: '',
      weight: 69,
      height: 7,
      types: 'grass, poison',
      favorite: false,
    }),
  ),
}))

const pokemons = [
  { id: 1, name: 'Bulbasaur', favorite: false },
  { id: 2, name: 'Charmander', favorite: false },
]

describe('ListContainer.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders ListItem components', () => {
    const wrapper = mount(ListContainer, {
      props: { pokemons },
    })

    const listItems = wrapper.findAllComponents(ListItem)
    expect(listItems.length).toBe(2)
  })

  it('opens modal when ListItem emits open event', async () => {
    const wrapper = mount(ListContainer, {
      props: { pokemons },
    })

    const listItem = wrapper.findComponent(ListItem)
    await listItem.vm.$emit('open', 1)

    await flushPromises()

    expect(wrapper.findComponent(PokemonModal).exists()).toBe(true)
  })

  it('calls store.toggleFavorite when ListItem emits toggle', async () => {
    const store = useFavoritesStore()
    const spy = vi.spyOn(store, 'toggleFavorite')

    const wrapper = mount(ListContainer, {
      props: { pokemons },
    })

    const listItem = wrapper.findComponent(ListItem)
    await listItem.vm.$emit('toggle', pokemons[0])

    expect(spy).toHaveBeenCalledWith(pokemons[0])
  })
})
