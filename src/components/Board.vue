<script setup lang="ts">
import JSConfetti from 'js-confetti'
import Card from "./Card.vue";
import { useMemoryGame } from "@/composables/useMemoryGame";
import { watch } from 'vue';
import CardLoader from "./CardLoader.vue";

const {
  cards,
  points,
  gameBoard,
  handleChoice,
  newGame,
  wrongs,
  choiceOne,
  choiceTwo,
  disabled,
  isLoading,
  allMatched
} = useMemoryGame();

const handleNewGame = () => {
  newGame();
};


const jsConfetti = new JSConfetti()

const checkIfAllMatched = () => {
  if (allMatched.value) {
    jsConfetti.addConfetti()
  }
}
watch(allMatched, checkIfAllMatched);

</script>

<template>
  <div class="h-screen w-full flex flex-col place-content-center">
    <div class="flex justify-around mb-9">
      <div class="text-2xl text-emerald-500 font-bold">
        Points: {{ points }}
      </div>
      <div class="text-2xl text-emerald-500 font-bold">Gilberth</div>
      <div class="text-2xl text-emerald-500 font-bold">
        Wrongs: {{ wrongs }}
      </div>
    </div>

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
      <Card
        :disabled="disabled || card === choiceOne"
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
      New game
    </button>
  </div>
</template>
