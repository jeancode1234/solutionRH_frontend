<template>
  <aside class="hidden xl:flex flex-col w-64 border-l dark:border-gray-700 bg-white dark:bg-gray-800">
    <div class="p-3 border-b dark:border-gray-700">
      <h3 class="font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
    </div>

    <ul class="flex-1 overflow-y-auto p-3 space-y-2">
      <li v-for="n in notifications" :key="n.id" class="text-sm text-gray-600 dark:text-gray-300">
        • {{ n.text }}
        <div class="text-xs text-gray-400">{{ n.time }}</div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({ conversation: Object, notifications: Array })
</script>
<style scoped>
</style>
