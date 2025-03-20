import { describe, it, expect } from 'vitest'
import { pokemonAdapter } from '@/adapters/pokemon.adapter'
import type { PokemonAPI } from '@/models/PokemonAPI'

describe('pokemonAdapter', () => {
  it('should correctly adapt PokemonAPI data to Pokemon', () => {
    const apiData: PokemonAPI = {
      id: 25,
      name: 'pikachu',
      weight: 60,
      height: 4,
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://example.com/pikachu.png',
          },
        },
        front_default: '',
      },
      types: [{ slot: 1, type: { name: 'electric' } }],
    }

    const result = pokemonAdapter(apiData)

    expect(result).toEqual({
      id: 25,
      name: 'pikachu',
      image: 'https://example.com/pikachu.png',
      weight: 60,
      height: 4,
      types: 'electric',
      favorite: false,
    })
  })

  it('should join multiple types correctly', () => {
    const apiData: PokemonAPI = {
      id: 6,
      name: 'charizard',
      weight: 905,
      height: 17,
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://example.com/charizard.png',
          },
        },
        front_default: '',
      },
      types: [
        { slot: 1, type: { name: 'fire' } },
        { slot: 2, type: { name: 'flying' } },
      ],
    }

    const result = pokemonAdapter(apiData)

    expect(result.types).toBe('fire, flying')
  })
})
