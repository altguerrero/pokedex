<template>
  <Dialog :open="open" @update:open="emit('close')">
    <DialogContent class="p-0 w-[19.688rem] md:w-[31.625rem] border-none rounded-xl">
      <div
        class="w-[26px] h-[26px] absolute top-[15px] right-[15px] z-50 text-white cursor-pointer hover:text-action-primary transition"
        @click="emit('close')"
      >
        <IconClose />
      </div>

      <PokemonCard
        :name="name"
        :image="image"
        :weight="weight"
        :height="height"
        :types="types"
        :isFavorite="isFavorite"
      />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

import IconClose from './icons/IconClose.vue'
import PokemonCard from './PokemonCard.vue'
import Dialog from './ui/dialog/UiDialog.vue'
import DialogContent from './ui/dialog/DialogContent.vue'

interface Props {
  open: boolean
  name: string
  image: string
  weight: string
  height: string
  types: string
  isFavorite: boolean
}

defineProps<Props>()
const emit = defineEmits(['close'])
</script>
