<template>
  <Button
    @click="toggle"
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
import { ref } from 'vue'
import IconStar from './icons/IconStar.vue'
import { Button } from './ui/button'

const isActive = ref(false)

const toggle = () => {
  isActive.value = !isActive.value
}
</script>
