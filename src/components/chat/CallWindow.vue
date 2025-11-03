<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center animate-pulse">
      <i class="ri-phone-fill text-5xl text-green-500 animate-bounce mb-3"></i>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Appel en cours...</h3>
      <p class="text-gray-600 dark:text-gray-400">{{ contact?.name }}</p>
      <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Raccrocher
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps,defineEmits } from 'vue'
defineProps({ contact: Object })
defineEmits(['close'])
</script>
