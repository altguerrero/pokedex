import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePokemonList } from '@/composables/usePokemonList'
import { getPokemons } from '@/services/pokemon.service'
import { useFavoritesStore } from '@/stores/favorites'

vi.mock('@/services/pokemon.service', () => ({
  getPokemons: vi.fn(),
}))

vi.mock('@/stores/favorites', () => ({
  useFavoritesStore: vi.fn(),
}))

describe('usePokemonList composable', () => {
  const mockFavoritesStore = {
    isFavorite: vi.fn().mockReturnValue(false),
  }

  const mockPokemons = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Charmander' },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useFavoritesStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockFavoritesStore)
  })

  it('should fetch and append pokemons', async () => {
    ;(getPokemons as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockPokemons)

    const { pokemons, fetchPokemons } = usePokemonList()
    await fetchPokemons()

    expect(getPokemons).toHaveBeenCalledWith(0, 20)
    expect(pokemons.value).toHaveLength(2)
    expect(pokemons.value[0]).toMatchObject({ id: 1, name: 'Bulbasaur', favorite: false })
  })

  it('should not fetch if already loading', async () => {
    const { isLoading, fetchPokemons } = usePokemonList()
    isLoading.value = true

    await fetchPokemons()

    expect(getPokemons).not.toHaveBeenCalled()
  })
})
