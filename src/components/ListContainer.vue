<script setup lang="ts">
import type { PokemonListItem } from '@/models/Pokemon'
import { ref } from 'vue'
import ListItem from './ListItem.vue'
import PokemonModal from './PokemonModal.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { usePokemonDetail } from '@/composables/usePokemonDetail'

defineProps<{
  pokemons: PokemonListItem[]
}>()

const store = useFavoritesStore()

const modalOpen = ref(false)
const { pokemon, fetchPokemon, reset } = usePokemonDetail()

const toggleFavorite = (pokemon: PokemonListItem) => {
  store.toggleFavorite(pokemon)
}

const openModal = async (id: number) => {
  await fetchPokemon(id)
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  reset()
}
</script>

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
      v-if="pokemon"
      :open="modalOpen"
      :pokemon="pokemon"
      @close="closeModal"
      @toggle="toggleFavorite(pokemon)"
    />
  </div>
</template>
