<script setup lang="ts">
import background from '@/assets/images/background-cover.png'
import FavoriteButton from './FavoriteButton.vue'
import { Button } from './ui/button'
import { defineProps, defineEmits } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'

interface Props {
  name: string
  image: string
  weight: number
  height: number
  types: string
  isFavorite: boolean
}

const props = defineProps<Props>()

const { toast } = useToast()

const shareInfo = () => {
  const text = `Name: ${props.name}, Weight: ${props.weight}, Height: ${props.height}, Types: ${props.types.split(', ').join(' - ')}`
  navigator.clipboard.writeText(text)
  toast({
    title: 'Copied!',
    description: 'The Pokémon info has been copied to clipboard.',
    class: 'bg-green-100 border border-green-400 text-green-800',
  })
}

const emit = defineEmits(['toggle'])
</script>

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
      <p class="pb-[0.625rem] border-b border-state-border capitalize">
        <strong>Name:</strong> {{ name }}
      </p>
      <p class="pb-[0.625rem] border-b border-state-border">
        <strong>Weight:</strong> {{ weight }}
      </p>
      <p class="pb-[0.625rem] border-b border-state-border">
        <strong>Height:</strong> {{ height }}
      </p>
      <p class="pb-[0.625rem] border-b border-state-border capitalize">
        <strong>Types:</strong> {{ types }}
      </p>
    </div>

    <div class="py-[1.25rem] px-[1.875rem] flex items-center justify-between gap-4">
      <Button @click="shareInfo">Share to my friends</Button>
      <FavoriteButton :isActive="isFavorite" @toggle="emit('toggle')" />
    </div>
  </div>
</template>
