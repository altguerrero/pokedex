import { computed, watch } from 'vue'
import { usePokemonList } from './usePokemonList'
import { usePokemonSearch } from './usePokemonSearch'
import { useIntersectionObserver } from './useIntersectionObserver'

export function usePokemons() {
  const { pokemons, isLoading, fetchPokemons } = usePokemonList()
  const { search, searchResult, isLoadingSearch, notFound } = usePokemonSearch()
  const { target, disconnect, connect } = useIntersectionObserver(fetchPokemons)

  watch(search, (value) => {
    if (value.trim() === '') {
      connect()
    } else {
      disconnect()
    }
  })

  const displayPokemons = computed(() => {
    if (search.value.trim() !== '' && searchResult.value) {
      return [searchResult.value]
    }
    if (search.value.trim() !== '' && !searchResult.value) {
      return []
    }
    return pokemons.value
  })

  return {
    pokemons,
    displayPokemons,
    search,
    isLoading,
    isLoadingSearch,
    fetchPokemons,
    notFound,
    target,
  }
}
