<template>
  <div class="rounded-[0.3125rem] overflow-hidden bg-white w-full">
    <div
      class="relative w-full h-[13.75rem] bg-cover bg-center"
      :style="{ backgroundImage: `url(${background})` }"
    >
      <img
        :src="image"
        :alt="name"
        class="absolute mx-auto my-auto inset-0 h-[11.25rem] object-contain"
      />
    </div>

    <div
      class="px-[1.875rem] py-[1.25rem] flex flex-col gap-[0.625rem] text-[1.125rem] text-content-secondary"
    >
      <p class="pb-[0.625rem] border-b border-state-border"><strong>Name:</strong> {{ name }}</p>
      <p class="pb-[0.625rem] border-b border-state-border">
        <strong>Weight:</strong> {{ weight }}
      </p>
      <p class="pb-[0.625rem] border-b border-state-border">
        <strong>Height:</strong> {{ height }}
      </p>
      <p class="pb-[0.625rem] border-b border-state-border"><strong>Types:</strong> {{ types }}</p>
    </div>

    <div class="py-[1.25rem] px-[1.875rem] flex items-center justify-between gap-4">
      <Button>Share to my friends</Button>
      <FavoriteButton :isActive="isFavorite" />
    </div>
  </div>
</template>

<script setup lang="ts">
import background from '@/assets/images/background-cover.png'
import FavoriteButton from './FavoriteButton.vue'
import { Button } from './ui/button'

interface Props {
  name: string
  image: string
  weight: string
  height: string
  types: string
  isFavorite: boolean
}

defineProps<Props>()
</script>
