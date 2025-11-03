<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
    <h3 class="font-semibold mb-3">Présences hebdomadaires</h3>
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
    type: 'line',
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
      datasets: [{ data: [95, 90, 92, 94, 91], borderColor: '#3B82F6', fill: true }]
    },
    options: { plugins: { legend: { display: false } }, responsive: true }
  })
})
</script>
<style scoped>
</style>