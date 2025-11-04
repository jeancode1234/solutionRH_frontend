<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
  >
    <div
      class="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fadeIn"
    >
      <!-- 🧭 Header -->
      <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
          ⚙️ Paramètres de paie
        </h3>
        <button
          @click="close"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
        >
          ✕
        </button>
      </div>

      <!-- 📋 Formulaire principal -->
      <form @submit.prevent="saveSettings" class="p-4 space-y-6">
        <!-- 💰 Taux généraux -->
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Taux d’imposition (%)
            </label>
            <input
              v-model.number="settings.taxRate"
              type="number"
              min="0"
              max="50"
              step="0.1"
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Taux CNPS (%)
            </label>
            <input
              v-model.number="settings.cnpsRate"
              type="number"
              min="0"
              max="20"
              step="0.1"
              class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <!-- 🎯 Primes automatiques -->
        <div>
          <h4 class="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Primes automatiques
          </h4>
          <div class="space-y-2">
            <div
              v-for="(p, index) in settings.primesAuto"
              :key="index"
              class="flex items-center gap-2"
            >
              <input
                v-model="p.poste"
                type="text"
                placeholder="Poste (ex : Manager)"
                class="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <input
                v-model.number="p.montant"
                type="number"
                placeholder="Montant FCFA"
                class="w-32 p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                @click="removePrime(index)"
                class="text-red-500 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>

          <button
            type="button"
            @click="addPrime"
            class="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Ajouter une prime
          </button>
        </div>

        <!-- 📈 Barème ancienneté -->
        <div>
          <h4 class="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Barème d’ancienneté
          </h4>
          <div class="space-y-2">
            <div
              v-for="(b, index) in settings.barèmes"
              :key="index"
              class="flex items-center gap-2"
            >
              <input
                v-model.number="b.annees"
                type="number"
                min="0"
                class="w-24 p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <span class="text-gray-600 dark:text-gray-300">ans →</span>
              <input
                v-model.number="b.prime"
                type="number"
                placeholder="Prime FCFA"
                class="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                @click="removeBarème(index)"
                class="text-red-500 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>

          <button
            type="button"
            @click="addBarème"
            class="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Ajouter une ligne
          </button>
        </div>

        <!-- ✅ Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits(['close'])
const store = useStore()

// ⚙️ Paramètres initiaux
const settings = ref({
  taxRate: 5,
  cnpsRate: 4.2,
  primesAuto: [{ poste: 'Manager', montant: 50000 }],
  barèmes: [{ annees: 5, prime: 30000 }],
})

// Charger paramètres depuis le store (ou localStorage)
watch(
  () => props.visible,
  (v) => {
    if (v) {
      const data = store.state.paie.settings || {}
      settings.value = Object.assign({}, settings.value, data)
    }
  }
)

// ➕ Ajout / suppression
function addPrime() {
  settings.value.primesAuto.push({ poste: '', montant: 0 })
}
function removePrime(i) {
  settings.value.primesAuto.splice(i, 1)
}

function addBarème() {
  settings.value.barèmes.push({ annees: 0, prime: 0 })
}
function removeBarème(i) {
  settings.value.barèmes.splice(i, 1)
}

// 💾 Sauvegarde
function saveSettings() {
  store.commit('paie/updateSettings', settings.value)
  toast.success('✅ Paramètres de paie enregistrés avec succès')
  close()
}

function close() {
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
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
