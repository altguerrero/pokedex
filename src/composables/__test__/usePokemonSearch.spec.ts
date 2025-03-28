import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePokemonSearch } from '@/composables/usePokemonSearch'
import { getPokemonByName } from '@/services/pokemon.service'
import { useFavoritesStore } from '@/stores/favorites'

vi.mock('@/services/pokemon.service', () => ({
  getPokemonByName: vi.fn(),
}))

vi.mock('@/stores/favorites', () => ({
  useFavoritesStore: vi.fn(),
}))

describe('usePokemonSearch composable', () => {
  const mockFavoritesStore = {
    isFavorite: vi.fn().mockReturnValue(false),
  }

  const mockPokemon = { id: 25, name: 'Pikachu' }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useFavoritesStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockFavoritesStore)
  })

  it('should search for pokemon by name', async () => {
    ;(getPokemonByName as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockPokemon)

    const { search, searchResult, isLoadingSearch } = usePokemonSearch()

    search.value = 'pikachu'
    await new Promise((r) => setTimeout(r, 600))

    expect(getPokemonByName).toHaveBeenCalledWith('pikachu')
    expect(searchResult.value).toMatchObject({ id: 25, name: 'Pikachu', favorite: false })
    expect(isLoadingSearch.value).toBe(false)
  })

  it('should handle search failure', async () => {
    ;(getPokemonByName as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('not found'),
    )

    const { search, searchResult, notFound } = usePokemonSearch()

    search.value = 'missingno'
    await new Promise((r) => setTimeout(r, 600))

    expect(searchResult.value).toBeNull()
    expect(notFound.value).toBe(true)
  })

  it('should clear search when input is empty', async () => {
    const { search, searchResult } = usePokemonSearch()

    search.value = 'pikachu'
    await new Promise((r) => setTimeout(r, 600))
    expect(searchResult.value).toBeDefined()

    search.value = ''
    await new Promise((r) => setTimeout(r, 600))
    expect(searchResult.value).toBeNull()
  })
})
