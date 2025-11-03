<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Départements</h2>
      <button
        @click="showForm = !showForm"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {{ showForm ? 'Fermer' : '➕ Nouveau département' }}
      </button>
    </div>

    <!-- Formulaire d’ajout -->
    <div v-if="showForm" class="mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-900">
      <h3 class="font-medium mb-2 text-gray-700 dark:text-gray-200">Créer un département</h3>
      <input
        v-model="newDept.name"
        placeholder="Nom du département"
        class="w-full p-2 mb-2 border rounded dark:bg-gray-800 dark:text-gray-100"
      />
      <textarea
        v-model="newDept.desc"
        placeholder="Description"
        class="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
      ></textarea>
      <button
        @click="addDepartment"
        class="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Ajouter
      </button>
    </div>

    <!-- Recherche -->
    <input
      v-model="search"
      placeholder="Rechercher un département..."
      class="w-full p-2 mb-4 border rounded dark:bg-gray-900 dark:text-gray-100"
    />

    <!-- Liste -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          <tr>
            <th class="p-3 text-left">Nom</th>
            <th class="p-3 text-left">Description</th>
            <th class="p-3 text-center">Employés</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="dept in filteredDepartments"
            :key="dept.id"
            class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <td class="p-3">{{ dept.name }}</td>
            <td class="p-3">{{ dept.desc }}</td>
            <td class="p-3 text-center">{{ dept.employees.length }}</td>
            <td class="p-3 text-center">
              <router-link
                :to="`/rh/departements/${dept.id}`"
                class="text-blue-600 hover:underline"
              >
                Voir
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showForm = ref(false)
const search = ref('')
const newDept = ref({ name: '', desc: '' })

const departments = ref([
  { id: 1, name: 'Informatique', desc: 'Développement et support technique', employees: [1, 2] },
  { id: 2, name: 'Comptabilité', desc: 'Gestion financière et paie', employees: [3] },
  { id: 3, name: 'Ressources Humaines', desc: 'Gestion du personnel', employees: [] }
])

const filteredDepartments = computed(() =>
  departments.value.filter(d =>
    d.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function addDepartment() {
  if (!newDept.value.name) return alert('Veuillez entrer un nom.')
  departments.value.push({
    id: Date.now(),
    name: newDept.value.name,
    desc: newDept.value.desc,
    employees: []
  })
  newDept.value = { name: '', desc: '' }
  showForm.value = false
}
</script>
<style scoped>
</style>