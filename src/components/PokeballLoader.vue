<script setup lang="ts">
import IconLoader from './icons/IconLoader.vue'

defineProps<{ size?: 'small' | 'default' }>()
</script>

<template>
  <div class="relative flex items-center justify-center">
    <div :data-testid="'scale-wrapper'" :class="[size === 'small' ? 'scale-[0.2]' : 'scale-100']">
      <IconLoader class="animate-pokeball" />
      <span
        class="absolute inset-0 mx-auto my-auto w-[25px] h-[25px] bg-red-600 rounded-full animate-blink border-2 border-white"
      ></span>
    </div>
  </div>
</template>

<style scoped>
@keyframes pokeball {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  50% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-pokeball {
  animation: pokeball 1.2s infinite ease-in-out;
  transform-origin: center;
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
