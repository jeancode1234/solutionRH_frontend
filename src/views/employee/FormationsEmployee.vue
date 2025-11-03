<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <h2 class="text-xl font-semibold mb-4">Mes Formations</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(f, i) in formations" :key="i" class="p-4 border rounded bg-gray-50 dark:bg-gray-900">
        <h3 class="font-semibold text-blue-600">{{ f.titre }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ f.date }}</p>
        <p class="text-gray-700 dark:text-gray-300 text-sm">{{ f.description }}</p>
        <button class="mt-3 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
          S'inscrire
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const formations = [
  { titre: 'Leadership & Communication', date: 'Janv 2025', description: 'Développer ses compétences en leadership.' },
  { titre: 'Développement Vue.js', date: 'Fév 2025', description: 'Perfectionner le framework Vue 3 et Tailwind.' }
]
</script>
 