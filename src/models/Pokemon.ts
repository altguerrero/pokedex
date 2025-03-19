export interface Pokemon {
  id: number
  name: string
  image: string
  weight: number
  height: number
  types: string
  favorite: boolean
}

export type PokemonListItem = Pick<Pokemon, 'id' | 'name'> & { favorite: boolean }
