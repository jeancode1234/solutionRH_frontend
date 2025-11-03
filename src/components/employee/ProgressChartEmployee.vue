<template>
  <div class="w-full h-64">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const canvas = ref(null)

onMounted(() => {
  new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [
        {
          label: 'Performance (%)',
          data: [70, 75, 80, 78, 85, 90],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  })
})
</script>
<style scoped>
</style>