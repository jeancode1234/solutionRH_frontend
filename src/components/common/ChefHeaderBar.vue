<template>
  <div>

    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold text-gray-800">{{ title }}</h1>
      <div class="flex items-center gap-4">
        <button class="relative">
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{{ notifications }}</span>
        </button>
        <img :src="userAvatar" alt="Avatar" class="rounded-full w-10 h-10" />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Dashboard Chef' },
    notifications: { type: Number, default: 0 },
    userAvatar: { type: String, default: 'https://i.pravatar.cc/40' }
  }
}
</script>
