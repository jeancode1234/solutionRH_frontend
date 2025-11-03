<template>
  <aside class="w-60 bg-white dark:bg-gray-800 h-screen border-r border-gray-200 dark:border-gray-700 flex flex-col">
    <div class="p-6 text-center">
      <h1 class="text-xl font-bold text-gray-700 dark:text-gray-100">Espace Employé</h1>
    </div>

    <nav class="flex-1 px-4">
      <router-link
        v-for="item in menu"
        :key="item.label"
        :to="item.route"
        class="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition mb-2"
        :class="$route.path === item.route
          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-white'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
      >
        <component :is="item.icon" class="w-5 h-5 mr-3" />
        {{ item.label }}
      </router-link>
    </nav>
  </aside>
</template>
<script setup>
import { HomeIcon, CalendarIcon, FileTextIcon, MessageSquareIcon } from "lucide-vue-next"

const menu = [
  { label: "Tableau de bord", route: "/employee/dashboard", icon: HomeIcon },
  { label: "Congés", route: "/employee/conges", icon: CalendarIcon },
  { label: "Bulletins", route: "/employee/bulletins", icon: FileTextIcon },
  { label: "Messages", route: "/employee/messages", icon: MessageSquareIcon }
]
</script>
<style scoped>
</style>