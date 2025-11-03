<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
    <h3 class="font-semibold mb-3">Échéances à venir</h3>
    <ul class="divide-y dark:divide-gray-700">
      <li v-for="t in tasks" :key="t.id" class="py-2 flex justify-between">
        <div>
          <p class="font-medium">{{ t.title }}</p>
          <p class="text-xs text-gray-500">{{ t.date }}</p>
        </div>
        <span class="text-xs text-blue-600">{{ t.status }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const tasks = [
  { id: 1, title: 'Entretien développeur', date: '02/11/2025', status: 'Prévu' },
  { id: 2, title: 'Clôture paie', date: '05/11/2025', status: 'En attente' },
  { id: 3, title: 'Réunion RH', date: '07/11/2025', status: 'Confirmé' }
]
</script>
<style scoped>
</style>