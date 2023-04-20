import { ref, computed, watch, onMounted, watchEffect } from 'vue'
import type { Card, Animal } from '@/types/animal'
import animalsApi from '@/services/animals-api'
import { useMemoryGameStore } from '@/stores/memoryGame'
import { storeToRefs } from 'pinia'

export function useMemoryGame() {
  const store = useMemoryGameStore()
  const {
    cards,
    points,
    wrongs,
    gameBoard,
    isLoading,
    userName,
    openModal,
    openModalCongrats,
    gameOver
  } = storeToRefs(store)

  const choiceOne = ref<Card | null>(null)
  const choiceTwo = ref<Card | null>(null)
  const disabled = ref<boolean>(false)

  const getAnimals = async (page: number): Promise<Card[]> => {
    try {
      isLoading.value = true
      const randomNum = Math.floor(Math.random() * 5) + 1
      const { data } = await animalsApi.get<Animal>(`/entries?per_page=${page}&page=${randomNum}`)
      const cardImages = data.entries.map((entry) => entry.fields.image)
      const mixedCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, matched: false })) as Card[]
      return mixedCards
    } catch (error) {
      isLoading.value = false
      throw new Error('No se pudo obtener los datos de la API')
    } finally {
      isLoading.value = false
    }
  }

  onMounted(async () => {
    const memoryGame = JSON.parse(localStorage.getItem('memoryGame') || 'null')
    if (memoryGame?.cards.length === 0) {
      const card = await getAnimals(gameBoard.value)
      store.setCard(card)
    }
    if (!userName.value) {
      setOpenModal(true)
    }
  })

  const setOpenModal = (open: boolean) => {
    store.setOpenModal(open)
  }
  const setOpenModalCongrats = (open: boolean) => {
    store.setOpenModalCongrats(open)
  }

  const newGame = async () => {
    points.value = 0
    wrongs.value = 0
    cards.value = []
    resetTurn()
    setOpenModalCongrats(false)
    const newCards = await getAnimals(gameBoard.value)
    store.setCard(newCards)
  }

  // handle a choice
  const handleChoice = (card: Card) => {
    if (!disabled.value) {
      choiceOne.value ? (choiceTwo.value = card) : (choiceOne.value = card)
    }
  }
  // compare 2 selected cards
  const resetTurn = () => {
    choiceOne.value = null
    choiceTwo.value = null
    disabled.value = false
  }

  const isMatch = computed(() => {
    if (choiceOne.value && choiceTwo.value) {
      if (choiceOne.value.uuid === choiceTwo.value.uuid) {
        points.value++
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

  const allMatched = computed(() => {
    if (cards.value.length) {
      for (const card of cards.value) {
        if (!card.matched) {
          return false
        }
      }
      return true
    }
    return false
  })

  watchEffect(() => {
    if (allMatched.value) {
      setOpenModalCongrats(true)
    }
  })

  const setUserName = (name: string) => {
    userName.value = name
  }

  return {
    cards,
    points,
    wrongs,
    choiceOne,
    choiceTwo,
    disabled,
    isLoading,
    userName,
    gameBoard,
    allMatched,
    openModal,
    gameOver,
    openModalCongrats,
    handleChoice,
    setOpenModalCongrats,
    newGame,
    setUserName,
    setOpenModal
  }
}
