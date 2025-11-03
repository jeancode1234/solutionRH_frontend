<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
    <div>
      <h1 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Bienvenue, Jean</h1>
    </div>
    <div class="flex items-center gap-3">
      <button @click="toggleDark" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">Theme</button>
      <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-full border" />
    </div>
  </header>
</template>

<script setup>
const toggleDark = () => {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
</script>
