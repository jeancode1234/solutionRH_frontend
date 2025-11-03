<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md min-h-screen">
    <div class="flex justify-between items-center mb-4 flex-wrap gap-3">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Gestion des tâches</h2>
      <button @click="showForm = !showForm" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {{ showForm ? 'Fermer' : '➕ Nouvelle tâche' }}
      </button>
    </div>

    <!-- Filtre -->
    <div class="mb-4 flex flex-wrap gap-3">
      <select v-model="filter" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option value="">Toutes</option>
        <option>En cours</option>
        <option>Complétée</option>
      </select>
    </div>

    <!-- Formulaire -->
    <div v-if="showForm" class="p-4 mb-6 bg-gray-50 dark:bg-gray-900 border rounded">
      <h3 class="font-semibold mb-3 text-gray-700 dark:text-gray-200">Créer une tâche</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <input v-model="form.title" placeholder="Titre" class="p-2 border rounded dark:bg-gray-800 dark:text-white" />
        <input v-model="form.assignedTo" placeholder="Employé assigné" class="p-2 border rounded dark:bg-gray-800 dark:text-white" />
        <select v-model="form.status" class="p-2 border rounded dark:bg-gray-800 dark:text-white">
          <option>En cours</option>
          <option>Complétée</option>
        </select>
      </div>
      <div class="flex justify-end mt-3">
        <button @click="addTask" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Enregistrer</button>
      </div>
    </div>

    <!-- Liste -->
    <ul class="space-y-3">
      <li
        v-for="t in filteredTasks"
        :key="t.title"
        class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center"
      >
        <div>
          <h4 class="font-medium">{{ t.title }}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-300">Assignée à : {{ t.assignedTo }}</p>
        </div>
        <span :class="t.status === 'Complétée' ? 'text-green-500' : 'text-blue-500'">{{ t.status }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showForm = ref(false)
const filter = ref('')
const form = ref({ title: '', assignedTo: '', status: 'En cours' })

const tasks = ref([
  { title: 'Rapport trimestriel', assignedTo: 'Alice Dupont', status: 'En cours' },
  { title: 'Mise à jour du plan de projet', assignedTo: 'Jean Mbarga', status: 'Complétée' },
  { title: 'Formation sécurité', assignedTo: 'Fatou Ndiaye', status: 'En cours' }
])

const filteredTasks = computed(() =>
  filter.value ? tasks.value.filter(t => t.status === filter.value) : tasks.value
)

function addTask() {
  if (form.value.title && form.value.assignedTo) {
    tasks.value.push({ ...form.value })
    showForm.value = false
    form.value = { title: '', assignedTo: '', status: 'En cours' }
  }
}
</script>
<style scoped>
</style>