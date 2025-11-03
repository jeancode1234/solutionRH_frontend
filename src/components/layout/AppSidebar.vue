<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
    <!-- Filtres et recherche -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <div class="flex items-center gap-2">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher (employé, chef, texte)..."
          class="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <select v-model="filterPeriod" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
          <option value="">Toutes périodes</option>
          <option value="quotidien">Quotidien</option>
          <option value="hebdomadaire">Hebdomadaire</option>
          <option value="mensuel">Mensuel</option>
          <option value="annuel">Annuel</option>
        </select>
        <select v-model="filterStatus" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
          <option value="">Tous statuts</option>
          <option>En attente</option>
          <option>Validé</option>
          <option>Refusé</option>
        </select>
      </div>

```
  <div class="flex items-center gap-2">
    <label class="text-sm text-gray-600 dark:text-gray-300 mr-2">Par page</label>
    <select v-model.number="itemsPerPage" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="20">20</option>
    </select>
  </div>
</div>

<!-- Actions Import / Export -->
<div class="flex flex-wrap justify-end gap-2 mb-3">
  <label class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded cursor-pointer">
    Importer
    <input type="file" class="hidden" @change="handleImport" accept=".xlsx,.json" />
  </label>
  <button @click="exportAsPDF" class="px-3 py-1 bg-red-500 text-white rounded">Exporter PDF</button>
  <button @click="exportAsWord" class="px-3 py-1 bg-blue-500 text-white rounded">Exporter Word</button>
  <button @click="exportAsExcel" class="px-3 py-1 bg-green-500 text-white rounded">Exporter Excel</button>
</div>

<!-- Tableau -->
<div class="overflow-x-auto">
  <table class="min-w-full text-sm border dark:border-gray-700">
    <thead class="bg-gray-100 dark:bg-gray-700 text-left">
      <tr>
        <th class="p-3">#</th>
        <th class="p-3">Période</th>
        <th class="p-3">Employé</th>
        <th class="p-3">Auteur</th>
        <th class="p-3">Résumé</th>
        <th class="p-3">Productivité</th>
        <th class="p-3">Qualité</th>
        <th class="p-3">Date</th>
        <th class="p-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(r, idx) in paginated"
        :key="r.id"
        class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <td class="p-3">{{ startIndex + idx + 1 }}</td>
        <td class="p-3 capitalize">{{ r.period }}</td>
        <td class="p-3">{{ r.employee }}</td>
        <td class="p-3">{{ r.auteur || r.chef || '—' }}</td>
        <td class="p-3 max-w-xs truncate">{{ r.tasks }}</td>
        <td class="p-3">{{ r.prodPercent ?? '—' }}%</td>
        <td class="p-3">{{ r.quality ?? '—' }}/10</td>
        <td class="p-3">{{ r.date }}</td>
        <td class="p-3 text-center space-x-2">
          <button v-if="role === 'rh'" @click="validate(r)" class="text-green-600 hover:underline">Valider</button>
          <button v-if="role === 'rh'" @click="reject(r)" class="text-red-600 hover:underline">Refuser</button>
          <button v-if="role === 'chef' || role === 'rh'" @click="viewDetails(r)" class="text-blue-600 hover:underline">
            Voir
          </button>
          <button v-if="role === 'employee' && r.auteur === userName" @click="editLocal(r)" class="text-indigo-600 hover:underline">
            Modifier
          </button>
        </td>
      </tr>
      <tr v-if="filtered.length === 0">
        <td colspan="9" class="p-3 text-center text-gray-500">Aucun rapport trouvé</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Pagination -->
<div class="mt-4 flex items-center justify-between text-sm">
  <div class="text-gray-600 dark:text-gray-300">
    Affichage {{ startIndex + 1 }} - {{ Math.min(startIndex + paginated.length, filtered.length) }} sur
    {{ filtered.length }}
  </div>
  <div class="flex items-center gap-2">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
    >
      Précédent
    </button>
    <div class="flex gap-1">
      <button
        v-for="p in pageButtons"
        :key="p"
        @click="currentPage = p"
        :class="['px-3 py-1 rounded', p === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700']"
      >
        {{ p }}
      </button>
    </div>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages || totalPages === 0"
      class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
    >
      Suivant
    </button>
  </div>
</div>

<!-- Modal détail -->
<div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
  <div class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
    <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
      <h3 class="font-semibold">{{ selected.employee }} — Rapport</h3>
      <button @click="selected = null" class="text-gray-600 dark:text-gray-300">✕</button>
    </div>
    <div class="p-4 space-y-3">
      <p><strong>Période :</strong> {{ selected.period }}</p>
      <p>
        <strong>Résumé / tâches :</strong> <br />
        <span class="whitespace-pre-line">{{ selected.tasks }}</span>
      </p>
      <p><strong>Temps total :</strong> {{ selected.totalTime ?? '—' }} heures</p>
      <p><strong>% productif :</strong> {{ selected.prodPercent ?? '—' }}%</p>
      <p><strong>% non productif :</strong> {{ selected.nonProdPercent ?? '—' }}%</p>
      <p><strong>Qualité :</strong> {{ selected.quality ?? '—' }}/10</p>
      <p><strong>Date :</strong> {{ selected.date }}</p>
    </div>
    <div class="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
      <button @click="downloadReport(selected)" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
        Télécharger
      </button>
      <button @click="selected = null" class="px-3 py-1 bg-blue-600 text-white rounded">Fermer</button>
    </div>
  </div>
</div>
```

  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { exportReportsToPDF, exportReportsToWord, exportReportsToExcel } from '@/utils/exportUtils'
