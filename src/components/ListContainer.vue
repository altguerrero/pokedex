<template>
  <div class="flex flex-col gap-[0.625rem]">
    <ListItem
      v-for="pokemon in pokemons || []"
      :key="pokemon.id"
      :name="pokemon.name"
      :isFavorite="pokemon.favorite"
      @toggle="toggleFavorite(pokemon.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { PokemonListItem } from '@/models/Pokemon'
import ListItem from './ListItem.vue'

const props = defineProps<{
  pokemons: PokemonListItem[]
}>()

const toggleFavorite = (id: number) => {
  const pokemon = props.pokemons.find((p) => p.id === id)
  if (pokemon) {
    pokemon.favorite = !pokemon.favorite
  }
}

watch(
  () => props.pokemons.map((p) => ({ id: p.id, favorite: p.favorite })),
  (newVal) => {
    const favorites = newVal.filter((p) => p.favorite).map((p) => p.id)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },
  { deep: true },
)
</script>
