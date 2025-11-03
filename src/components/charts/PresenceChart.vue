<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
    <h3 class="font-semibold text-gray-800 dark:text-white mb-2">Présences des 7 derniers jours</h3>
    <canvas ref="chartEl"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const chartEl = ref(null)

onMounted(() => {
  new Chart(chartEl.value, {
    type: 'line',
    data: {
      labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
      datasets: [{
        label: 'Présences',
        data: [150, 162, 159, 180, 170, 200, 190],
        borderColor: '#2563eb',
        tension: 0.3,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: '#e5e7eb' } },
        x: { grid: { display: false } }
      }
    }
  })
})
</script>
