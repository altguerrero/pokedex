<script setup lang="ts">
import { ref, computed } from 'vue'
import PokemonsPage from '@/components/PokemonPage.vue'
import { useFavoritesStore } from '@/stores/favorites'

const store = useFavoritesStore()
const search = ref('')

const filteredFavorites = computed(() =>
  store.favorites.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase())),
)
</script>

<template>
  <PokemonsPage
    :items="filteredFavorites"
    :showInfiniteScroll="false"
    v-model:search="search"
    :notFound="filteredFavorites.length === 0 && !!search"
    :isLoadingSearch="false"
  />
</template>
