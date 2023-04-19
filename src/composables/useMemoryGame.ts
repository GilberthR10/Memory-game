import { ref, computed, watch, onMounted } from "vue";
import type { Card, Animal } from "@/types/animal";
import animalsApi from "@/services/animals-api";
import { useMemoryGameStore } from "@/stores/memoryGame";
import { storeToRefs } from "pinia";

export function useMemoryGame() {
  const store = useMemoryGameStore();
  const { cards, points, wrongs, gameBoard, isLoading } = storeToRefs(store);

  const choiceOne = ref<Card | null>(null);
  const choiceTwo = ref<Card | null>(null);
  const disabled = ref<boolean>(false);

  const getAnimals = async (page: number): Promise<Card[]> => {
    try {
      const randomNum = Math.floor(Math.random() * 4) + 1;
      isLoading.value = true;
      const { data } = await animalsApi.get<Animal>(
        `/entries?per_page=${page}&page=${randomNum}`
      );
      const cardImages = data.entries.map((entry) => entry.fields.image);
      const mixedCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, matched: false })) as Card[];
      return mixedCards;
    } catch (error) {
      isLoading.value = false;
      throw new Error("No se pudo obtener los datos de la API");
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(async () => {
    cards.value = [];
    const card = await getAnimals(gameBoard.value);
    store.setCard(card);
  });

  const newGame = async () => {
    cards.value = [];
    const newCards = await getAnimals(gameBoard.value);
    store.setCard(newCards);
  };

  // handle a choice
  const handleChoice = (card: Card) => {
    if (!disabled.value) {
      choiceOne.value ? (choiceTwo.value = card) : (choiceOne.value = card);
    }
  };
  // compare 2 selected cards
  const resetTurn = () => {
    choiceOne.value = null;
    choiceTwo.value = null;
    disabled.value = false;
  };

  const isMatch = computed(() => {
    if (choiceOne.value && choiceTwo.value) {
      if (choiceOne.value.uuid === choiceTwo.value.uuid) {
        points.value++;
        return true;
      }
      wrongs.value++;
    }
    return false;
  });

  const allMatched = computed(() => {
    return cards.value.every(card => card.matched);
  });



  watch([choiceOne, choiceTwo], () => {
    if (isMatch.value) {
      choiceOne.value!.matched = true;
      choiceTwo.value!.matched = true;
      resetTurn();
    } else if (choiceOne.value && choiceTwo.value) {
      disabled.value = true;
      setTimeout(resetTurn, 1000);
    }
  });

  return {
    cards,
    points,
    wrongs,
    choiceOne,
    choiceTwo,
    disabled,
    isLoading,
    handleChoice,
    gameBoard,
    allMatched,
    newGame,
  };
}
