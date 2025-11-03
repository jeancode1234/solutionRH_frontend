<template>
  <div class="p-5 bg-blue-50 dark:bg-gray-700 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition">
    <div>
      <p class="text-sm text-gray-600 dark:text-gray-300">{{ label }}</p>
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ value }}</h3>
    </div>
    <i :class="icon + ' text-3xl text-blue-600 dark:text-blue-400'"></i>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  label: String,
  value: String,
  icon: String,
})
</script>
<style scoped>
</style>