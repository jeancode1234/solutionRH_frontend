<template>
    <div>
        <button @click="toggleTheme" class="p-2 rounded-full">
            <i :class="isDark ? 'ri-sun-line text-yellow-400' : 'ri-moon-line text-gray-700'"></i>
        </button>

    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
const isDark = ref(false)
watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})
function toggleTheme() { isDark.value = !isDark.value }

</script>