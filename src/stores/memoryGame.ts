import { ref } from "vue";
import { defineStore } from "pinia";
import type { Card } from "@/types/animal";

export const useMemoryGameStore = defineStore("memoryGame", () => {
  const userName = ref<string>("");
  const points = ref<number>(0);
  const wrongs = ref<number>(0);
  const cards = ref<Card[]>([]);
  const gameBoard = ref(4);
  const isLoading = ref<boolean>();

  return {
    userName,
    cards,
    points,
    wrongs,
    gameBoard,
    isLoading,

    // Actions
    setCard(newCards: Card[]) {
      cards.value = newCards;
    },
  };
});
