 <template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md min-h-screen">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-3">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Évaluations du personnel</h2>
      <select v-model="selectedFilter" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
        <option value="">Tous</option>
        <option>Excellente</option>
        <option>Bonne</option>
        <option>À améliorer</option>
      </select>
    </div>

    <!-- Liste des employés -->
    <div v-for="emp in filteredEmployees" :key="emp.id" class="border-b dark:border-gray-700 py-4">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="font-medium text-gray-800 dark:text-gray-100">{{ emp.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ emp.role }}</p>
        </div>

        <!-- Étoiles de notation -->
        <div class="flex gap-1">
          <i
            v-for="n in 5"
            :key="n"
            @click="rateEmployee(emp, n)"
            class="ri-star-fill cursor-pointer text-xl"
            :class="n <= emp.rating ? 'text-yellow-400' : 'text-gray-400'"
          ></i>
        </div>
      </div>

      <!-- Commentaire -->
      <textarea
        v-model="emp.comment"
        placeholder="Ajouter un commentaire..."
        class="w-full mt-3 p-2 border rounded dark:bg-gray-800 dark:text-white"
      ></textarea>
    </div>

    <div class="mt-6 flex justify-end">
      <button
        @click="saveEvaluations"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Enregistrer les évaluations
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedFilter = ref('')
const employees = ref([
  { id: 1, name: 'Alice Dupont', role: 'Analyste RH', rating: 4, comment: '' },
  { id: 2, name: 'Jean Mbarga', role: 'Comptable', rating: 5, comment: '' },
  { id: 3, name: 'Fatou Ndiaye', role: 'Assistante', rating: 3, comment: '' }
])

const filteredEmployees = computed(() => {
  if (!selectedFilter.value) return employees.value
  const thresholds = {
    Excellente: 5,
    Bonne: 4,
    'À améliorer': 3
  }
  return employees.value.filter((e) => e.rating === thresholds[selectedFilter.value])
})

function rateEmployee(emp, stars) {
  emp.rating = stars
}
function saveEvaluations() {
  alert('Évaluations enregistrées avec succès ✅')
}
</script>
<style scoped>
</style>