<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <!-- ✅ En-tête -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Tableau de bord employé</h2>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-2 sm:mt-0">
        Bienvenue, {{ employeeName }}
      </p>
    </div>

    <!-- ✅ Statistiques principales -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCardEmployee
        v-for="(stat, i) in stats"
        :key="i"
        :icon="stat.icon"
        :label="stat.label"
        :value="stat.value"
        :color="stat.color"
      />
    </div>

    <!-- ✅ Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Présence mensuelle
        </h3>
        <PresenceChartEmployee />
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Performance et progression
        </h3>
        <ProgressChartEmployee />
      </div>
    </div>

    <!-- ✅ Activité récente -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Activité récente
      </h3>
      <RecentActivityEmployee />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StatCardEmployee from '@/components/employee/StatCardEmployee.vue'
import PresenceChartEmployee from '@/components/employee/PresenceChartEmployee.vue'
import ProgressChartEmployee from '@/components/employee/ProgressChartEmployee.vue'
import RecentActivityEmployee from '@/components/employee/RecentActivityEmployee.vue'

// ✅ Nom employé simulé
const employeeName = ref('Jean Dupont')

// ✅ Statistiques fictives
const stats = ref([
  { icon: 'ri-calendar-check-line', label: 'Présences ce mois', value: 18, color: 'bg-green-500' },
  { icon: 'ri-time-line', label: 'Congés restants', value: '6 jours', color: 'bg-blue-500' },
  { icon: 'ri-trophy-line', label: 'Tâches accomplies', value: 45, color: 'bg-yellow-500' },
  { icon: 'ri-graduation-cap-line', label: 'Formations suivies', value: 3, color: 'bg-purple-500' },
])
</script>

<style scoped>
/* ✅ Animation fluide sur le dashboard */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
