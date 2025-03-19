<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { usePokemons } from '@/composables/usePokemons'
import { useLoader } from '@/composables/useLoader'
import PokemonPage from '@/components/PokemonPage.vue'
import PokeballLoader from '@/components/PokeballLoader.vue'

const { displayPokemons, search, fetchPokemons, isLoading, target, isLoadingSearch, notFound } =
  usePokemons()
const { isVisible, show, hide } = useLoader()

onMounted(async () => {
  show()
  await fetchPokemons()
})

watch(isVisible, (visible) => {
  document.body.style.overflow = visible ? 'hidden' : ''
})

watch(isLoading, (loading) => {
  if (!loading) {
    hide()
  }
})
</script>

<template>
  <transition name="fade-scale">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <PokeballLoader />
    </div>
  </transition>

  <PokemonPage
    v-if="!isVisible"
    v-model:search="search"
    :items="displayPokemons"
    :isLoadingSearch="isLoadingSearch"
    :notFound="notFound"
  />

  <div ref="target" class="h-[1px]"></div>
</template>
