import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { ref } from 'vue'

vi.mock('@/composables/usePokemons', () => ({
  usePokemons: () => ({
    displayPokemons: ref([]),
    search: ref(''),
    fetchPokemons: vi.fn(),
    isLoading: ref(false),
    target: ref(null),
    isLoadingSearch: ref(false),
    notFound: ref(false),
  }),
}))

describe('PokemonListView.vue', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders PokeballLoader when isVisible is true', async () => {
    vi.doMock('@/composables/useLoader', () => ({
      useLoader: () => ({
        isVisible: ref(true),
        show: vi.fn(),
        hide: vi.fn(),
      }),
    }))

    const { default: PokemonListView } = await import('../PokemonListView.vue')
    const wrapper = shallowMount(PokemonListView)
    expect(wrapper.findComponent({ name: 'PokeballLoader' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'PokemonPage' }).exists()).toBe(false)
  })

  it('renders PokemonPage when isVisible is false', async () => {
    vi.doMock('@/composables/useLoader', () => ({
      useLoader: () => ({
        isVisible: ref(false),
        show: vi.fn(),
        hide: vi.fn(),
      }),
    }))

    const { default: PokemonListView } = await import('../PokemonListView.vue')
    const wrapper = shallowMount(PokemonListView)
    expect(wrapper.findComponent({ name: 'PokeballLoader' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'PokemonPage' }).exists()).toBe(true)
  })

  it('passes props correctly to PokemonPage', async () => {
    vi.doMock('@/composables/useLoader', () => ({
      useLoader: () => ({
        isVisible: ref(false),
        show: vi.fn(),
        hide: vi.fn(),
      }),
    }))

    const { default: PokemonListView } = await import('../PokemonListView.vue')
    const wrapper = shallowMount(PokemonListView)
    const page = wrapper.findComponent({ name: 'PokemonPage' })
    expect(page.exists()).toBe(true)
    expect(page.props()).toMatchObject({
      items: [],
      search: '',
      isLoadingSearch: false,
      notFound: false,
    })
  })
})
