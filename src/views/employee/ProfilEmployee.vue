<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <h2 class="text-xl font-semibold mb-4">Mon Profil</h2>

    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex flex-col items-center md:w-1/3">
        <img src="https://i.pravatar.cc/150?img=32" class="w-32 h-32 rounded-full border-4 border-blue-500" />
        <h3 class="mt-3 font-medium text-lg">{{ profil.nom }}</h3>
        <p class="text-gray-500 dark:text-gray-400">{{ profil.poste }}</p>
      </div>

      <div class="md:w-2/3 space-y-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="text-gray-500 text-sm">Email</label>
            <input v-model="profil.email" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100" />
          </div>
          <div>
            <label class="text-gray-500 text-sm">Téléphone</label>
            <input v-model="profil.telephone" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100" />
          </div>
          <div>
            <label class="text-gray-500 text-sm">Département</label>
            <input v-model="profil.departement" disabled class="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100" />
          </div>
          <div>
            <label class="text-gray-500 text-sm">Date d’embauche</label>
            <input v-model="profil.dateEmbauche" disabled class="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-100" />
          </div>
        </div>

        <button @click="updateProfil" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          💾 Enregistrer les modifications
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const profil = ref({
  nom: 'Jean Dupont',
  poste: 'Développeur Frontend',
  email: 'jean.dupont@entreprise.com',
  telephone: '699 45 78 12',
  departement: 'Informatique',
  dateEmbauche: '2021-03-15'
})

function updateProfil() {
  alert('Profil mis à jour avec succès ✅')
}
</script>
