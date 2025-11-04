<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-colors duration-300">
    <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Statistiques des rapports</h2>

```
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="p-4 bg-gray-100 dark:bg-gray-700 rounded">
    <h3 class="text-sm font-medium">Total rapports</h3>
    <p class="text-2xl font-bold">{{ allReports.length }}</p>
  </div>
  <div class="p-4 bg-green-100 dark:bg-green-700 rounded">
    <h3 class="text-sm font-medium">Rapports validés</h3>
    <p class="text-2xl font-bold">{{ validatedReports.length }}</p>
  </div>
  <div class="p-4 bg-red-100 dark:bg-red-700 rounded">
    <h3 class="text-sm font-medium">Rapports refusés</h3>
    <p class="text-2xl font-bold">{{ rejectedReports.length }}</p>
  </div>
</div>

<!-- Ex: graphique simple -->
<div class="mt-6">
  <canvas id="reportChart"></canvas>
</div>
```

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import Chart from 'chart.js/auto'

const store = useStore()

// ✅ Récupération des rapports avec valeur par défaut []
const allReports = computed(() => store.getters['rapports/all'] ?? [])

// 🔹 Filtrages sécurisés
const validatedReports = computed(() =>
  (allReports.value ?? []).filter(r => r.status === 'Validé')
)
const rejectedReports = computed(() =>
  (allReports.value ?? []).filter(r => r.status === 'Refusé')
)
const pendingReports = computed(() =>
  (allReports.value ?? []).filter(r => r.status === 'En attente')
)

// 📊 Création d'un graphique simple
onMounted(() => {
  const ctx = document.getElementById('reportChart')
  if (!ctx) return

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Validé', 'Refusé', 'En attente'],
      datasets: [
        {
          label: 'Nombre de rapports',
          data: [
            validatedReports.value.length,
            rejectedReports.value.length,
            pendingReports.value.length
          ],
          backgroundColor: ['#22c55e', '#ef4444', '#facc15']
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  })
})
</script>

<style scoped>
</style>
