<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
    <h3 class="font-semibold mb-3">Répartition des congés</h3>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
const chart = ref(null)
onMounted(() => {
  new Chart(chart.value, {
    type: 'doughnut',
    data: {
      labels: ['Payés', 'Maladie', 'Sans solde'],
      datasets: [{ data: [12, 4, 3], backgroundColor: ['#3B82F6', '#F59E0B', '#EF4444'] }]
    },
    options: { responsive: true }
  })
})
</script>
<style scoped>
</style>