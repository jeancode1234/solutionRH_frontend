<template>
  <div
    class="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
  >
    <div>
      <h3 class="text-sm text-gray-500 dark:text-gray-400">{{ data.label }}</h3>
      <p class="text-2xl font-semibold text-gray-800 dark:text-white">{{ data.value }}</p>
    </div>
    <div :class="['p-3 rounded-lg text-white', data.color]">
      <i :class="data.icon + ' text-xl'"></i>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  data: Object
})
</script>

<style scoped>
@import 'remixicon/fonts/remixicon.css';
</style>
