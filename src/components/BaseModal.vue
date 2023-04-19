<template>
    <Teleport to="#modal">
        <div class="bg-slate-700/25">
            <div class="">
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isModalOpen = ref(false)
</script>

<style scoped>

</style>