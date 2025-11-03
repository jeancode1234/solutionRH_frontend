<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md min-h-screen">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Équipe du département</h2>

    <!-- Barre de recherche -->
    <div class="flex flex-wrap justify-between items-center mb-4 gap-3">
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher un employé..."
        class="w-full md:w-1/3 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        @click="showForm = !showForm"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {{ showForm ? 'Fermer' : '➕ Ajouter un employé' }}
      </button>
    </div>

    <!-- Formulaire d'ajout -->
    <div v-if="showForm" class="p-4 mb-6 bg-gray-50 dark:bg-gray-900 border rounded">
      <h3 class="font-semibold mb-3 text-gray-700 dark:text-gray-200">Ajouter un employé</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <input v-model="form.name" placeholder="Nom complet" class="p-2 border rounded dark:bg-gray-800 dark:text-white" />
        <input v-model="form.role" placeholder="Poste" class="p-2 border rounded dark:bg-gray-800 dark:text-white" />
        <input v-model="form.email" type="email" placeholder="Email" class="p-2 border rounded dark:bg-gray-800 dark:text-white" />
        <select v-model="form.status" class="p-2 border rounded dark:bg-gray-800 dark:text-white">
          <option>Actif</option>
          <option>En congé</option>
        </select>
      </div>
      <div class="flex justify-end mt-3">
        <button @click="addEmployee" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Enregistrer</button>
      </div>
    </div>

    <!-- Tableau des employés -->
    <div class="overflow-x-auto">
      <table class="min-w-full border dark:border-gray-700 text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="p-3 text-left">Nom</th>
            <th class="p-3 text-left">Poste</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-center">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="emp in paginatedEmployees"
            :key="emp.email"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-700"
          >
            <td class="p-3">{{ emp.name }}</td>
            <td class="p-3">{{ emp.role }}</td>
            <td class="p-3">{{ emp.email }}</td>
            <td class="p-3 text-center">
              <span :class="emp.status === 'Actif' ? 'text-green-600' : 'text-yellow-500'">{{ emp.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4 gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-3 py-1 rounded',
          page === currentPage
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const showForm = ref(false)
const currentPage = ref(1)
const perPage = 5

const form = ref({ name: '', role: '', email: '', status: 'Actif' })
const employees = ref([
  { name: 'Alice Dupont', role: 'Analyste RH', email: 'alice@example.com', status: 'Actif' },
  { name: 'Jean Mbarga', role: 'Comptable', email: 'jean@example.com', status: 'En congé' },
  { name: 'Fatou Ndiaye', role: 'Assistante', email: 'fatou@example.com', status: 'Actif' },
  { name: 'Marc Tamba', role: 'Chargé de projet', email: 'marc@example.com', status: 'Actif' },
  { name: 'Awa Diop', role: 'Technicienne', email: 'awa@example.com', status: 'Actif' },
  { name: 'Samira Kone', role: 'Consultante', email: 'samira@example.com', status: 'En congé' }
])

const filteredEmployees = computed(() =>
  employees.value.filter(e => e.name.toLowerCase().includes(search.value.toLowerCase()))
)

const totalPages = computed(() => Math.ceil(filteredEmployees.value.length / perPage))
const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredEmployees.value.slice(start, start + perPage)
})

function addEmployee() {
  if (form.value.name && form.value.role && form.value.email) {
    employees.value.push({ ...form.value })
    form.value = { name: '', role: '', email: '', status: 'Actif' }
    showForm.value = false
  }
}
</script>
