<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Mes Congés</h2>
      <button @click="toggleForm" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {{ showForm ? 'Fermer' : '➕ Nouvelle demande' }}
      </button>
    </div>

    <!-- Formulaire -->
    <div v-if="showForm" class="p-4 border rounded bg-gray-50 dark:bg-gray-900 mb-6">
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label>Type de congé</label>
          <select v-model="form.type" class="w-full p-2 border rounded dark:bg-gray-700">
            <option value="Annuel">Annuel</option>
            <option value="Maladie">Maladie</option>
            <option value="Exceptionnel">Exceptionnel</option>
          </select>
        </div>
        <div>
          <label>Date de début</label>
          <input v-model="form.debut" type="date" class="w-full p-2 border rounded dark:bg-gray-700" />
        </div>
        <div>
          <label>Date de fin</label>
          <input v-model="form.fin" type="date" class="w-full p-2 border rounded dark:bg-gray-700" />
        </div>
      </div>

      <div class="mt-4 flex justify-end">
        <button @click="ajouterDemande" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Envoyer la demande
        </button>
      </div>
    </div>

    <!-- Tableau -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm border dark:border-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="p-3 text-left">Type</th>
            <th class="p-3 text-left">Période</th>
            <th class="p-3 text-center">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, i) in conges" :key="i" class="border-b dark:border-gray-700">
            <td class="p-3">{{ c.type }}</td>
            <td class="p-3">{{ c.debut }} → {{ c.fin }}</td>
            <td class="p-3 text-center">
              <span :class="statusClass(c.statut)" class="px-2 py-1 rounded text-xs">{{ c.statut }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const conges = ref([
  { type: 'Annuel', debut: '2025-02-01', fin: '2025-02-10', statut: 'Approuvé' },
  { type: 'Maladie', debut: '2025-03-12', fin: '2025-03-14', statut: 'En attente' }
])
const form = ref({ type: '', debut: '', fin: '' })

function toggleForm() {
  showForm.value = !showForm.value
}
function ajouterDemande() {
  conges.value.push({ ...form.value, statut: 'En attente' })
  showForm.value = false
}
function statusClass(statut) {
  return statut === 'Approuvé' ? 'bg-green-200 text-green-800' :
         statut === 'Refusé' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
}
</script>
