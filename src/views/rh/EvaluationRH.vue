<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-2">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Évaluations du personnel</h2>
      <select
        v-model="selectedDept"
        class="p-2 border rounded dark:bg-gray-900 dark:text-gray-100"
      >
        <option value="">Tous les départements</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.name">
          {{ dept.name }}
        </option>
      </select>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="emp in filteredEmployees"
        :key="emp.id"
        class="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
      >
        <h3 class="font-medium text-gray-800 dark:text-gray-200">{{ emp.name }}</h3>
        <p class="text-sm text-gray-500 mb-2">{{ emp.dept }}</p>

        <!-- Notation étoiles -->
        <div class="flex items-center mb-3">
          <span
            v-for="i in 5"
            :key="i"
            @click="rateEmployee(emp, i)"
            class="cursor-pointer text-2xl"
            :class="i <= emp.rating ? 'text-yellow-400' : 'text-gray-400'"
          >
            ★
          </span>
        </div>

        <textarea
          v-model="emp.comment"
          placeholder="Ajouter un commentaire..."
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-gray-100"
        ></textarea>

        <button
          @click="saveEvaluation(emp)"
          class="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const departments = ref([
  { id: 1, name: 'Informatique' },
  { id: 2, name: 'Comptabilité' },
  { id: 3, name: 'RH' }
])

const employees = ref([
  { id: 1, name: 'Alice Dupont', dept: 'Informatique', rating: 4, comment: '' },
  { id: 2, name: 'Jean Mbarga', dept: 'Comptabilité', rating: 3, comment: '' },
  { id: 3, name: 'Fatou Ndiaye', dept: 'RH', rating: 5, comment: '' }
])

const selectedDept = ref('')

const filteredEmployees = computed(() =>
  selectedDept.value
    ? employees.value.filter(e => e.dept === selectedDept.value)
    : employees.value
)

function rateEmployee(emp, stars) {
  emp.rating = stars
}

function saveEvaluation(emp) {
  alert(`Évaluation enregistrée pour ${emp.name} (${emp.rating}⭐)`)
}
</script>
<style scoped>
</style>