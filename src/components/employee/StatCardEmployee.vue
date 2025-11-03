<template>
  <div
    class="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition transform hover:-translate-y-1"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">{{ label }}</p>
        <p class="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">{{ value }}</p>
      </div>
      <div :class="['w-12 h-12 rounded-full flex items-center justify-center text-white', color]">
        <i :class="icon + ' text-xl'"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  icon: String,
  label: String,
  value: [String, Number],
  color: String
})
</script>
<style scoped>
</style>