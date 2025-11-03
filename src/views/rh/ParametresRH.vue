<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Paramètres RH</h2>

    <!-- Profil -->
    <div>
      <h3 class="font-medium mb-2">Profil</h3>
      <div class="flex flex-col sm:flex-row gap-4 items-center">
        <img src="https://via.placeholder.com/80" class="rounded-full" />
        <div class="flex-1">
          <input v-model="profile.name" placeholder="Nom complet" class="w-full p-2 border rounded dark:bg-gray-900 dark:text-gray-100" />
          <input v-model="profile.email" placeholder="Email" class="w-full mt-2 p-2 border rounded dark:bg-gray-900 dark:text-gray-100" />
        </div>
      </div>
      <button
        class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        @click="saveProfile"
      >
        Enregistrer
      </button>
    </div>

    <!-- Langue -->
    <div>
      <h3 class="font-medium mb-2">Langue</h3>
      <select
        v-model="language"
        @change="changeLanguage"
        class="p-2 border rounded dark:bg-gray-900 dark:text-gray-100"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
    </div>

    <!-- Thème -->
    <div class="flex items-center justify-between">
      <h3 class="font-medium">Mode Sombre</h3>
      <label class="flex items-center cursor-pointer">
        <input type="checkbox" v-model="darkMode" @click="toggleDarkMode" class="hidden" />
        <div class="w-10 h-5 bg-gray-300 rounded-full p-1 flex items-center" :class="darkMode ? 'justify-end bg-blue-500' : 'justify-start'">
          <div class="w-4 h-4 bg-white rounded-full shadow"></div>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const profile = ref({
  name: 'Jean RH',
  email: 'rh@entreprise.com'
})
const language = ref(localStorage.getItem('lang') || 'fr')
const darkMode = ref(localStorage.getItem('theme') === 'dark')

function saveProfile() {
  alert('Profil mis à jour !')
}

function changeLanguage() {
  localStorage.setItem('lang', language.value)
  alert('Langue changée : ' + (language.value === 'fr' ? 'Français' : 'English'))
}

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', darkMode.value)
}

watch(() => darkMode.value, val => {
  document.documentElement.classList.toggle('dark', val)
})
</script>
<style scoped>
</style>