<template>
  <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm">
    <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3">Performance mensuelle</h3>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip)

const chart = ref(null)
onMounted(() => {
  new Chart(chart.value, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [
        {
          label: 'Performance',
          data: [80, 85, 78, 90, 88, 95],
          backgroundColor: '#2563eb',
        },
      ],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } },
  })
})
</script>
<style scoped>
</style>