<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <h2 class="text-xl font-semibold mb-4">Mes Bulletins de Paie</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm border dark:border-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="p-3 text-left">Mois</th>
            <th class="p-3 text-center">Montant Net</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(b, i) in bulletins" :key="i" class="border-b dark:border-gray-700">
            <td class="p-3">{{ b.mois }}</td>
            <td class="p-3 text-center">{{ b.net.toLocaleString() }} FCFA</td>
            <td class="p-3 text-center">
              <button class="text-blue-600 hover:underline">Télécharger PDF</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const bulletins = [
  { mois: 'Septembre 2025', net: 450000 },
  { mois: 'Août 2025', net: 440000 }
]
</script>
