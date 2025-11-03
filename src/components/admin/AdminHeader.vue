<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">Bonjour, Marie 👋</h1>
      <div class="text-sm text-gray-500 dark:text-gray-400">Aujourd'hui</div>
    </div>

    <div class="flex items-center gap-4">
      <input v-model="q" placeholder="Recherche..." class="px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700" />
      <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">🔔</button>
      <img src="https://i.pravatar.cc/40?img=68" class="w-10 h-10 rounded-full border-2 border-blue-500" />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const q = ref('')
</script>
