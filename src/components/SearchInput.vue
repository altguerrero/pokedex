<template>
  <div
    class="flex items-center gap-[0.625rem] rounded-lg bg-white px-[0.9375rem] py-[0.8125rem] shadow-custom-search"
  >
    <IconSearch class="w-[1.125rem] h-[1.125rem] text-content-disabled" />
    <input
      type="text"
      v-model="search"
      class="flex-1 outline-none bg-transparent text-base font-semibold placeholder-content-disabled text-content-primary"
      placeholder="Search"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import IconSearch from './icons/IconSearch.vue'

const emit = defineEmits<{
  (event: 'search', value: string): void
}>()

const search = ref('')
const onInput = () => emit('search', search.value)
</script>

<style scoped>
.shadow-custom-search {
  box-shadow: 0px 2px 10px #0000000a;
}
</style>
