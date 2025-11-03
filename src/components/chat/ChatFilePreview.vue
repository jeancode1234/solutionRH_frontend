<template>
  <div v-if="file" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between text-sm mt-2">
    <div class="flex items-center gap-2">
      <i class="ri-attachment-2 text-blue-600 text-lg"></i>
      <span class="truncate w-48">{{ file.name }}</span>
    </div>
    <button @click="$emit('remove')" class="text-red-500 hover:text-red-600">
      <i class="ri-close-line text-lg"></i>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  file: {
    type: Object,
    default: null
  }
})
</script>
