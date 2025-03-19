<template>
  <div class="fixed bottom-0 left-0 w-full bg-white p-2 flex justify-center z-50 shadow-bottom-bar">
    <div class="flex gap-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.shadow-bottom-bar {
  box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
}
</style>
