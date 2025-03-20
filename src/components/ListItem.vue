<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue'
import { defineProps, defineEmits } from 'vue'

interface Props {
  name: string
  isFavorite: boolean
}

defineProps<Props>()
const emit = defineEmits(['toggle', 'open'])
</script>

<template>
  <div
    class="flex items-center justify-between pl-[1.25rem] pr-[0.625rem] py-[0.5rem] rounded-lg bg-white hover:opacity-75 shadow-sm hover:shadow-md transition cursor-pointer"
    @click="emit('open')"
  >
    <span class="text-[1.375rem] font-semibold">{{ name }}</span>
    <div @click.stop>
      <FavoriteButton :isActive="isFavorite" @toggle="emit('toggle')" />
    </div>
  </div>
</template>
