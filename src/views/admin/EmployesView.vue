<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
    <AdminSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <main class="p-6 overflow-y-auto">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Liste des employés</h3>
            <input v-model="q" placeholder="Rechercher..." class="px-3 py-2 rounded-lg border dark:border-gray-700" />
          </div>

          <table class="min-w-full text-sm">
            <thead class="text-left text-gray-500 dark:text-gray-300 border-b dark:border-gray-700">
              <tr><th>Nom</th><th>Poste</th><th>Département</th><th></th></tr>
            </thead>
            <tbody>
              <tr v-for="e in filtered" :key="e.id" class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="py-2">{{ e.nom }}</td>
                <td>{{ e.poste }}</td>
                <td>{{ e.dept }}</td>
                <td><button @click="open(e)" class="text-blue-600">Voir</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- fiche employé -->
        <div v-if="current" class="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700">
          <h3 class="font-semibold mb-3">Fiche : {{ current.nom }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span class="font-medium">Poste:</span> {{ current.poste }}</p>
              <p><span class="font-medium">Département:</span> {{ current.dept }}</p>
              <p><span class="font-medium">Date d'entrée:</span> {{ current.date }}</p>
            </div>
            <div>
              <p class="font-medium">Documents:</p>
              <ul class="text-sm text-gray-500">
                <li v-for="d in current.docs" :key="d">{{ d }}</li>
              </ul>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
import { ref, computed } from 'vue'

const employees = ref([
  { id:1, nom:'Jean Dupont', poste:'Dev', dept:'IT', date:'02/02/2025', docs:['contrat.pdf','cv.pdf']},
  { id:2, nom:'Sarah Kone', poste:'RH', dept:'RH', date:'10/01/2025', docs:['contrat.pdf']},
  { id:3, nom:'Moussa Traoré', poste:'Comptable', dept:'Finance', date:'22/12/2024', docs:[]}
])
const q = ref('')
const current = ref(null)
const filtered = computed(()=> employees.value.filter(e => e.nom.toLowerCase().includes(q.value.toLowerCase())))

function open(e){ current.value = e }
</script>
