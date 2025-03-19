<template>
  <div class="flex flex-col gap-[0.625rem]">
    <ListItem
      v-for="pokemon in pokemons || []"
      :key="pokemon.id"
      :name="pokemon.name"
      :isFavorite="store.isFavorite(pokemon.id)"
      @toggle="toggleFavorite(pokemon)"
      @open="openModal(pokemon.id)"
    />

    <PokemonModal
      v-if="selectedPokemon"
      :open="modalOpen"
      :pokemon="selectedPokemon"
      @close="closeModal"
      @toggle="toggleFavorite(selectedPokemon)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PokemonListItem, Pokemon } from '@/models/Pokemon'
import ListItem from './ListItem.vue'
import PokemonModal from './PokemonModal.vue'
import { getPokemonById } from '@/services/pokemon.service'
import { useFavoritesStore } from '@/stores/favorites'

defineProps<{
  pokemons: PokemonListItem[]
}>()

const store = useFavoritesStore()

const modalOpen = ref(false)
const selectedPokemon = ref<Pokemon | null>(null)

const toggleFavorite = (pokemon: PokemonListItem) => {
  store.toggleFavorite(pokemon)
}

const openModal = async (id: number) => {
  const pokemonDetail = await getPokemonById(id)
  selectedPokemon.value = pokemonDetail
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedPokemon.value = null
}
</script>
