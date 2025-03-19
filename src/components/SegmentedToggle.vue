<script setup lang="ts">
import { BottomBar } from './ui/bottomBar'
import { Button } from './ui/button'

import IconList from './icons/IconList.vue'
import IconStar from './icons/IconStar.vue'
</script>

<template>
  <BottomBar>
    <Button class="w-[150px]">
      <IconList />
      All
    </Button>
    <Button class="w-[150px]">
      <IconStar />
      Favorites
    </Button>
  </BottomBar>
</template>
