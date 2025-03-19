<template>
  <section
    class="container mx-auto h-screen flex flex-col justify-center items-center px-[1.875rem]"
  >
    <figure class="flex justify-center mb-[3.75rem]">
      <img :src="image" alt="Welcome" />
    </figure>

    <div class="text-center w-full max-w-[35.625rem]">
      <h1 class="text-[1.625rem] font-bold text-content-primary mb-[1.875rem]">
        Welcome to Pokédex
      </h1>
      <p class="text-lg font-medium text-content-secondary">
        The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
        Pokémon world.
      </p>

      <router-link to="/pokemons">
        <Button class="mt-[3.125rem]">Get started</Button>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import image from '@/assets/images/welcome.png'
import { Button } from '@/components/ui/button'
</script>
