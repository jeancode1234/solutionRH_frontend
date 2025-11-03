<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">

    <!-- ✅ Sidebar -->
    <aside
      :class="[
        'h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-2xl transform transition-all duration-500 ease-in-out',
        sidebarCollapsed ? 'w-20' : 'w-64'
      ]"
    >
      <!-- 🔹 Logo + Bouton -->
      <div class="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
        <div class="flex items-center gap-2">
          <i class="ri-user-smile-line text-2xl text-blue-600"></i>
          <span v-if="!sidebarCollapsed" class="font-bold text-xl text-blue-600">Employé</span>
        </div>
        <button
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
          @click="toggleSidebar"
        >
          <i :class="sidebarCollapsed ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'" class="text-xl"></i>
        </button>
      </div>

      <!-- 🔹 Navigation -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          class="group flex items-center gap-3 p-3 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
          active-class="bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
        >
          <div
            class="text-2xl flex-shrink-0 text-gray-500 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:scale-110 transition-transform duration-300"
          >
            <i :class="link.icon"></i>
          </div>
          <span v-if="!sidebarCollapsed" class="text-gray-700 dark:text-gray-300">{{ link.name }}</span>
        </router-link>
      </nav>

      <!-- 🔹 Déconnexion -->
      <div class="p-4 border-t dark:border-gray-700">
        <button
          class="flex items-center gap-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 w-full justify-center md:justify-start"
        >
          <i class="ri-logout-box-r-line text-xl"></i>
          <span v-if="!sidebarCollapsed">Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- ✅ Contenu principal -->
    <div class="flex-1 flex flex-col transition-all duration-500 ease-in-out">
      <!-- 🔹 Barre supérieure -->
      <header
        class="flex items-center justify-between px-4 sm:px-6 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm sticky top-0 z-10"
      >
        <div class="flex items-center gap-3">
          <!-- Menu mobile -->
          <button @click="toggleMobileSidebar" class="md:hidden text-gray-700 dark:text-gray-300">
            <i class="ri-menu-line text-2xl"></i>
          </button>
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ currentTitle }}</h2>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <button @click="toggleDark" class="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            <i :class="isDark ? 'ri-sun-line' : 'ri-moon-line'" class="text-xl"></i>
          </button>

          <div
            class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md"
          >
            {{ initials }}
          </div>
        </div>
      </header>

      <!-- 🔹 Contenu dynamique -->
      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-all duration-500 ease-in-out">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDark = ref(false)
const sidebarCollapsed = ref(false)
const sidebarOpenMobile = ref(false)

// 🔹 Liste des liens
const navLinks = [
  { name: 'Tableau de bord', to: '/employee/dashboard', icon: 'ri-dashboard-line' },
  { name: 'Profil', to: '/employee/profil', icon: 'ri-user-3-line' },
  { name: 'Congés', to: '/employee/conges', icon: 'ri-time-line' },
  { name: 'Tâches', to: '/employee/taches', icon: 'ri-task-line' },
  { name: 'Formations', to: '/employee/formations', icon: 'ri-graduation-cap-line' },
  { name: 'Paie', to: '/employee/paie', icon: 'ri-bank-card-line' },
  { name: 'Messages', to: '/employee/messages', icon: 'ri-message-3-line' },
]

// 🔹 Titre dynamique
const currentTitle = computed(() => {
  const current = navLinks.find((n) => n.to === route.path)
  return current ? current.name : 'Tableau de bord'
})

// 🔹 Mode sombre
function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

// 🔹 Sidebar
function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 🔹 Sidebar mobile
function toggleMobileSidebar() {
  sidebarOpenMobile.value = !sidebarOpenMobile.value
}

// 🔹 Initiales fictives
const initials = computed(() => 'JE')

// Fermer le menu sur mobile après navigation
watch(() => route.path, () => {
  sidebarOpenMobile.value = false
})
</script>

<style scoped>
/* ✅ Scrollbar stylisée */
nav::-webkit-scrollbar {
  width: 6px;
}
nav::-webkit-scrollbar-thumb {
  background-color: rgba(120, 120, 120, 0.3);
  border-radius: 4px;
}

/* ✅ Effet 3D sur la sidebar */
aside {
  box-shadow: 6px 0 20px rgba(0, 0, 0, 0.05);
  perspective: 1000px;
  transform-style: preserve-3d;
}
aside:hover {
  transform: translateZ(2px);
}

/* ✅ Animation de transition */
.router-link-exact-active {
  background-color: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}
</style>
