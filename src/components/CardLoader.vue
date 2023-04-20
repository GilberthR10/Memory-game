<template>
  <article v-for="n in loopLoader" :key="n">
    <div class="animate-pulse bg-emerald-300 h-44 rounded-3xl w-full"></div>
  </article>
</template>

<script setup lang="ts">
defineProps({
  loopLoader: {
    type: Number,
    default: 1
  }
})
</script>
