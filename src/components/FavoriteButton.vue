<template>
  <Button
    @click="emit('toggle')"
    variant="outline"
    size="icon"
    :class="[
      'w-11 h-11 bg-state-surface hover:bg-state-surface border-none hover:opacity-70',
      isActive
        ? 'text-action-accent hover:text-action-accent'
        : 'text-content-disabled hover:text-content-disabled',
    ]"
  >
    <IconStar />
  </Button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import IconStar from './icons/IconStar.vue'
import { Button } from './ui/button'

defineProps<{ isActive: boolean }>()
const emit = defineEmits(['toggle'])
</script>
