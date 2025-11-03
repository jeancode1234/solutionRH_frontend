<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md min-h-screen">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-3">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Gestion des congés</h2>
      <select v-model="statusFilter" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option value="">Tous les statuts</option>
        <option value="En attente">En attente</option>
        <option value="Approuvé">Approuvé</option>
        <option value="Rejeté">Rejeté</option>
      </select>
    </div>

    <!-- Tableau -->
    <div class="overflow-x-auto">
      <table class="min-w-full border dark:border-gray-700 text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="p-3 text-left">Employé</th>
            <th class="p-3 text-left">Motif</th>
            <th class="p-3 text-left">Période</th>
            <th class="p-3 text-center">Statut</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(leave, i) in filteredLeaves"
            :key="i"
            class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="p-3">{{ leave.employee }}</td>
            <td class="p-3">{{ leave.reason }}</td>
            <td class="p-3">{{ leave.from }} → {{ leave.to }}</td>
            <td class="p-3 text-center">
              <span
                :class="{
                  'text-yellow-500': leave.status === 'En attente',
                  'text-green-500': leave.status === 'Approuvé',
                  'text-red-500': leave.status === 'Rejeté'
                }"
                >{{ leave.status }}</span
              >
            </td>
            <td class="p-3 text-center">
              <button @click="approveLeave(leave)" class="text-green-600 hover:underline mr-2">Approuver</button>
              <button @click="rejectLeave(leave)" class="text-red-600 hover:underline">Rejeter</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const statusFilter = ref('')
const leaves = ref([
  { employee: 'Alice Dupont', reason: 'Vacances', from: '2025-11-10', to: '2025-11-20', status: 'En attente' },
  { employee: 'Jean Mbarga', reason: 'Santé', from: '2025-11-03', to: '2025-11-08', status: 'Approuvé' },
  { employee: 'Fatou Ndiaye', reason: 'Famille', from: '2025-11-15', to: '2025-11-22', status: 'Rejeté' }
])

const filteredLeaves = computed(() =>
  statusFilter.value ? leaves.value.filter((l) => l.status === statusFilter.value) : leaves.value
)

function approveLeave(l) {
  l.status = 'Approuvé'
}
function rejectLeave(l) {
  l.status = 'Rejeté'
}
</script>
<style scoped>
</style>