<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-colors duration-300">
    <!-- 🔍 Filtres et recherche -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <div class="flex items-center gap-2 flex-wrap">
        <input
          v-model="search"
          type="text"
          placeholder="Rechercher (employé, chef, texte)..."
          class="p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

```
    <select v-model="filterPeriod" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
      <option value="">Toutes périodes</option>
      <option value="quotidien">Quotidien</option>
      <option value="hebdomadaire">Hebdomadaire</option>
      <option value="mensuel">Mensuel</option>
      <option value="annuel">Annuel</option>
    </select>

    <select v-model="filterStatus" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
      <option value="">Tous statuts</option>
      <option value="En attente">En attente</option>
      <option value="Validé">Validé</option>
      <option value="Refusé">Refusé</option>
    </select>
  </div>

  <div class="flex items-center gap-2">
    <label class="text-sm text-gray-600 dark:text-gray-300 mr-2">Par page</label>
    <select v-model.number="itemsPerPage" class="p-2 border rounded dark:bg-gray-700 dark:text-white">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="20">20</option>
    </select>
  </div>
</div>

<!-- 🔄 Actions Import/Export -->
<div class="flex flex-wrap justify-end gap-2 mb-3">
  <label class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition">
    Importer
    <input type="file" class="hidden" @change="handleImport" accept=".xlsx,.json" />
  </label>
  <button @click="exportAsPDF" class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">Exporter PDF</button>
  <button @click="exportAsWord" class="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">Exporter Word</button>
  <button @click="exportAsExcel" class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded">Exporter Excel</button>
</div>

<!-- 🧾 Tableau -->
<div class="overflow-x-auto rounded-lg border dark:border-gray-700">
  <table class="min-w-full text-sm">
    <thead class="bg-gray-100 dark:bg-gray-700 text-left">
      <tr>
        <th class="p-3">#</th>
        <th class="p-3">Période</th>
        <th class="p-3">Employé</th>
        <th class="p-3">Auteur</th>
        <th class="p-3">Résumé</th>
        <th class="p-3">Productivité</th>
        <th class="p-3">Qualité</th>
        <th class="p-3">Statut</th>
        <th class="p-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(r, idx) in paginated"
        :key="r.id"
        class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
      >
        <td class="p-3">{{ startIndex + idx + 1 }}</td>
        <td class="p-3 capitalize">{{ r.period || '—' }}</td>
        <td class="p-3">{{ r.employee }}</td>
        <td class="p-3">{{ r.auteur || r.chef || '—' }}</td>
        <td class="p-3 max-w-xs truncate">{{ r.tasks || '—' }}</td>
        <td class="p-3">{{ r.prodPercent ?? '—' }}%</td>
        <td class="p-3">{{ r.quality ?? '—' }}/10</td>
        <td class="p-3">
          <span
            class="px-3 py-1 rounded-full text-xs font-semibold"
            :class="{
              'bg-yellow-100 text-yellow-700': r.status === 'En attente',
              'bg-green-100 text-green-700': r.status === 'Validé',
              'bg-red-100 text-red-700': r.status === 'Refusé'
            }"
          >
            {{ r.status || 'En attente' }}
          </span>
        </td>
        <td class="p-3 text-center space-x-2">
          <template v-if="role === 'rh'">
            <button @click="validate(r)" class="text-green-600 hover:underline">Valider</button>
            <button @click="confirmReject(r)" class="text-red-600 hover:underline">Refuser</button>
          </template>

          <button @click="viewDetails(r)" class="text-blue-600 hover:underline">Voir</button>

          <button
            v-if="role === 'employee' && r.auteur === userName"
            @click="editLocal(r)"
            class="text-indigo-600 hover:underline"
          >
            Modifier
          </button>
        </td>
      </tr>

      <tr v-if="!filtered.length">
        <td colspan="9" class="text-center p-4 text-gray-500 dark:text-gray-400">Aucun rapport trouvé</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- 📄 Pagination -->
<div class="mt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
  <div class="text-gray-600 dark:text-gray-300">
    Affichage {{ startIndex + 1 }} - {{ Math.min(startIndex + paginated.length, filtered.length) }} sur
    {{ filtered.length }}
  </div>

  <div class="flex items-center gap-2">
    <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50">
      ◀ Précédent
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
      Suivant ▶
    </button>
  </div>
</div>

<!-- 🪟 Modal Détails -->
<transition name="fade">
  <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 class="font-semibold">{{ selected.employee }} — Rapport</h3>
        <button @click="selected = null" class="text-gray-600 dark:text-gray-300">✕</button>
      </div>
      <div class="p-4 space-y-3">
        <p><strong>Période :</strong> {{ selected.period }}</p>
        <p><strong>Tâches :</strong><br /><span class="whitespace-pre-line">{{ selected.tasks }}</span></p>
        <p><strong>Productivité :</strong> {{ selected.prodPercent ?? '—' }}%</p>
        <p><strong>Qualité :</strong> {{ selected.quality ?? '—' }}/10</p>
        <p><strong>Date :</strong> {{ selected.date || '—' }}</p>
      </div>
      <div class="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
        <button @click="downloadReport(selected)" class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded">
          Télécharger
        </button>
        <button @click="selected = null" class="px-3 py-1 bg-blue-600 text-white rounded">Fermer</button>
      </div>
    </div>
  </div>
</transition>
```

  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { exportReportsToPDF, exportReportsToWord, exportReportsToExcel } from '@/utils/exportUtils'
