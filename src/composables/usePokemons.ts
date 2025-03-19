import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { getPokemons, getPokemonByName } from '@/services/pokemon.service'
import type { PokemonListItem } from '@/models/Pokemon'
import { useFavoritesStore } from '@/stores/favorites'

export function usePokemons() {
  const favoritesStore = useFavoritesStore()

  const pokemons = ref<PokemonListItem[]>([])
  const offset = ref(0)
  const limit = 20
  const isLoading = ref(false)
  const search = ref('')
  const searchResult = ref<PokemonListItem | null>(null)
  const isLoadingSearch = ref(false)

  const target = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

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

  const initObserver = () => {
    if (observer) observer.disconnect()

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && search.value.trim() === '') {
          fetchPokemons()
        }
      },
      { threshold: 1 },
    )

    if (target.value) observer.observe(target.value)
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  watch(search, (value) => {
    if (observer) {
      if (value.trim() === '') {
        observer.observe(target.value!)
      } else {
        observer.disconnect()
      }
    }
  })

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

  const displayPokemons = computed(() => {
    if (search.value.trim() !== '' && searchResult.value) {
      return [searchResult.value]
    }
    if (search.value.trim() !== '' && !searchResult.value) {
      return []
    }
    return pokemons.value
  })

  const notFound = computed(() => {
    return search.value.trim() !== '' && !searchResult.value
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