import { importReportsFromExcel, importReportsFromJSON } from '@/utils/importUtils'

const props = defineProps({
  role: { type: String, default: 'rh' },
  userName: { type: String, default: 'Chef' }
})

const store = useStore()

// États UI
const search = ref('')
const filterPeriod = ref('')
const filterStatus = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const selected = ref(null)

// Récupérer rapports depuis store
const allReports = computed(() => store.state.rapports?.rapports ?? [])

// Filtrage par rôle
const roleFiltered = computed(() => {
  if (props.role === 'rh') return allReports.value
  if (props.role === 'chef')
    return allReports.value.filter(
      r => r.auteur === props.userName || r.chef === props.userName || r.departement === undefined
    )
  if (props.role === 'employee')
    return allReports.value.filter(r => r.employee === props.userName || r.auteur === props.userName)
  return allReports.value
})

// Filtrage texte + période + statut
const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return roleFiltered.value.filter(r => {
    if (filterPeriod.value && r.period !== filterPeriod.value) return false
    if (filterStatus.value && r.status !== filterStatus.value) return false
    if (!q) return true
    return (
      (r.employee && r.employee.toLowerCase().includes(q)) ||
      (r.auteur && r.auteur.toLowerCase().includes(q)) ||
      (r.tasks && r.tasks.toLowerCase().includes(q)) ||
      (r.summary && r.summary.toLowerCase().includes(q))
    )
  })
})

// Pagination
const totalPages = computed(() => Math.ceil(filtered.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const paginated = computed(() => filtered.value.slice(startIndex.value, startIndex.value + itemsPerPage.value))
const pageButtons = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

// Import / Export
async function handleImport(e) {
  const file = e.target.files[0]
  if (!file) return
  let imported = []
  if (file.name.endsWith('.xlsx')) imported = await importReportsFromExcel(file)
  else if (file.name.endsWith('.json')) imported = await importReportsFromJSON(file)
  if (imported.length) {
    store.commit('rapports/addReports', imported)
    alert(`${imported.length} rapport(s) importé(s)`)
  }
}
function exportAsPDF() {
  exportReportsToPDF(filtered.value)
}
function exportAsWord() {
  exportReportsToWord(filtered.value)
}
function exportAsExcel() {
  exportReportsToExcel(filtered.value)
}

// Actions
function validate(r) {
  r.status = 'Validé'
}
function reject(r) {
  r.status = 'Refusé'
}
function viewDetails(r) {
  selected.value = r
}
function editLocal(r) {
  const newTasks = prompt('Modifier le contenu du rapport', r.tasks)
  if (newTasks !== null) r.tasks = newTasks
}
function downloadReport(r) {
  const blob = new Blob([JSON.stringify(r, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `rapport_${r.employee || 'report'}_${r.id || Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
table td,
table th {
  vertical-align: middle;
}
</style>
