<template>
  <div :class="{ dark: isDark }" class="min-h-screen flex bg-gray-50 dark:bg-gray-900">
    <!-- SIDEBAR -->
    <aside
      :class="[
        'fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">RH Panel</h2>
        <button class="md:hidden" @click="sidebarOpen = false">✕</button>
      </div>
      <nav class="p-4 space-y-2">
        <router-link
          v-for="item in menu"
          :key="item.path"
          :to="item.path"
          class="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          active-class="bg-blue-600 text-white"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </aside>

    <!-- MAIN -->
    <div class="flex-1 flex flex-col">
      <!-- TOP BAR -->
      <header class="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        <div class="flex items-center gap-3">
          <button class="md:hidden text-2xl" @click="sidebarOpen = true">☰</button>
          <h1 class="text-lg font-semibold text-gray-700 dark:text-gray-100">Tableau de bord RH</h1>
        </div>
        <div class="flex items-center gap-3">
          <button @click="toggleDark" class="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </header>

      <!-- CONTENT -->
      <main class="flex-1 p-4 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)
const isDark = ref(false)

const menu = [
  { label: 'Dashboard', path: '/rh/dashboard' },
  { label: 'Départements', path: '/rh/departements' },
  { label: 'Évaluations', path: '/rh/evaluations' },
  { label: 'Paie', path: '/rh/paie' }
]

function toggleDark() {
  isDark.value = !isDark.value
}
</script>

<style>
/* Pour éviter le scroll body quand sidebar mobile ouverte */
body {
  overflow-x: hidden;
}
</style>
