<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-semibold">Paramètres du système</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 space-y-3">
      <h2 class="font-semibold mb-3">Horaires de travail</h2>
      <label class="block text-sm text-gray-600">Heure d’entrée :</label>
      <input type="time" value="08:00" class="border rounded px-3 py-2 dark:bg-gray-700 w-40" />
      <label class="block text-sm text-gray-600 mt-3">Heure de sortie :</label>
      <input type="time" value="17:00" class="border rounded px-3 py-2 dark:bg-gray-700 w-40" />
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 space-y-3">
      <h2 class="font-semibold mb-3">Gestion des rôles</h2>
      <select class="border dark:bg-gray-700 rounded px-3 py-2">
        <option>Administrateur</option>
        <option>Employé</option>
      </select>
      <button class="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>
    </div>
  </div>
</template>
<script setup>
</script>