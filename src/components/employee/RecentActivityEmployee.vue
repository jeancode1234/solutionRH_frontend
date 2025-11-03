<template>
  <ul class="divide-y divide-gray-200 dark:divide-gray-700">
    <li v-for="(activity, i) in activities" :key="i" class="py-3 flex items-start space-x-3">
      <div :class="['w-10 h-10 flex items-center justify-center rounded-full text-white', activity.color]">
        <i :class="activity.icon"></i>
      </div>
      <div>
        <p class="text-gray-800 dark:text-gray-100 font-medium">{{ activity.title }}</p>
        <p class="text-gray-500 dark:text-gray-400 text-sm">{{ activity.time }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup>
const activities = [
  { icon: 'ri-task-line', title: 'Tâche "Rapport Q3" complétée', time: 'Il y a 2 heures', color: 'bg-green-500' },
  { icon: 'ri-time-line', title: 'Demande de congé envoyée', time: 'Hier', color: 'bg-blue-500' },
  { icon: 'ri-message-3-line', title: 'Message reçu du RH', time: 'Il y a 2 jours', color: 'bg-yellow-500' },
  { icon: 'ri-trophy-line', title: 'Objectif mensuel atteint 🎯', time: 'Il y a 5 jours', color: 'bg-purple-500' }
]
</script>
<style scoped>
</style>