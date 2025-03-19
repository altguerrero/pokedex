import type { PokemonAPIListResponse, PokemonAPI } from '@/models/PokemonAPI'
import type { Pokemon, PokemonListItem } from '@/models/Pokemon'
import { api } from '@/api/instance'
import { pokemonAdapter } from '@/adapters/pokemon.adapter'

export const getPokemons = async (
  offset = 0,
  limit = 20,
): Promise<{ id: number; name: string }[]> => {
  const { data } = await api.get<PokemonAPIListResponse>(`pokemon?offset=${offset}&limit=${limit}`)

  return data.results.map((p) => {
    const id = Number(p.url.split('/').filter(Boolean).pop())
    return { id, name: p.name }
  })
}

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  const { data } = await api.get<PokemonAPI>(`pokemon/${id}`)
  return pokemonAdapter(data)
}

export const getPokemonByName = async (name: string): Promise<PokemonListItem> => {
  const { data } = await api.get<PokemonAPI>(`/pokemon/${name}`)
  const adapted = pokemonAdapter(data)

  return {
    id: adapted.id,
    name: adapted.name,
    favorite: false,
  }
}
