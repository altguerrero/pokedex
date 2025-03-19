<script setup lang="ts">
import { BottomBar } from './ui/bottomBar'
import { Button } from './ui/button'

import IconList from './icons/IconList.vue'
import IconStar from './icons/IconStar.vue'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <BottomBar>
    <Button
      @click="goTo('/pokemons')"
      :class="[
        'w-[9.375rem]',
        route.path === '/pokemons'
          ? 'hover:bg-action-primary cursor-default'
          : 'bg-content-disabled ',
      ]"
    >
      <IconList />
      All
    </Button>

    <Button
      @click="goTo('/favorites')"
      :class="[
        'w-[9.375rem]',
        route.path === '/favorites'
          ? 'hover:bg-action-primary cursor-default'
          : 'bg-content-disabled ',
      ]"
    >
      <IconStar />
      Favorites
    </Button>
  </BottomBar>
</template>
