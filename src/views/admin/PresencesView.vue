<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
    <AdminSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <main class="p-6 overflow-y-auto">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700">
          <h3 class="font-semibold mb-4">Suivi des présences</h3>
          <table class="min-w-full text-sm">
            <thead class="text-left text-gray-500 dark:text-gray-300 border-b dark:border-gray-700">
              <tr><th>Employé</th><th>Date</th><th>Arrivée</th><th>Sortie</th><th>Statut</th></tr>
            </thead>
            <tbody>
              <tr v-for="p in presences" :key="p.id" class="border-b dark:border-gray-700">
                <td class="py-2">{{ p.nom }}</td><td>{{ p.date }}</td><td>{{ p.arrivee }}</td><td>{{ p.sortie }}</td><td><span :class="p.status==='Présent' ? 'text-green-500' : 'text-red-500'">{{ p.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
const presences = [
  {id:1, nom:'Jean Dupont', date:'21/10/2025', arrivee:'08:02', sortie:'17:01', status:'Présent'},
  {id:2, nom:'Sarah Kone', date:'21/10/2025', arrivee:'08:05', sortie:'17:10', status:'Présent'},
  {id:3, nom:'Moussa Traoré', date:'21/10/2025', arrivee:'-', sortie:'-', status:'Absent'}
]
</script>
