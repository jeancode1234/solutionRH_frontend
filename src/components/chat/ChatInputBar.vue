<template>
  <div class="p-3 border-t dark:border-gray-700 flex items-center gap-2 bg-white dark:bg-gray-800">
    <input
      v-model="text"
      @keyup.enter="send"
      placeholder="Saisissez un message..."
      class="flex-1 p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none"
    />
    <button @click="send" class="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
      <i class="ri-send-plane-2-line text-lg"></i>
    </button>
  </div>
</template>

<script setup>
import { ref,defineEmits } from 'vue'
const emit = defineEmits(['send'])
const text = ref('')
function send() {
  if (!text.value.trim()) return
  emit('send', { text: text.value })
  text.value = ''
}
</script>
<style scoped>
</style>