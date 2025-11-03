<template>
  <div class="flex h-[80vh] bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-1/3 border-r dark:border-gray-700 flex flex-col">
      <div class="p-3 border-b dark:border-gray-700 font-semibold">Groupes de discussion</div>
      <div v-for="g in groups" :key="g.name" @click="selectGroup(g)" class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center">
        <span>{{ g.name }}</span>
        <span class="text-xs text-gray-500">{{ g.members.length }} membres</span>
      </div>
    </aside>

    <!-- Zone de chat -->
    <div class="flex-1 flex flex-col">
      <div class="flex justify-between items-center p-3 border-b dark:border-gray-700">
        <h3 class="font-semibold text-gray-800 dark:text-gray-100">{{ activeGroup?.name || 'Aucune sélection' }}</h3>
        <div class="flex gap-2">
          <button @click="startCall" class="text-green-600 hover:text-green-700"><i class="ri-phone-line text-xl"></i></button>
          <button @click="startVideo" class="text-blue-600 hover:text-blue-700"><i class="ri-video-line text-xl"></i></button>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-gray-900">
        <div
          v-for="(msg, i) in activeGroup?.messages || []"
          :key="i"
          :class="msg.from === 'Chef' ? 'text-right' : 'text-left'"
        >
          <div
            :class="[
              'inline-block px-3 py-2 rounded-lg text-sm',
              msg.from === 'Chef'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
            ]"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-3 border-t dark:border-gray-700 flex items-center gap-2">
        <input
          v-model="message"
          placeholder="Écrire un message..."
          class="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage" class="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
          Envoyer
        </button>
      </div>
    </div>

    <!-- Appel simulé -->
    <div
      v-if="callActive"
      class="fixed inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-50"
    >
      <i class="ri-phone-fill text-5xl animate-bounce mb-4"></i>
      <p class="text-xl">Appel {{ callType }} en cours...</p>
      <button @click="callActive = false" class="mt-6 px-6 py-2 bg-red-600 rounded hover:bg-red-700">
        Raccrocher
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const groups = ref([
  { name: 'Département RH', members: ['Chef', 'Alice', 'Jean'], messages: [] },
  { name: 'Comptabilité', members: ['Chef', 'Fatou'], messages: [] },
  { name: 'Projets', members: ['Chef', 'Marc'], messages: [] }
])

const activeGroup = ref(null)
const message = ref('')
const callActive = ref(false)
const callType = ref('audio')

function selectGroup(g) {
  activeGroup.value = g
}

function sendMessage() {
  if (!message.value.trim() || !activeGroup.value) return
  activeGroup.value.messages.push({ from: 'Chef', text: message.value })
  message.value = ''
}

function startCall() {
  callActive.value = true
  callType.value = 'audio'
}
function startVideo() {
  callActive.value = true
  callType.value = 'vidéo'
}
</script>
<style scoped>
</style>