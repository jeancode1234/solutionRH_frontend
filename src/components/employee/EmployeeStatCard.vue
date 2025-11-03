<template>
  <div
    class="flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
  >
    <div>
      <p class="text-gray-500 dark:text-gray-400 text-sm">{{ label }}</p>
      <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-100">{{ value }}</h2>
    </div>
    <div :class="['w-12 h-12 flex items-center justify-center rounded-full', colorClass]">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    colorClass: {
      type: String,
      default: ''
    }
  }
})
</script>
