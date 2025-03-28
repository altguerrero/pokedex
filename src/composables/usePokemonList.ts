import { ref } from 'vue'
import { getPokemons } from '@/services/pokemon.service'
import type { PokemonListItem } from '@/models/Pokemon'
import { useFavoritesStore } from '@/stores/favorites'

export function usePokemonList() {
  const favoritesStore = useFavoritesStore()
  const pokemons = ref<PokemonListItem[]>([])
  const offset = ref(0)
  const limit = 20
  const isLoading = ref(false)

  const fetchPokemons = async () => {
    if (isLoading.value) return
    isLoading.value = true
    try {
      const newPokemons = await getPokemons(offset.value, limit)
      pokemons.value.push(
        ...newPokemons.map((p) => ({
          ...p,
          favorite: favoritesStore.isFavorite(p.id),
        })),
      )
      offset.value += limit
    } finally {
      isLoading.value = false
    }
  }

  return {
    pokemons,
    isLoading,
    fetchPokemons,
  }
}
