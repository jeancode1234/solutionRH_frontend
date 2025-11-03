<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
    <h3 class="font-semibold mb-3">Activité récente</h3>
    <ul class="space-y-2">
      <li v-for="a in activities" :key="a.id" class="text-sm">
        <span class="text-gray-800 dark:text-gray-200">{{ a.text }}</span>
        <span class="block text-xs text-gray-400">{{ a.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const activities = [
  { id: 1, text: 'Ajout de 2 employés au département IT', date: 'Hier' },
  { id: 2, text: 'Validation de 3 congés', date: 'Aujourd’hui' },
  { id: 3, text: 'Mise à jour des bulletins de paie', date: '03/10/2025' }
]
</script>
<style scoped>
</style>