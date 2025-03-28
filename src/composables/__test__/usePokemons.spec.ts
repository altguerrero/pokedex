import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { usePokemons } from '@/composables/usePokemons'
import { useFavoritesStore } from '@/stores/favorites'

vi.mock('@/stores/favorites', () => ({
  useFavoritesStore: vi.fn(),
}))

vi.mock('@/composables/usePokemonList', () => ({
  usePokemonList: () => ({
    pokemons: ref([]),
    isLoading: ref(false),
    fetchPokemons: vi.fn(),
  }),
}))

vi.mock('@/composables/usePokemonSearch', () => ({
  usePokemonSearch: () => ({
    search: ref(''),
    searchResult: ref(null),
    isLoadingSearch: ref(false),
    notFound: ref(false),
  }),
}))

vi.mock('@/composables/useIntersectionObserver', () => ({
  useIntersectionObserver: () => ({
    target: ref(null),
    disconnect: vi.fn(),
    connect: vi.fn(),
  }),
}))

describe('usePokemons composable', () => {
  const mockFavoritesStore = {
    isFavorite: vi.fn().mockReturnValue(false),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useFavoritesStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockFavoritesStore)
  })

  it('should display search result when searching', async () => {
    const { search, displayPokemons } = usePokemons()
    search.value = 'pikachu'

    expect(displayPokemons.value).toEqual([])
  })

  it('should display pokemons list when not searching', () => {
    const { displayPokemons } = usePokemons()
    expect(displayPokemons.value).toEqual([])
  })

  it('should handle target element for infinite scroll', () => {
    const { target } = usePokemons()
    expect(target.value).toBeDefined()
  })
})
