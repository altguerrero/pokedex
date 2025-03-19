import { ref } from 'vue'
import { getPokemonById } from '@/services/pokemon.service'
import type { Pokemon } from '@/models/Pokemon'

export function usePokemonDetail() {
  const pokemon = ref<Pokemon | null>(null)
  const isLoading = ref(false)

  const fetchPokemon = async (id: number) => {
    isLoading.value = true
    try {
      pokemon.value = await getPokemonById(id)
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    pokemon.value = null
  }

  return {
    pokemon,
    isLoading,
    fetchPokemon,
    reset,
  }
}
