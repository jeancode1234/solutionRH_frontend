<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static inset-y-0 left-0 transform md:translate-x-0 transition-transform duration-300 ease-in-out z-40',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      class="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-lg flex flex-col"
    >
      <div class="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
        <h1 class="text-xl font-bold text-blue-600">Gestion RH</h1>
        <button class="md:hidden text-gray-600 dark:text-gray-300" @click="sidebarOpen = false">
          <i class="ri-close-line text-2xl"></i>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          class="flex items-center px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          active-class="bg-blue-100 text-blue-600 dark:bg-gray-700"
        >
          <i :class="link.icon + ' text-lg mr-3'"></i>
          {{ link.name }}
        </router-link>
      </nav>

      <div class="p-4 border-t dark:border-gray-700">
        <button class="flex items-center gap-2 text-red-500 hover:underline">
          <i class="ri-logout-box-r-line"></i> Déconnexion
        </button>
      </div>
    </aside>

    <!-- Contenu principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="flex items-center justify-between px-4 sm:px-6 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <div class="flex items-center gap-3">
          <button @click="sidebarOpen = !sidebarOpen" class="md:hidden text-gray-700 dark:text-gray-300">
            <i class="ri-menu-line text-2xl"></i>
          </button>
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ currentTitle }}</h2>
        </div>

        <div class="flex items-center gap-4">
          <button @click="toggleDark" class="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <i :class="isDark ? 'ri-sun-line' : 'ri-moon-line'"></i>
          </button>
          <div class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            RH
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const sidebarOpen = ref(false)
const isDark = ref(false)
const route = useRoute()

const navLinks = [
  { name: 'Dashboard', to: '/rh/dashboard', icon: 'ri-dashboard-line' },
  { name: 'Présences', to: '/rh/presences', icon: 'ri-calendar-check-line' },
  { name: 'Départements', to: '/rh/departements', icon: 'ri-building-4-line' },
  { name: 'Paie', to: '/rh/paie', icon: 'ri-bank-card-line' },
  { name: 'Documents', to: '/rh/documents', icon: 'ri-file-2-line' },
  { name: 'Évaluations', to: '/rh/evaluations', icon: 'ri-bar-chart-box-line' },
  { name: 'Rapports', to: '/rh/rapports', icon: 'ri-file-chart-line' },
  { name: 'Messages', to: '/rh/messages', icon: 'ri-message-3-line' },
  { name: 'Paramètres', to: '/rh/parametres', icon: 'ri-settings-3-line' }
]

const currentTitle = computed(() => navLinks.find(n => n.to === route.path)?.name || 'Dashboard')

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

watch(() => route.path, () => (sidebarOpen.value = false))
</script>
<style scoped>
</style>