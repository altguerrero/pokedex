<template>
  <div
    class="flex items-center justify-between pl-[1.25rem] pr-[0.625rem] py-[0.5rem] rounded-lg bg-white shadow-sm transition"
  >
    <span class="text-[1.375rem] font-semibold">{{ name }}</span>
    <FavoriteButton :isActive="isFavorite" @toggle="emitToggle" />
  </div>
</template>

<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue'
import { defineProps, defineEmits } from 'vue'

interface Props {
  name: string
  isFavorite: boolean
}

defineProps<Props>()
const emit = defineEmits(['toggle'])

const emitToggle = () => {
  emit('toggle')
}
</script>
