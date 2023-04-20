<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="bg-slate-900/50 fixed w-screen h-screen inset-0 flex justify-center items-center">
        <div class="relative rounded-2xl shadow-xl bg-slate-100 p-10" ref="target">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useMemoryGame } from '@/composables/useMemoryGame'

const { userName } = useMemoryGame()

const emit = defineEmits(['close'])

const target = ref(null)
if (userName) {
  onClickOutside(target, () => emit('close'))
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
