
import { ref, computed, watch } from 'vue'
import type { Card } from '@/types/animal';
import type { Image } from '@/types/animal';


export function useMemoryGame(cardImages: Image[]) {
  const cards = ref<Card[]>([])
  const turns = ref(0)
  const wrongs = ref(0)
  const choiceOne = ref<Card | null>(null)
  const choiceTwo = ref<Card | null>(null)
  const disabled = ref<boolean>(false)


  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, matched: false }))

      choiceOne.value = null
      choiceTwo.value = null
      cards.value = [...shuffledCards]
      turns.value = 0
      wrongs.value = 0
  }

  // handle a choice
  const handleChoice = (card: Card) => {
    if (!disabled.value) {
      choiceOne.value ? choiceTwo.value = card : choiceOne.value = card
    }
  };
  // compare 2 selected cards
  const resetTurn = () => {
    choiceOne.value = null
    choiceTwo.value = null
    disabled.value = false
  }

  const isMatch = computed(() => {
    if (choiceOne.value && choiceTwo.value) {
      if (choiceOne.value.uuid === choiceTwo.value.uuid) {
        turns.value++
        return true
      }
      wrongs.value++
    }
    return false
  })


  watch([choiceOne, choiceTwo], () => {
    if (isMatch.value) {
      choiceOne.value!.matched = true
      choiceTwo.value!.matched = true
      resetTurn()
    } else if (choiceOne.value && choiceTwo.value) {
      disabled.value = true
      setTimeout(resetTurn, 1000)
    }
  })

  return {
    cards,
    turns,
    wrongs,
    choiceOne,
    choiceTwo,
    disabled,
    handleChoice,
    shuffleCards,
  }
}