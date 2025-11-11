<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-500 ease-out">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed md:static inset-y-0 left-0 transform md:translate-x-0 transition-transform duration-300 ease-in-out z-40',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
      class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col rounded-r-3xl"
    >
      <div class="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
        <h1 class="text-xl font-semibold text-blue-600 tracking-tight">Gestion RH</h1>
        <button class="md:hidden text-gray-600 dark:text-gray-300" @click="sidebarOpen = false">
          <i class="ri-close-line text-2xl"></i>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          class="flex items-center px-3 py-2 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          active-class="bg-blue-100 text-blue-600 dark:bg-gray-700"
        >
          <i :class="link.icon + ' text-lg mr-3 opacity-80'"></i>
          {{ link.name }}
        </router-link>
      </nav>

      <div class="p-4 border-t dark:border-gray-700">
        <button
          @click="openLogoutModal"
          class="flex items-center gap-2 text-red-500 hover:underline hover:scale-105 transition-transform"
        >
          <i class="ri-logout-box-r-line"></i> Déconnexion
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <header
        class="flex items-center justify-between px-4 sm:px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-md bg-opacity-70"
      >
        <div class="flex items-center gap-3">
          <button @click="sidebarOpen = !sidebarOpen" class="md:hidden text-gray-700 dark:text-gray-300">
            <i class="ri-menu-line text-2xl"></i>
          </button>
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ currentTitle }}</h2>
        </div>

        <div class="flex items-center gap-4">
          <button
            @click="toggleDark"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            <i :class="isDark ? 'ri-sun-line' : 'ri-moon-line'"></i>
          </button>
          <div
            class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md"
          >
            RH
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
        <router-view />
      </main>
    </div>

    <!-- Modal de déconnexion -->
    <LogoutModal v-if="logoutModalOpen" @close="logoutModalOpen = false" @confirm="handleLogout" />
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LogoutModal from './LogoutModal.vue'

export default {
  components: { LogoutModal },
  setup() {
    const sidebarOpen = ref(false)
    const isDark = ref(false)
    const logoutModalOpen = ref(false)
    const route = useRoute()
    const router = useRouter()

    const navLinks = [
      { name: 'Dashboard', to: '/dashboard/dashboard', icon: 'ri-dashboard-line' },
      { name: 'personnel', to: '/dashboard/personnel', icon: 'ri-calendar-check-line' },
      { name: 'Départements', to: '/dashboard/departements', icon: 'ri-building-4-line' },
      { name: 'Presence', to: '/dashboard/presence', icon: 'ri-bank-card-line' },
      { name: 'Conges', to: '/dashboard/conges', icon: 'ri-bank-card-line' },
      { name: 'Paie', to: '/dashboard/paie', icon: 'ri-file-2-line' },
      { name: 'Évaluations', to: '/dashboard/evaluations', icon: 'ri-bar-chart-box-line' },
      { name: 'Rapports', to: '/dashboard/rapports', icon: 'ri-file-chart-line' },
      { name: 'Messages', to: '/dashboard/messages', icon: 'ri-message-3-line' },
      { name: 'Paramètres', to: '/dashboard/parametres', icon: 'ri-settings-3-line' }
    ]

    const currentTitle = computed(() => navLinks.find(n => n.to === route.path)?.name || 'Dashboard')

    function toggleDark() {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
    }

    function openLogoutModal() {
      logoutModalOpen.value = true
    }

    function handleLogout() {
      logoutModalOpen.value = false
      localStorage.removeItem('authToken')
      router.push('/')
    }

    watch(() => route.path, () => (sidebarOpen.value = false))

    return {
      sidebarOpen,
      isDark,
      navLinks,
      currentTitle,
      logoutModalOpen,
      toggleDark,
      openLogoutModal,
      handleLogout
    }
  }
}
</script>

<style scoped>
aside {
  backdrop-filter: saturate(180%) blur(16px);
}
</style>
