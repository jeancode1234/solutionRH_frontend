<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Mes bulletins de paie</h1>
    <ul class="space-y-3">
      <li v-for="b in bulletins" :key="b.id" class="flex justify-between bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
        <div>
          <h3 class="font-semibold">{{ b.mois }}</h3>
          <p class="text-sm text-gray-500">Salaire net : {{ b.montant }} FCFA</p>
        </div>
        <button class="text-blue-600 hover:underline">Télécharger</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const bulletins = [
  { id: 1, mois: "Septembre 2025", montant: "300 000" },
  { id: 2, mois: "Août 2025", montant: "295 000" },
  { id: 3, mois: "Juillet 2025", montant: "290 000" }
]
</script>
<style scoped>
</style>