<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <!-- 🧭 En-tête -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
        📊 Statistiques de paie
      </h3>
      <div class="flex items-center gap-2">
        <select v-model="selectedYear" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
    </div>

    <!-- 📈 Graphiques -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Masse salariale -->
      <div class="p-4 border rounded-lg dark:border-gray-700">
        <h4 class="font-medium mb-2 text-gray-700 dark:text-gray-200">💵 Masse salariale mensuelle</h4>
        <canvas ref="payrollChart" class="w-full h-64"></canvas>
      </div>

      <!-- Primes mensuelles -->
      <div class="p-4 border rounded-lg dark:border-gray-700">
        <h4 class="font-medium mb-2 text-gray-700 dark:text-gray-200">🎁 Total des primes mensuelles</h4>
        <canvas ref="bonusChart" class="w-full h-64"></canvas>
      </div>

      <!-- Répartition par département -->
      <div class="p-4 border rounded-lg dark:border-gray-700 md:col-span-2">
        <h4 class="font-medium mb-2 text-gray-700 dark:text-gray-200">🏢 Répartition des salaires par département</h4>
        <canvas ref="deptChart" class="w-full h-72"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const store = useStore()
const payrollChart = ref(null)
const bonusChart = ref(null)
const deptChart = ref(null)
const selectedYear = ref(new Date().getFullYear())

// 📅 Années disponibles
const years = computed(() => {
  const allYears = store.state.paie.fiches.map((f) => new Date(f.date).getFullYear())
  return [...new Set(allYears)].sort((a, b) => b - a)
})

// 🔢 Données filtrées
const filteredPaies = computed(() =>
  store.state.paie.fiches.filter((f) => new Date(f.date).getFullYear() === selectedYear.value)
)

// 🔍 Données mensuelles
const monthlyData = computed(() => {
  const months = Array(12).fill(0)
  const primes = Array(12).fill(0)
  filteredPaies.value.forEach((p) => {
    const month = new Date(p.date).getMonth()
    months[month] += p.salaireNet
    primes[month] += p.primes.reduce((a, b) => a + (b.montant || 0), 0)
  })
  return { months, primes }
})

// 🏢 Répartition par département
const deptData = computed(() => {
  const map = {}
  filteredPaies.value.forEach((p) => {
    if (!map[p.departement]) map[p.departement] = 0
    map[p.departement] += p.salaireNet
  })
  return map
})

// 🎨 Couleurs
const colors = {
  text: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#111',
  bg: getComputedStyle(document.documentElement).getPropertyValue('--bg-color') || '#fff',
  blue: '#3b82f6',
  green: '#10b981',
  orange: '#f59e0b',
}

// 🧩 Création des graphiques
let chartPayroll, chartBonus, chartDept

function renderCharts() {
  if (chartPayroll) chartPayroll.destroy()
  if (chartBonus) chartBonus.destroy()
  if (chartDept) chartDept.destroy()

  const ctx1 = payrollChart.value.getContext('2d')
  const ctx2 = bonusChart.value.getContext('2d')
  const ctx3 = deptChart.value.getContext('2d')

  // 💵 Masse salariale
  chartPayroll = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: [
        'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
        'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc',
      ],
      datasets: [
        {
          label: 'Masse salariale (FCFA)',
          data: monthlyData.value.months,
          borderColor: colors.blue,
          backgroundColor: 'rgba(59,130,246,0.3)',
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: colors.text } } },
      scales: {
        x: { ticks: { color: colors.text } },
        y: { ticks: { color: colors.text } },
      },
    },
  })

  // 🎁 Primes
  chartBonus = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: [
        'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
        'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc',
      ],
      datasets: [
        {
          label: 'Total des primes (FCFA)',
          data: monthlyData.value.primes,
          backgroundColor: colors.green,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: colors.text } } },
      scales: {
        x: { ticks: { color: colors.text } },
        y: { ticks: { color: colors.text } },
      },
    },
  })

  // 🏢 Répartition par département
  chartDept = new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: Object.keys(deptData.value),
      datasets: [
        {
          data: Object.values(deptData.value),
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: colors.text } },
      },
    },
  })
}

onMounted(() => {
  renderCharts()
})

watch([filteredPaies, selectedYear], () => {
  renderCharts()
})
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>
