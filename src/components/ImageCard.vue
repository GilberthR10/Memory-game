<script setup lang="ts">
import type { Card } from '@/types/animal'

const props = defineProps<{
  card: Card
  disabled: boolean
  flip: boolean
}>()

const emit = defineEmits<{
  (e: 'selectedCard', card: Card): void
}>()

const chosenCard = (card: Card) => {
  emit('selectedCard', card)
}
const handleClick = () => {
  if (!props.disabled) {
    chosenCard(props.card)
  }
}
</script>
<template>
  <article
    class="card relative max-w-xs border rounded-3xl overflow-hidden cursor-pointer"
    @click="handleClick"
  >
    <div :class="{ flip: props.flip }">
      <img class="front object-cover w-full h-full" :src="card.url" alt="card front" />
      <img class="back w-full h-full object-cover" src="@/assets/modyo_card.png" alt="cover" />
    </div>
  </article>
</template>

<style scoped>
/* front of card - the animal */
.card .front {
  transform: rotateY(90deg);
  transition: all ease-in 0.2s;
  position: absolute;
}
.flip .front {
  transform: rotateY(0deg);
  transition-delay: 0.2s;
}

/* back of card - logo modyo */
.card .back {
  transition: all ease-in 0.2s;
  transition-delay: 0.2s;
}
.flip .back {
  transform: rotateY(90deg);
  transition-delay: 0s;
}
</style>
