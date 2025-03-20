import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePokemonDetail } from '../usePokemonDetail'
import { getPokemonById } from '@/services/pokemon.service'

vi.mock('@/services/pokemon.service', () => ({
  getPokemonById: vi.fn(),
}))

describe('usePokemonDetail composable', () => {
  const mockPokemon = {
    id: 1,
    name: 'Bulbasaur',
    image: '',
    weight: 69,
    height: 7,
    types: 'grass, poison',
    favorite: false,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have initial state', () => {
    const { pokemon, isLoading } = usePokemonDetail()
    expect(pokemon.value).toBe(null)
    expect(isLoading.value).toBe(false)
  })

  it('should fetch and set pokemon details', async () => {
    ;(getPokemonById as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockPokemon)

    const { pokemon, isLoading, fetchPokemon } = usePokemonDetail()
    const promise = fetchPokemon(1)

    expect(isLoading.value).toBe(true)
    await promise
    expect(isLoading.value).toBe(false)
    expect(pokemon.value).toEqual(mockPokemon)
    expect(getPokemonById).toHaveBeenCalledWith(1)
  })

  it('should reset pokemon', () => {
    const { pokemon, reset } = usePokemonDetail()
    pokemon.value = mockPokemon
    reset()
    expect(pokemon.value).toBe(null)
  })
})
