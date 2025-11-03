<template>
  <div class="">
     <div class="flex h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
    <AdminSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />
      <main class="p-6 overflow-y-auto">

        <h1 class="text-2xl font-semibold mb-6">Gestion de la paie</h1>
        <ul class="space-y-4">
          <li v-for="p in bulletins" :key="p.id" class="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700">
            <div>
              <h3 class="font-semibold text-gray-800 dark:text-gray-100">{{ p.nom }}</h3>
              <p class="text-sm text-gray-500">Salaire net : {{ p.montant }} FCFA</p>
            </div>
            <button class="text-blue-600 hover:underline">Télécharger</button>
          </li>
        </ul>
      </main>
    </div>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'
import AdminHeader from '@/components/admin/AdminHeader.vue'
const bulletins = [
  { id: 1, nom: "Jean Dupont — Septembre 2025", montant: "350 000" },
  { id: 2, nom: "Sarah Kone — Septembre 2025", montant: "480 000" },
  { id: 3, nom: "Moussa Traoré — Septembre 2025", montant: "410 000" }
]
</script>
<style scoped>
</style>