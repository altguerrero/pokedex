<script setup lang="ts">
import type { Pokemon } from '@/models/Pokemon'
import { defineProps, defineEmits } from 'vue'

import IconClose from './icons/IconClose.vue'
import PokemonCard from './PokemonCard.vue'
import Dialog from './ui/dialog/UiDialog.vue'
import DialogContent from './ui/dialog/DialogContent.vue'
import { useFavoritesStore } from '@/stores/favorites'

const store = useFavoritesStore()

interface Props {
  open: boolean
  pokemon: Pokemon
}

defineProps<Props>()
const emit = defineEmits(['close', 'toggle'])
</script>

<template>
  <Dialog :open="open" @update:open="emit('close')">
    <DialogContent class="p-0 w-[19.688rem] md:w-[31.625rem] border-none rounded-xl">
      <div
        data-testid="close-icon"
        class="w-[26px] h-[26px] absolute top-[15px] right-[15px] z-50 text-white cursor-pointer hover:text-action-primary transition"
        @click="emit('close')"
      >
        <IconClose />
      </div>

      <PokemonCard
        :name="pokemon.name"
        :image="pokemon.image"
        :weight="pokemon.weight"
        :height="pokemon.height"
        :types="pokemon.types"
        :isFavorite="store.isFavorite(pokemon.id)"
        @toggle="emit('toggle')"
      />
    </DialogContent>
  </Dialog>
</template>
