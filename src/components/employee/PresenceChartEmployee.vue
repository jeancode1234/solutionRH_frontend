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
    type: 'bar',
    data: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
      datasets: [
        {
          label: 'Présences',
          data: [5, 4, 5, 5, 4],
          backgroundColor: '#3b82f6',
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      },
      plugins: {
        legend: { display: false }
      }
    }
  })
})
</script>
<style scoped>
</style>