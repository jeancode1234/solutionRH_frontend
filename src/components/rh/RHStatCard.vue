<template>
  <div :class="['p-4 rounded-xl shadow bg-white dark:bg-gray-800 border-l-4', colorClass]">
    <h3 class="text-sm text-gray-500 dark:text-gray-300">{{ label }}</h3>
    <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ value }}</p>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
export default defineComponent({
  props: { label: String, value: String, color: String },
  setup(props) {
    const colorClass = computed(() => ({
      blue: 'border-blue-500',
      green: 'border-green-500',
      yellow: 'border-yellow-500',
      purple: 'border-purple-500'
    }[props.color] || 'border-gray-300'))
    return { colorClass }
  }
})
</script>
<style scoped>
</style>