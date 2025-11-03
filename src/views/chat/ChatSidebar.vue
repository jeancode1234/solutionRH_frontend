<template>
  <div class="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-all duration-300">
    <!-- ✅ Barre supérieure -->
    <header
      v-if="!activeChat"
      class="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md"
    >
      <h2 class="font-semibold text-lg">Discussions</h2>
      <button @click="toggleDark" class="text-white text-xl">
        <i :class="isDark ? 'ri-sun-line' : 'ri-moon-line'"></i>
      </button>
    </header>

    <!-- ✅ Liste des discussions -->
    <transition name="slide-fade">
      <div v-if="!activeChat" class="flex-1 overflow-y-auto">
        <div
          v-for="g in groups"
          :key="g.id"
          @click="openChat(g)"
          class="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer transition"
        >
          <div
            class="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          >
            {{ g.name.charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-800 dark:text-gray-200">{{ g.name }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ g.messages[g.messages.length - 1]?.text || 'Aucun message' }}
            </p>
          </div>
          <span class="text-xs text-gray-400">
            {{ g.messages[g.messages.length - 1]?.time || '' }}
          </span>
        </div>
      </div>
    </transition>

    <!-- ✅ Vue du chat actif -->
    <transition name="slide-left">
      <div
        v-if="activeChat"
        class="absolute inset-0 bg-white dark:bg-gray-900 flex flex-col z-50"
      >
        <!-- Barre supérieure du chat -->
        <div class="flex items-center justify-between p-3 bg-blue-600 text-white shadow">
          <div class="flex items-center gap-3">
            <button @click="closeChat" class="text-2xl">
              <i class="ri-arrow-left-line"></i>
            </button>
            <div>
              <h3 class="font-semibold">{{ activeChat.name }}</h3>
              <p class="text-xs text-gray-200">
                {{ activeChat.members.length }} membres
              </p>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="startCall('audio')"><i class="ri-phone-line text-lg"></i></button>
            <button @click="startCall('video')"><i class="ri-video-line text-lg"></i></button>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-3 space-y-3">
          <div
            v-for="(msg, i) in activeChat.messages"
            :key="i"
            :class="[
              'p-2 rounded-lg max-w-[80%]',
              msg.sender === currentUser.name
                ? 'ml-auto bg-blue-600 text-white'
                : 'mr-auto bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            ]"
          >
            <p class="text-sm">{{ msg.text }}</p>
            <span class="block text-[10px] text-right opacity-70">{{ msg.time }}</span>
          </div>
        </div>

        <!-- Zone de saisie -->
        <div
          class="p-3 flex items-center gap-3 bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700"
        >
          <input
            v-model="message"
            @keyup.enter="sendMessage"
            placeholder="Écrire un message..."
            class="flex-1 p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 text-sm"
          />
          <button @click="sendMessage" class="text-blue-600 dark:text-blue-400">
            <i class="ri-send-plane-fill text-xl"></i>
          </button>
        </div>
      </div>
    </transition>

    <!-- ✅ Fenêtre d’appel -->
    <CallWindow
      v-if="callActive"
      :visible="callActive"
      :contact="activeChat"
      :callType="callType"
      @close="callActive = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CallWindow from '@/components/chat/CallWindow.vue'

const isDark = ref(false)
function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const currentUser = ref({ name: 'Jean Mbarga' })
const message = ref('')
const callActive = ref(false)
const callType = ref('audio')
const activeChat = ref(null)

const groups = ref([
  {
    id: 1,
    name: 'Département RH',
    members: ['Alice', 'Jean', 'Fatou'],
    messages: [
      { sender: 'Alice', text: 'Bonjour tout le monde 👋', time: '09:10' },
      { sender: 'Jean Mbarga', text: 'Salut Alice !', time: '09:12' }
    ]
  },
  {
    id: 2,
    name: 'Département IT',
    members: ['Sophie', 'Kevin'],
    messages: []
  }
])

function openChat(group) {
  activeChat.value = group
}

function closeChat() {
  activeChat.value = null
}

function sendMessage() {
  if (!message.value.trim()) return
  activeChat.value.messages.push({
    sender: currentUser.value.name,
    text: message.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  message.value = ''
}

function startCall(type) {
  callType.value = type
  callActive.value = true
}
</script>

<style scoped>
/* ✅ Animations */
.slide-left-enter-active {
  animation: slideIn 0.3s ease forwards;
}
.slide-left-leave-active {
  animation: slideOut 0.3s ease forwards;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>
