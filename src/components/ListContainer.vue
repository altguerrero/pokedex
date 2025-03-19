<template>
  <div class="flex flex-col gap-[10px]">
    <ListItem
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :name="pokemon.name"
      :isFavorite="pokemon.favorite"
      @toggle="toggleFavorite(pokemon.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Pokemon } from '@/models/Pokemon'
import ListItem from './ListItem.vue'

const pokemons = reactive<Pokemon[]>([
  { id: 1, name: 'Bulbasaur', favorite: false },
  { id: 2, name: 'Ivysaur', favorite: false },
  { id: 3, name: 'Venusaur', favorite: false },
  { id: 4, name: 'Charmander', favorite: true },
  { id: 5, name: 'Charmeleon', favorite: false },
  { id: 6, name: 'Charizard', favorite: false },
  { id: 7, name: 'Squirtle', favorite: true },
  { id: 8, name: 'Wartortle', favorite: true },
  { id: 9, name: 'Blastoise', favorite: false },
])

const toggleFavorite = (id: number) => {
  const pokemon = pokemons.find((pokemon) => pokemon.id === id)
  if (pokemon) {
    pokemon.favorite = !pokemon.favorite
  }
}
</script>
