<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import PokeballLoader from '@/components/PokeballLoader.vue'

const emit = defineEmits(['update:modelValue'])
defineProps<{ modelValue: string; isLoading?: boolean }>()
</script>

<template>
  <div
    class="relative flex items-center gap-[0.625rem] rounded-lg bg-white px-[0.9375rem] py-[0.8125rem] shadow-custom-search"
  >
    <IconSearch class="w-[1.125rem] h-[1.125rem] text-content-disabled" />
    <input
      type="text"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value || '')"
      class="flex-1 outline-none bg-transparent text-base font-semibold placeholder-content-disabled text-content-primary"
      placeholder="Search"
    />

    <div v-if="isLoading" class="absolute right-0 translate-x-7">
      <PokeballLoader size="small" />
    </div>
  </div>
</template>

<style scoped>
.shadow-custom-search {
  box-shadow: 0px 2px 10px #0000000a;
}
</style>
