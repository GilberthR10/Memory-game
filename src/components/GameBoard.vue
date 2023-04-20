<script setup lang="ts">
import ImageCard from './ImageCard.vue'
import { useMemoryGame } from '@/composables/useMemoryGame'
import CardLoader from './CardLoader.vue'
import ModalFormUserName from './ModalFormUserName.vue'
import ModalCongrats from './ModalCongrats.vue'

const {
  cards,
  points,
  gameBoard,
  wrongs,
  choiceOne,
  choiceTwo,
  disabled,
  isLoading,
  userName,
  handleChoice,
  newGame
} = useMemoryGame()

const handleNewGame = () => {
  newGame()
}
</script>

<template>
  <div class="h-screen w-full flex flex-col place-content-center">
    <div class="flex justify-around mb-9">
      <div class="text-2xl text-emerald-500 font-bold">Aciertos: {{ points }}</div>
      <div class="text-2xl text-emerald-500 font-bold">{{ userName }}</div>
      <div class="text-2xl text-emerald-500 font-bold">Fallos: {{ wrongs }}</div>
    </div>
    <ModalFormUserName />
    <ModalCongrats />
    <section
      v-if="isLoading"
      class="grid grid-cols-3 md:grid-auto-fit-[10rem] grid-flow-row gap-3 max-w-3xl md:gap-8 md:p-1 mx-auto"
    >
      <CardLoader :loopLoader="gameBoard * 2" />
    </section>

    <section
      v-else
      class="grid grid-cols-3 md:grid-auto-fit-[10rem] grid-flow-row gap-3 max-w-3xl md:gap-8 md:p-1 mx-auto"
    >
      <image-card
        :disabled="disabled || card === choiceOne || card.matched"
        :flip="card === choiceOne || card === choiceTwo || card.matched"
        :card="card"
        v-for="card in cards"
        :key="card.uuid"
        @selected-card="handleChoice"
      />
    </section>

    <button
      @click="handleNewGame"
      class="rounded-xl mx-auto bg-emerald-500 text-white px-6 py-2.5 mt-10 hover:opacity-75"
    >
      Nuevo Juego
    </button>
  </div>
</template>
