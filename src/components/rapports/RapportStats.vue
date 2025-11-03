<template>
  <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
      Statistiques des Rapports
    </h2>
    <canvas ref="chartCanvas" height="120"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { useStore } from "vuex"
import Chart from "chart.js/auto"

const store = useStore()
const chartCanvas = ref(null)
let chartInstance = null

const rapports = store.getters["rapports/all"]

onMounted(() => {
  const ctx = chartCanvas.value.getContext("2d")
  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Validés", "Rejetés", "En attente"],
      datasets: [
        {
          data: [
            rapports.filter((r) => r.status === "Validé").length,
            rapports.filter((r) => r.status === "Rejeté").length,
            rapports.filter((r) => r.status === "En attente").length,
          ],
          backgroundColor: ["#22c55e", "#ef4444", "#facc15"],
        },
      ],
    },
  })
})

watch(
  () => store.getters["rapports/all"],
  (newVal) => {
    if (chartInstance) {
      chartInstance.data.datasets[0].data = [
        newVal.filter((r) => r.status === "Validé").length,
        newVal.filter((r) => r.status === "Rejeté").length,
        newVal.filter((r) => r.status === "En attente").length,
      ]
      chartInstance.update()
    }
  },
  { deep: true }
)
</script>
