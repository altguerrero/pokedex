export interface PokemonAPIListResponse {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

export interface PokemonAPI {
  id: number
  name: string
  weight: number
  height: number
  sprites: { front_default: string }
  types: { slot: number; type: { name: string } }[]
}
