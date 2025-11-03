<template>
  <aside class="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-screen">
    <div class="p-6 flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">GA</div>
      <div>
        <div class="text-gray-800 dark:text-gray-100 font-semibold">Gestion RH</div>
        <div class="text-xs text-gray-400">Admin</div>
      </div>
    </div>

    <nav class="p-4 space-y-1">
      <router-link to="/admin" class="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" active-class="bg-blue-100 text-blue-600">Tableau</router-link>
      <router-link to="/admin/employees" class="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Employés</router-link>
      <router-link to="/admin/presences" class="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Présences</router-link>
      <router-link to="/admin/paie" class="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Paiement</router-link>
      <router-link to="/chat" class="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Messages</router-link>
      <button @click="toggleDark" class="mt-4 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Basculer thème</button>
    </nav>
  </aside>
</template>

<script setup>
const toggleDark = () => {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
</script>
