<script setup lang="ts">
import Card from "./Card.vue";
import { useMemoryGame } from "@/composables/useMemoryGame";
import { onMounted } from 'vue';



const cardImages = [
  {
    url: "https://cloud.modyocdn.com/uploads/4a1b66ba-ba4e-438d-be40-d9960818e06a/original/bear.jpg",
    tags: [],
    uuid: "4a1b66ba-ba4e-438d-be40-d9960818e06a",
    title: "Bear",
    alt_text: null,
    description: null,
    content_type: "image/jpeg",
  },
  {
    url: "https://cloud.modyocdn.com/uploads/651e2381-dc33-43fc-8762-58079ffb36d1/original/bird.jpg",
    tags: [],
    uuid: "651e2381-dc33-43fc-8762-58079ffb36d1",
    title: "Bird",
    alt_text: null,
    description: null,
    content_type: "image/jpeg",
  },
  {
    url: "https://cloud.modyocdn.com/uploads/85360c7a-90f1-49ce-b6a0-994543a3cfad/original/cat.jpg",
    tags: [],
    uuid: "85360c7a-90f1-49ce-b6a0-994543a3cfad",
    title: "Cat",
    alt_text: null,
    description: null,
    content_type: "image/jpeg",
  },
  {
    url: "https://cloud.modyocdn.com/uploads/1072dca9-1c9b-4a76-abfb-1d70d7dd861b/original/deer.jpg",
    tags: [],
    uuid: "1072dca9-1c9b-4a76-abfb-1d70d7dd861b",
    title: "Deer",
    alt_text: null,
    description: null,
    content_type: "image/jpeg",
  },
  {
    url: "https://cloud.modyocdn.com/uploads/92f02ec1-c85d-4718-9cd0-2618872d657d/original/dog.jpg",
    tags: [],
    uuid: "92f02ec1-c85d-4718-9cd0-2618872d657d",
    title: "Dog",
    alt_text: null,
    description: null,
    content_type: "image/jpeg",
  },
  {
    url: "https://cloud.modyocdn.com/uploads/db3322be-03ac-41af-be11-7944fcef7fa0/original/dolphin.jpg",
    tags: [],
    uuid: "db3322be-03ac-41af-be11-7944fcef7fa0",
    title: "Dolphin",
    alt_text: null,
    description: null,
    content_type: "image/jpeg",
  },
  {
    url: "https://cloud.modyocdn.com/uploads/6bab500a-c518-4cee-818b-2d3e3e79c036/original/fish.jpg",
    tags: [],
    uuid: "6bab500a-c518-4cee-818b-2d3e3e79c036",
    title: "Fish",
    alt_text: null,
    description: null,
    content_type: "image/jpeg",
  },
  {
    url: "https://cloud.modyocdn.com/uploads/0ce37857-9fe4-412c-ad4f-2c70737226d6/original/fox.jpg",
    tags: [],
    uuid: "0ce37857-9fe4-412c-ad4f-2c70737226d6",
    title: "Fox",
    alt_text: null,
    description: null,
    content_type: "image/jpeg",
  },
];
const { cards, turns, handleChoice, shuffleCards, wrongs, choiceOne, choiceTwo, disabled } = useMemoryGame(cardImages);


const handleNewGame = () => {
  cards.value = []
  shuffleCards()
}

onMounted(() => {
    shuffleCards()
})
</script>

<template>
  <div class="h-screen w-full flex flex-col place-content-center">
    <div class="flex justify-around mb-9">
      <div class="text-2xl text-emerald-500 font-bold">Points: {{ turns }}</div>
      <div class="text-2xl text-emerald-500 font-bold">Wrongs: {{ wrongs }}</div>
    </div>

    <section
      class="grid grid-cols-3 md:grid-auto-fit-[10rem] grid-flow-row gap-3 max-w-3xl md:gap-8 md:p-1 mx-auto"
    >
      <Card
        :disabled="disabled"
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
