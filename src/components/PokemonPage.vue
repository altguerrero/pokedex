<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
import ListContainer from '@/components/ListContainer.vue'
import SegmentedToggle from '@/components/SegmentedToggle.vue'
import type { PokemonListItem } from '@/models/Pokemon'
import NotFound from './NotFound.vue'

const props = withDefaults(
  defineProps<{
    items: PokemonListItem[]
    search: string
    isLoadingSearch: boolean
    notFound: boolean
  }>(),
  {
    items: () => [],
  },
)

const emit = defineEmits(['update:search'])
</script>

<template>
  <section
    class="container mx-auto px-[1.875rem] py-[2.1875rem] space-y-10 pb-20 max-w-[35.625rem]"
  >
    <SearchInput
      :modelValue="props.search"
      @update:modelValue="emit('update:search', $event)"
      :isLoading="props.isLoadingSearch"
    />

    <NotFound v-if="props.notFound && !isLoadingSearch" @reset="emit('update:search', '')" />

    <ListContainer :pokemons="props.items" />

    <SegmentedToggle />
  </section>
</template>
