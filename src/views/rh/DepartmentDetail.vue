<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
      Détails du département : {{ department.name }}
    </h2>

    <div class="mb-6">
      <h3 class="font-medium text-gray-700 dark:text-gray-200 mb-2">Employés affectés</h3>
      <ul class="list-disc ml-5 text-gray-800 dark:text-gray-200">
        <li v-for="emp in department.employees" :key="emp.id">{{ emp.name }}</li>
      </ul>
    </div>

    <div>
      <h3 class="font-medium text-gray-700 dark:text-gray-200 mb-2">Affecter un employé</h3>
      <select v-model="selectedEmployee" class="p-2 border rounded dark:bg-gray-900 dark:text-gray-100">
        <option disabled value="">Sélectionner...</option>
        <option v-for="emp in employees" :key="emp.id" :value="emp">{{ emp.name }}</option>
      </select>
      <button
        @click="assignEmployee"
        class="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Affecter
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedEmployee = ref('')
const employees = ref([
  { id: 1, name: 'Alice Dupont' },
  { id: 2, name: 'Jean Mbarga' },
  { id: 3, name: 'Fatou Ndiaye' }
])

const department = ref({ id: null, name: '', employees: [] })

onMounted(() => {
  const mockDept = {
    1: { id: 1, name: 'Informatique', employees: [employees.value[0]] },
    2: { id: 2, name: 'Comptabilité', employees: [employees.value[2]] },
    3: { id: 3, name: 'Ressources Humaines', employees: [] }
  }
  department.value = mockDept[route.params.id] || { id: 0, name: 'Inconnu', employees: [] }
})

function assignEmployee() {
  if (!selectedEmployee.value) return
  department.value.employees.push(selectedEmployee.value)
  selectedEmployee.value = ''
}
</script>
<style scoped>
</style>