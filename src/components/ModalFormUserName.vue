<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Directive } from 'vue'
import { useMemoryGame } from '@/composables/useMemoryGame'
import BaseModal from './BaseModal.vue'
const { setUserName, setOpenModal, openModal } = useMemoryGame()
const userName = ref('')

const saveUserName = () => {
  if (userName.value.length > 0) {
    setUserName(userName.value)
    setOpenModal(false)
    userName.value = ''
  }
}

const inputError = computed(() => {
  if (!userName.value) {
    return 'Debes ingresar un nombre para continuar *'
  }
  return null
})

const vFocus: Directive = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <BaseModal @close="saveUserName" v-if="openModal">
    <div class="flex flex-col space-y-10">
      <p class="text-center text-lg font-semibold text-emerald-600">
        Hola Para comenzar el Juego ingresa tu nombre.
      </p>
      <form @submit.prevent="saveUserName" class="flex flex-col">
        <input
          v-focus
          :class="{ 'border border-red-600': inputError }"
          type="text"
          class="p-3 rounded-lg focus:outline-none placeholder:text-center text-emerald-700"
          placeholder="Ingresa tu nombre de usuario"
          v-model="userName"
        />
        <span class="text-red-600 text-center" v-if="inputError">{{ inputError }}</span>
        <button
          class="rounded-xl mx-auto bg-emerald-500 text-white font-bold px-6 py-2.5 mt-10 hover:opacity-75"
        >
          Guardar
        </button>
      </form>
    </div>
  </BaseModal>
</template>
