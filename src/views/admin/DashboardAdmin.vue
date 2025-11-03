<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Tableau de bord Administrateur</h2>

    <!-- Cartes statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard label="Employés" value="197" color="blue" />
      <StatCard label="Présences du jour" value="176" color="green" />
      <StatCard label="Congés en cours" value="12" color="yellow" />
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
        <h3 class="font-semibold mb-4">Taux de présence</h3>
        <canvas id="presenceChart"></canvas>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700">
        <h3 class="font-semibold mb-4">Répartition par département</h3>
        <canvas id="deptChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatCard from '@/components/common/StatCard.vue'
import { onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

onMounted(() => {
  new Chart(document.getElementById('presenceChart'), {
    type: 'line',
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
      datasets: [
        { label: 'Présences', data: [160, 170, 165, 180, 176], borderColor: '#2563EB', fill: true }
      ]
    }
  })

  new Chart(document.getElementById('deptChart'), {
    type: 'doughnut',
    data: {
      labels: ['IT', 'RH', 'Finance', 'Ventes'],
      datasets: [{ data: [40, 25, 20, 15], backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#EF4444'] }]
    }
  })
})
</script>
<style scoped>
</style>