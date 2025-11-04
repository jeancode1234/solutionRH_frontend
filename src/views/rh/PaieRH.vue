<template>
  <div class="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-xl shadow min-h-screen transition">
    <!-- 🧭 En-tête -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">💰 Gestion des fiches de paie</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          Création, validation et suivi des fiches de paie des employés
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button @click="openForm" class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          ➕ Nouvelle fiche
        </button>
        <button @click="openSettings" class="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded">
          ⚙️ Paramètres
        </button>
      </div>
    </div>

    <!-- 🔍 Filtres -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div class="flex flex-wrap gap-2 items-center">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher un employé..."
          class="p-2 border rounded dark:bg-gray-800 dark:text-white"
        />
        <select v-model="filterDept" class="p-2 border rounded dark:bg-gray-800 dark:text-white">
          <option value="">Tous départements</option>
          <option v-for="d in departements" :key="d">{{ d }}</option>
        </select>
        <select v-model="filterStatus" class="p-2 border rounded dark:bg-gray-800 dark:text-white">
          <option value="">Tous statuts</option>
          <option>En attente</option>
          <option>Validée</option>
          <option>Payée</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <label class="text-gray-600 dark:text-gray-300 text-sm">Par page :</label>
        <select v-model.number="itemsPerPage" class="p-2 border rounded dark:bg-gray-800 dark:text-white">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>
    </div>

    <!-- 📤 Actions Import/Export -->
    <div class="flex flex-wrap justify-end gap-2 mb-4">
      <label class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded cursor-pointer text-sm">
        📥 Importer
        <input type="file" class="hidden" @change="handleImport" accept=".xlsx,.json" />
      </label>
      <button @click="exportAsPDF" class="px-3 py-1 bg-red-500 text-white rounded text-sm">PDF</button>
      <button @click="exportAsWord" class="px-3 py-1 bg-blue-500 text-white rounded text-sm">Word</button>
      <button @click="exportAsExcel" class="px-3 py-1 bg-green-500 text-white rounded text-sm">Excel</button>
    </div>

    <!-- 🧾 Tableau principal -->
    <div class="overflow-x-auto rounded-lg border dark:border-gray-700">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr class="text-left text-gray-700 dark:text-gray-200">
            <th class="p-3">#</th>
            <th class="p-3">Employé</th>
            <th class="p-3">Poste</th>
            <th class="p-3">Département</th>
            <th class="p-3">Période</th>
            <th class="p-3">Salaire Net (FCFA)</th>
            <th class="p-3">Statut</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(f, idx) in paginated"
            :key="f.id"
            class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <td class="p-3">{{ startIndex + idx + 1 }}</td>
            <td class="p-3">{{ f.nom }}</td>
            <td class="p-3">{{ f.poste }}</td>
            <td class="p-3">{{ f.departement }}</td>
            <td class="p-3">{{ f.periode }}</td>
            <td class="p-3">{{ f.salaireNet.toLocaleString() }}</td>
            <td class="p-3">
              <span
                :class="[
                  'px-2 py-1 rounded text-xs',
                  f.statut === 'En attente' ? 'bg-yellow-100 text-yellow-700' :
                  f.statut === 'Validée' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                ]"
              >
                {{ f.statut }}
              </span>
            </td>
            <td class="p-3 text-center space-x-2">
              <button @click="openForm(f)" class="text-indigo-600 hover:underline">Modifier</button>
              <button @click="deleteFiche(f.id)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td colspan="8" class="text-center py-4 text-gray-500 dark:text-gray-400">Aucune fiche trouvée</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 📄 Pagination -->
    <div class="flex items-center justify-between text-sm mt-4">
      <span class="text-gray-600 dark:text-gray-300">
        Affichage {{ startIndex + 1 }} - {{ Math.min(startIndex + paginated.length, filtered.length) }} sur
        {{ filtered.length }}
      </span>

      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>

    <!-- 📊 Section Statistiques -->
    <div class="mt-10">
      <PaieStats />
    </div>

    <!-- 🪟 Modales -->
    <PaieFormModal v-if="showForm" :fiche="selectedFiche" @click="closeForm" />
    <PaieSettingsModal v-if="showSettings" @click="showSettings = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { toast } from 'vue3-toastify'
import PaieFormModal from '@/components/rh/PaieFormModal.vue'
import PaieSettingsModal from '@/components/rh/PaieSettingsModal.vue'
import PaieStats from '@/components/rh/PaieStats.vue'
import { exportPaiesToPDF, exportPaiesToWord, exportPaiesToExcel } from '@/utils/exportUtils'
import { importPaiesFromExcel, importPaiesFromJSON } from '@/utils/importUtils'

const store = useStore()


// Filtres
const search = ref('')
const filterDept = ref('')
const filterStatus = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

const showForm = ref(false)
const showSettings = ref(false)
const selectedFiche = ref(null)

const departements = computed(() => [...new Set(store.state.paie.fiches.map((f) => f.departement))])

// Données filtrées
const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return store.state.paie.fiches.filter((f) => {
    if (filterDept.value && f.departement !== filterDept.value) return false
    if (filterStatus.value && f.statut !== filterStatus.value) return false
    return (
      f.nom.toLowerCase().includes(q) ||
      f.poste.toLowerCase().includes(q) ||
      f.departement.toLowerCase().includes(q)
    )
  })
})

// Pagination
const totalPages = computed(() => Math.ceil(filtered.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const paginated = computed(() => filtered.value.slice(startIndex.value, startIndex.value + itemsPerPage.value))
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

// Actions
function openForm(fiche) {
  selectedFiche.value = fiche
  showForm.value = true
}
function closeForm() {
  showForm.value = false
  selectedFiche.value = null
}
function openSettings() {
  showSettings.value = true
}
function deleteFiche(id) {
  if (confirm('Supprimer cette fiche de paie ?')) {
    store.commit('paie/deleteFiche', id)
    toast.success('Fiche supprimée avec succès')
  }
}

// Import / Export
async function handleImport(e) {
  const file = e.target.files[0]
  if (!file) return
  let imported = []

  if (file.name.endsWith('.xlsx')) imported = await importPaiesFromExcel(file)
  else if (file.name.endsWith('.json')) imported = await importPaiesFromJSON(file)

  if (imported.length) {
    store.dispatch('paie/importFiches', imported)
    toast.success(`${imported.length} fiche(s) importée(s) avec succès`)
  }
}

function exportAsPDF() {
  exportPaiesToPDF(filtered.value)
  toast.info('Export PDF lancé')
}
function exportAsWord() {
  exportPaiesToWord(filtered.value)
  toast.info('Export Word lancé')
}
function exportAsExcel() {
  exportPaiesToExcel(filtered.value)
  toast.info('Export Excel lancé')
}
</script>

<style scoped>
table td,
table th {
  vertical-align: middle;
}
</style>
