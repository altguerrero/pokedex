import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePokemons } from '@/composables/usePokemons'
import { getPokemons, getPokemonByName } from '@/services/pokemon.service'
import { useFavoritesStore } from '@/stores/favorites'

vi.mock('@/services/pokemon.service', () => ({
  getPokemons: vi.fn(),
  getPokemonByName: vi.fn(),
}))

vi.mock('@/stores/favorites', () => ({
  useFavoritesStore: vi.fn(),
}))

describe('usePokemons composable', () => {
  const mockFavoritesStore = {
    isFavorite: vi.fn().mockReturnValue(false),
  }

  const mockPokemons = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Charmander' },
  ]

  const mockPokemon = { id: 25, name: 'Pikachu' }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useFavoritesStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockFavoritesStore)
  })

  it('should fetch and append pokemons', async () => {
    ;(getPokemons as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockPokemons)

    const { pokemons, fetchPokemons } = usePokemons()
    await fetchPokemons()

    expect(getPokemons).toHaveBeenCalledWith(0, 20)
    expect(pokemons.value).toHaveLength(2)
    expect(pokemons.value[0]).toMatchObject({ id: 1, name: 'Bulbasaur', favorite: false })
  })

  it('should search for pokemon by name', async () => {
    ;(getPokemonByName as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockPokemon)

    const { search, displayPokemons, isLoadingSearch } = usePokemons()

    search.value = 'pikachu'
    await new Promise((r) => setTimeout(r, 600))

    expect(getPokemonByName).toHaveBeenCalledWith('pikachu')
    expect(displayPokemons.value).toHaveLength(1)
    expect(displayPokemons.value[0].name).toBe('Pikachu')
    expect(isLoadingSearch.value).toBe(false)
  })

  it('should return empty array if search fails', async () => {
    ;(getPokemonByName as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('not found'),
    )

    const { search, displayPokemons, notFound } = usePokemons()

    search.value = 'missingno'
    await new Promise((r) => setTimeout(r, 600))

    expect(displayPokemons.value).toEqual([])
    expect(notFound.value).toBe(true)
  })
})
