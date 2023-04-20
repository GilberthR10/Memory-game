<script setup lang="ts">
import { useMemoryGame } from '@/composables/useMemoryGame'
import BaseModal from './BaseModal.vue'
import JSConfetti from 'js-confetti'
import { watchEffect } from 'vue'

const { userName, points, wrongs, setOpenModalCongrats, openModalCongrats, gameOver } =
  useMemoryGame()

const jsConfetti = new JSConfetti()

const closeModal = () => {
  setOpenModalCongrats(false)
}

watchEffect(() => {
  if (gameOver.value) {
    jsConfetti.addConfetti()
  }
})
</script>

<template>
  <BaseModal @close="closeModal" v-if="openModalCongrats">
    <div class="flex flex-col space-y-10 text-emerald-600 font-semibold">
      <p class="text-center text-lg">Felicidades {{ userName }} por completar el juego</p>
      <span>Aciertos: {{ points }}</span>
      <span>Fallos: {{ wrongs }}</span>
      <button
        @click="closeModal"
        class="rounded-xl mx-auto bg-emerald-500 text-white font-bold px-6 py-2.5 mt-10 hover:opacity-75"
      >
        Cerrar
      </button>
    </div>
  </BaseModal>
</template>
