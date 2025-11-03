<template>
  <div :class="['flex', self ? 'justify-end' : 'justify-start']">
    <div
      :class="[
        'px-3 py-2 rounded-lg text-sm max-w-[70%]',
        self
          ? 'bg-blue-600 text-white rounded-br-none'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
      ]"
    >
      {{ msg.text }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  msg: Object,
  self: Boolean
})
</script>
<style scoped>
</style>