import { importReportsFromExcel, importReportsFromJSON } from '@/utils/importUtils'
import { toastSuccess, toastError, toastInfo, toastWarn, toastConfirm } from '@/utils/toastUtils'

const props = defineProps({
  role: { type: String, default: 'rh' },
  userName: { type: String, default: 'Chef' }
})

const store = useStore()
const search = ref('')
const filterPeriod = ref('')
const filterStatus = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const selected = ref(null)

const allReports = computed(() => store.getters['rapports/all'] ?? [])

const roleFiltered = computed(() => {
  if (props.role === 'rh') return allReports.value
  if (props.role === 'chef') return allReports.value.filter(r => r.chef === props.userName)
  if (props.role === 'employee') return allReports.value.filter(r => r.employee === props.userName)
  return allReports.value
})

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return roleFiltered.value.filter(r => {
    if (filterPeriod.value && r.period !== filterPeriod.value) return false
    if (filterStatus.value && r.status !== filterStatus.value) return false
    return (
      r.employee?.toLowerCase().includes(q) ||
      r.auteur?.toLowerCase().includes(q) ||
      r.tasks?.toLowerCase().includes(q)
    )
  })
})

const totalPages = computed(() => Math.ceil(filtered.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const paginated = computed(() => filtered.value.slice(startIndex.value, startIndex.value + itemsPerPage.value))
const pageButtons = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }
function prevPage() { if (currentPage.value > 1) currentPage.value-- }

// ⚙️ Actions avec toasts
async function validate(r) {
  try {
    await store.dispatch('rapports/validateRapport', r.id)
    toastSuccess(`Rapport de ${r.employee} validé ✅`)
  } catch (err) {
    console.error(err)
    toastError('Erreur lors de la validation.')
  }
}

async function reject(r) {
  try {
    await store.dispatch('rapports/rejectRapport', r.id)
    toastWarn(`Rapport de ${r.employee} rejeté 🚫`)
  } catch (err) {
    console.error(err)
    toastError('Erreur lors du rejet.')
  }
}

function confirmReject(r) {
  toastConfirm(`Voulez-vous vraiment rejeter le rapport de ${r.employee} ?`, () => reject(r))
}

function viewDetails(r) { selected.value = r }

function editLocal(r) {
  const newTasks = prompt('Modifier le contenu du rapport', r.tasks)
  if (newTasks !== null) {
    store.commit('rapports/UPDATE_STATUS', { id: r.id, tasks: newTasks })
    toastInfo('Rapport mis à jour ✏️')
  }
}

function downloadReport(r) {
  const blob = new Blob([JSON.stringify(r, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `rapport_${r.employee || 'report'}_${r.id || Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
  toastSuccess('Rapport téléchargé 📥')
}

// Exports
const exportAsPDF = () => {
  try { exportReportsToPDF(filtered.value); toastSuccess('Export PDF réussi ✅') }
  catch (err) { toastError('Erreur lors de l’export PDF') }
}
const exportAsWord = () => {
  try { exportReportsToWord(filtered.value); toastSuccess('Export Word réussi ✅') }
  catch (err) { toastError('Erreur lors de l’export Word') }
}
const exportAsExcel = () => {
  try { exportReportsToExcel(filtered.value); toastSuccess('Export Excel réussi ✅') }
  catch (err) { toastError('Erreur lors de l’export Excel') }
}

// Imports
async function handleImport(e) {
  try {
    const file = e.target.files[0]
    if (!file) return
    let imported = []
    if (file.name.endsWith('.xlsx')) imported = await importReportsFromExcel(file)
    else if (file.name.endsWith('.json')) imported = await importReportsFromJSON(file)

    if (imported.length) toastSuccess(`${imported.length} rapport(s) importé(s) avec succès !`)
    else toastInfo('Aucun rapport importé.')
  } catch (err) {
    console.error(err)
    toastError('Erreur lors de l’importation.')
  }
}
</script>

<style scoped>
table td,
table th {
  vertical-align: middle;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
