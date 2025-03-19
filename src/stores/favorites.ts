import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { PokemonListItem } from '@/models/Pokemon'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<PokemonListItem[]>([])

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('favorites')
    if (data) {
      favorites.value = JSON.parse(data)
    }
  }

  watch(
    favorites,
    (newFavorites) => {
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    },
    {
      deep: true,
    },
  )

  const toggleFavorite = (pokemon: PokemonListItem) => {
    const index = favorites.value.findIndex((p) => p.id === pokemon.id)
    if (index >= 0) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push({ ...pokemon, favorite: true })
    }
  }

  const isFavorite = (id: number) => favorites.value.some((p) => p.id === id)

  loadFromLocalStorage()

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
})
