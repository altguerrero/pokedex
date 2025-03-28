import { ref, watch, computed } from 'vue'
import { getPokemonByName } from '@/services/pokemon.service'
import type { PokemonListItem } from '@/models/Pokemon'
import { useFavoritesStore } from '@/stores/favorites'

export function usePokemonSearch() {
  const favoritesStore = useFavoritesStore()
  const search = ref('')
  const searchResult = ref<PokemonListItem | null>(null)
  const isLoadingSearch = ref(false)

  let debounceTimeout: ReturnType<typeof setTimeout>
  watch(search, (value) => {
    isLoadingSearch.value = true
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(async () => {
      if (value.trim() === '') {
        searchResult.value = null
        isLoadingSearch.value = false
        return
      }
      try {
        const result = await getPokemonByName(value.trim().toLowerCase())
        searchResult.value = {
          ...result,
          favorite: favoritesStore.isFavorite(result.id),
        }
      } catch {
        searchResult.value = null
      } finally {
        isLoadingSearch.value = false
      }
    }, 500)
  })

  const notFound = computed(() => {
    return search.value.trim() !== '' && !searchResult.value
  })

  return {
    search,
    searchResult,
    isLoadingSearch,
    notFound,
  }
}
