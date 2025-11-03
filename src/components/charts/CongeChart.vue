<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
    <h3 class="font-semibold text-gray-800 dark:text-white mb-2">Congés par type</h3>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const chartRef = ref(null)

onMounted(() => {
  new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Congé annuel', 'Congé maladie', 'RTT'],
      datasets: [
        {
          data: [60, 25, 15],
          backgroundColor: ['#3b82f6', '#10b981', '#fbbf24']
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#6b7280' } }
      }
    }
  })
})
</script>
