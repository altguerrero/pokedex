/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, vi, expect, beforeEach } from 'vitest'
import { getPokemons, getPokemonById, getPokemonByName } from '@/services/pokemon.service'
import { api } from '@/api/instance'
import { pokemonAdapter } from '@/adapters/pokemon.adapter'

vi.mock('@/api/instance', () => ({
  api: { get: vi.fn() },
}))

vi.mock('@/adapters/pokemon.adapter', () => ({
  pokemonAdapter: vi.fn(),
}))

describe('pokemon.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getPokemons should call API with correct params and return mapped results', async () => {
    ;(api.get as any).mockResolvedValue({
      data: {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        ],
      },
    })

    const result = await getPokemons(0, 20)

    expect(api.get).toHaveBeenCalledWith('pokemon?offset=0&limit=20')
    expect(result).toEqual([
      { id: 1, name: 'bulbasaur' },
      { id: 4, name: 'charmander' },
    ])
  })

  it('getPokemonById should call API with correct id and return adapted data', async () => {
    const fakeData = { id: 1, name: 'bulbasaur' }
    ;(api.get as any).mockResolvedValue({ data: fakeData })
    ;(pokemonAdapter as any).mockReturnValue({ id: 1, name: 'bulbasaur-adapted' })

    const result = await getPokemonById(1)

    expect(api.get).toHaveBeenCalledWith('pokemon/1')
    expect(pokemonAdapter).toHaveBeenCalledWith(fakeData)
    expect(result).toEqual({ id: 1, name: 'bulbasaur-adapted' })
  })

  it('getPokemonByName should call API with correct name and return PokemonListItem', async () => {
    const fakeData = { id: 4, name: 'charmander' }
    ;(api.get as any).mockResolvedValue({ data: fakeData })
    ;(pokemonAdapter as any).mockReturnValue({ id: 4, name: 'charmander' })

    const result = await getPokemonByName('charmander')

    expect(api.get).toHaveBeenCalledWith('/pokemon/charmander')
    expect(pokemonAdapter).toHaveBeenCalledWith(fakeData)
    expect(result).toEqual({ id: 4, name: 'charmander', favorite: false })
  })
})
