<script setup lang="ts">
import { Button } from './ui/button'

const emit = defineEmits(['reset'])
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl text-content-primary mb-[10px]">Uh-oh!</h1>
    <p class="font-medium text-content-secondary text-xl mb-[25px]">
      You look lost on your journey!
    </p>
    <Button @click="emit('reset')"> Go back home </Button>
  </div>
</template>
