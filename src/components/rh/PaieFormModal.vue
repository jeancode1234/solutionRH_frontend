<template>
  <div v-if="visible" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div
      class="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fadeIn"
    >
      <!-- 🧭 Header -->
      <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {{ isEditing ? 'Modifier une fiche de paie' : 'Créer une fiche de paie' }}
        </h3>
        <button
          @click="close"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          ✕
        </button>
      </div>

      <!-- 📄 Formulaire -->
      <form @submit.prevent="handleSubmit" class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Employé</label>
          <select
            v-model="form.employee"
            required
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option disabled value="">Sélectionner...</option>
            <option v-for="emp in employees" :key="emp.id" :value="emp.name">
              {{ emp.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Poste</label>
          <input
            v-model="form.poste"
            type="text"
            required
            placeholder="Ex: Comptable"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Département</label>
          <input
            v-model="form.departement"
            type="text"
            required
            placeholder="Ex: Finance"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Période</label>
          <input
            v-model="form.period"
            type="month"
            required
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- 💰 Données salariales -->
        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Salaire de base (FCFA)</label>
          <input
            v-model.number="form.base"
            type="number"
            min="0"
            required
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Primes (total FCFA)</label>
          <input
            v-model.number="form.primes"
            type="number"
            min="0"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Retenues (total FCFA)</label>
          <input
            v-model.number="form.retenues"
            type="number"
            min="0"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-600 dark:text-gray-300 mb-1">Taux d’imposition (%)</label>
          <input
            v-model.number="form.taxRate"
            type="number"
            min="0"
            max="50"
            step="0.1"
            class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- 🧮 Calcul automatique -->
        <div class="col-span-1 md:col-span-2 mt-2 bg-gray-100 dark:bg-gray-900 p-3 rounded-lg">
          <p class="text-sm text-gray-700 dark:text-gray-300">
            <strong>Net à payer :</strong>
            {{ netAPayer.toLocaleString() }} FCFA
          </p>
        </div>

        <!-- ✅ Boutons -->
        <div class="col-span-1 md:col-span-2 flex justify-end gap-3 mt-2">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {{ isEditing ? 'Mettre à jour' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps({
  visible: Boolean,
  editData: Object,
})

const emit = defineEmits(['close', 'saved'])

const store = useStore()

// 👥 Liste fictive d’employés (ou via store plus tard)
const employees = ref([
  { id: 1, name: 'Alice Dupont' },
  { id: 2, name: 'Jean Mbarga' },
  { id: 3, name: 'Fatou Ndiaye' },
])

// 🔧 Formulaire initial
const form = ref({
  id: null,
  employee: '',
  poste: '',
  departement: '',
  period: '',
  base: 0,
  primes: 0,
  retenues: 0,
  taxRate: 5,
  statut: 'En attente',
  createdAt: new Date().toISOString(),
})

// 🧮 Calcul automatique du net à payer
const netAPayer = computed(() => {
  const base = form.value.base || 0
  const primes = form.value.primes || 0
  const retenues = form.value.retenues || 0
  const tax = (base * (form.value.taxRate || 0)) / 100
  return Math.max(base + primes - retenues - tax, 0)
})

// 🛠️ Pré-remplir si édition
const isEditing = computed(() => !!props.editData)

watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal }
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// 🧹 Réinitialisation
function resetForm() {
  form.value = {
    id: null,
    employee: '',
    poste: '',
    departement: '',
    period: '',
    base: 0,
    primes: 0,
    retenues: 0,
    taxRate: 5,
    statut: 'En attente',
    createdAt: new Date().toISOString(),
  }
}

// 📝 Enregistrer ou mettre à jour
function handleSubmit() {
  const data = { ...form.value, net: netAPayer.value }

  if (isEditing.value) {
    store.commit('paie/updateFiche', data)
    toast.success('✅ Fiche de paie mise à jour avec succès !')
  } else {
    data.id = Date.now()
    store.commit('paie/addFiche', data)
    toast.success('💾 Fiche de paie enregistrée avec succès !')
  }

  emit('saved', data)
  close()
}

// ❌ Fermer
function close() {
  resetForm()
  emit('close')
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.25s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
