import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Card } from '@/types/animal'

export const useMemoryGameStore = defineStore(
  'memoryGame',
  () => {
    const userName = ref<string>('')
    const points = ref<number>(0)
    const wrongs = ref<number>(0)
    const cards = ref<Card[]>([])
    const gameBoard = ref(4)
    const isLoading = ref<boolean>()
    const openModal = ref<boolean>(false)
    const gameOver = ref<boolean>(false)
    const openModalCongrats = ref<boolean>(false)

    return {
      userName,
      cards,
      points,
      wrongs,
      gameBoard,
      isLoading,
      openModal,
      openModalCongrats,
      gameOver,

      // Actions
      setCard(newCards: Card[]) {
        cards.value = newCards
      },
      setOpenModal(open: boolean) {
        openModal.value = open
      },
      setOpenModalCongrats(open: boolean) {
        openModalCongrats.value = open
        gameOver.value = open
      }
    }
  },
  {
    persist: true
  }
)
