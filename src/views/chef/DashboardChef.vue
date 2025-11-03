<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md min-h-screen">
    <!-- En-tête -->
    <div class="flex justify-between items-center mb-6 flex-wrap gap-3">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Tableau de bord - Chef de département
      </h2>
      <!-- <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Exporter le rapport
      </button> -->
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCardChef label="Employés actifs" value="14" icon="ri-user-3-line" />
      <StatCardChef label="Tâches en cours" value="8" icon="ri-task-line" />
      <StatCardChef label="Présence moyenne" value="92%" icon="ri-bar-chart-fill" />
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PerformanceChart />
      <TaskProgressChart />
    </div>

    <!-- Activité récente -->
    <div class="mt-8">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Activité récente</h3>
      <ul class="space-y-3">
        <li class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between">
          <span>✔️ Tâche "Rapport mensuel" complétée par <b>Fatou Ndiaye</b></span>
          <small class="text-gray-500 dark:text-gray-400">il y a 2h</small>
        </li>
        <li class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between">
          <span>🕒 Nouvelle demande de congé de <b>Jean Mbarga</b></span>
          <small class="text-gray-500 dark:text-gray-400">hier</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import StatCardChef from '@/components/chef/StatCardChef.vue'
import PerformanceChart from '@/components/chef/PerformanceChart.vue'
import TaskProgressChart from '@/components/chef/TaskProgressChart.vue'
</script>
<style scoped>
</style>