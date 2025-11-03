<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <h2 class="text-xl font-semibold mb-4">Mes Tâches</h2>

    <div class="flex justify-between mb-4">
      <input v-model="search" placeholder="🔍 Rechercher une tâche..." class="p-2 border rounded w-1/3 dark:bg-gray-700" />
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm border dark:border-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="p-3 text-left">Nom</th>
            <th class="p-3 text-left">Échéance</th>
            <th class="p-3 text-center">Statut</th>
            <th class="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in filteredTaches" :key="i" class="border-b dark:border-gray-700">
            <td class="p-3">{{ t.nom }}</td>
            <td class="p-3">{{ t.echeance }}</td>
            <td class="p-3 text-center">{{ t.statut }}</td>
            <td class="p-3 text-center">
              <button @click="changerStatut(t)" class="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
                Terminer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const search = ref('')
const taches = ref([
  { nom: 'Rédiger le rapport mensuel', echeance: '2025-11-10', statut: 'En cours' },
  { nom: 'Mettre à jour le tableau des présences', echeance: '2025-11-05', statut: 'Terminée' }
])
const filteredTaches = computed(() =>
  taches.value.filter(t => t.nom.toLowerCase().includes(search.value.toLowerCase()))
)
function changerStatut(t) {
  t.statut = 'Terminée'
}
</script>
