<!-- src/views/chat/ChatView.vue -->
<template>
  <div class="h-screen bg-gray-50 dark:bg-gray-900 p-4">
    <div class="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden h-full flex flex-col md:flex-row">
      <!-- Sidebar (mobile toggle) -->
      <transition name="slide">
        <ChatSidebar
          v-if="showSidebar || isWide"
          class="w-full md:w-80 border-r dark:border-gray-700"
          @select="onSelect"
        />
      </transition>

      <!-- Chat window -->
      <div class="flex-1 min-w-0">
        <ChatWindow @toggleSidebar="toggleSidebar" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import ChatSidebar from '@/components/chat/ChatSidebar.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'

const store = useStore()
const showSidebar = ref(false)

// breakpoint detection simple
const isWide = ref(window.innerWidth >= 768)
window.addEventListener('resize', () => { isWide.value = window.innerWidth >= 768 })

onMounted(async () => {
  await store.dispatch('chat/loadConversations')
})

function toggleSidebar() {
  // utilisé par ChatWindow sur mobile pour ouvrir/fermer sidebar
  showSidebar.value = !showSidebar.value
}

function onSelect() {
  // Lorsqu'une conversation est sélectionnée dans la sidebar, fermer sidebar en mobile
  showSidebar.value = false
}
</script>

<style scoped>
/* animation pour sidebar mobile */
.slide-enter-active, .slide-leave-active { transition: transform .2s ease; }
.slide-enter-from { transform: translateX(-10px); opacity: 0; }
.slide-enter-to { transform: translateX(0); opacity: 1; }
.slide-leave-from { transform: translateX(0); opacity: 1; }
.slide-leave-to { transform: translateX(-10px); opacity: 0; }
</style>
