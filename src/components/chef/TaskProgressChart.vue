<template>
  <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm">
    <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3">Avancement des tâches</h3>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js'
Chart.register(DoughnutController, ArcElement, Tooltip)

const chart = ref(null)
onMounted(() => {
  new Chart(chart.value, {
    type: 'doughnut',
    data: {
      labels: ['Complétées', 'En cours', 'En attente'],
      datasets: [
        {
          data: [12, 6, 2],
          backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b'],
        },
      ],
    },
    options: { responsive: true, cutout: '70%' },
  })
})
</script>
<style scoped>
</style>