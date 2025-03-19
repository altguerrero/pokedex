import type { PokemonAPI } from '@/models/PokemonAPI'
import type { Pokemon } from '@/models/Pokemon'

export const pokemonAdapter = (data: PokemonAPI): Pokemon => ({
  id: data.id,
  name: data.name,
  image: data.sprites.other['official-artwork'].front_default,
  weight: data.weight,
  height: data.height,
  types: data.types.map((t) => t.type.name).join(', '),
  favorite: false,
})
