<template>
  <div class="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
    <!-- header (visible on mobile to show selected user) -->
    <div class="flex items-center justify-between p-3 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
      <div class="flex items-center gap-3">
        <button class="md:hidden" @click="showContacts = !showContacts">☰</button>
        <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div>
          <div class="font-semibold text-gray-800 dark:text-gray-100">{{ selected?.name || 'Sélectionner un contact' }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ selected ? selected.last : '' }}</div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button @click="startAudioCall" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">🎧</button>
        <button @click="startVideoCall" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">🎥</button>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- contacts column (mobile collapsible) -->
      <div v-show="showContacts" class="md:block w-80 md:w-64 border-r dark:border-gray-700 bg-white dark:bg-gray-800 p-3 overflow-auto">
        <input v-model="search" placeholder="Recherche..." class="w-full p-2 rounded mb-3 border dark:bg-gray-700 dark:border-gray-600" />
        <ul class="space-y-2">
          <li v-for="u in filteredUsers" :key="u.id" @click="selectUser(u)" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" :class="selected?.id === u.id ? 'bg-blue-100 dark:bg-blue-700' : ''">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div class="flex-1">
                <div class="font-medium text-sm text-gray-800 dark:text-gray-100">{{ u.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ u.last }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- chat window -->
      <div class="flex-1 flex flex-col">
        <div ref="messagesEl" class="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-800">
          <div v-if="!selected" class="text-center text-gray-500 dark:text-gray-400 mt-12">Sélectionnez un contact pour démarrer la conversation</div>

          <div v-for="(m, idx) in currentMessages" :key="idx" :class="m.from === 'me' ? 'flex justify-end' : 'flex justify-start'">
            <div :class="['p-3 rounded-lg max-w-[78%] shadow-sm', m.from === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none']">
              <div v-if="m.text" class="whitespace-pre-wrap">{{ m.text }}</div>
              <div v-if="m.file" class="mt-2 flex items-center gap-2 bg-gray-100 dark:bg-gray-600 p-2 rounded">
                <span class="font-semibold text-red-600">📄</span>
                <div>
                  <div class="text-sm">{{ m.file.name }}</div>
                  <div class="text-xs text-gray-500">{{ m.file.size }} KB</div>
                </div>
              </div>
              <div class="text-xs opacity-70 mt-2">{{ m.time }}</div>
            </div>
          </div>
        </div>

        <!-- composer -->
        <div class="p-3 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
          <div class="flex gap-2 items-center">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Saisissez votre message..." class="flex-1 p-2 rounded border dark:bg-gray-800 dark:border-gray-700" />
            <label class="cursor-pointer p-2 text-gray-600 dark:text-gray-300">
              📎
              <input type="file" class="hidden" @change="onFile" />
            </label>
            <button @click="toggleEmoji" class="p-2">😊</button>
            <button @click="sendMessage" class="bg-blue-600 text-white px-4 py-2 rounded">➤</button>
          </div>

          <div v-if="showEmoji" class="mt-2 bg-white dark:bg-gray-800 p-2 rounded shadow grid grid-cols-8 gap-2">
            <span v-for="e in emojis" :key="e" class="cursor-pointer" @click="addEmoji(e)">{{ e }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Call window (simple overlay) -->
    <CallWindow v-if="call.isActive" :type="call.type" @end="endCall" />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import CallWindow from '@/components/chat/CallWindow.vue'

const users = ref([
  { id: 1, name: 'Emma', last: 'Ok merci !' },
  { id: 2, name: 'Jean', last: 'Planification projet X...' },
  { id: 3, name: 'Marc', last: 'On en reparle demain ?' },
  { id: 4, name: 'Lucie', last: 'D’accord, bonne journée !' }
])

const messagesStore = ref({
  // store messages per user id (simple local store)
  1: [
    { from: 'them', text: 'Bonjour Emma, peux-tu me dire où en est le projet ?', time: '10:25' },
    { from: 'me', text: 'Bonjour Emma, le projet avance bien...', time: '10:26' },
  ],
  2: [
    { from: 'them', text: 'As-tu reçu la feuille de route?', time: '09:12' }
  ]
})

const selected = ref(null)
const showContacts = ref(true)
const search = ref('')
const newMessage = ref('')
const showEmoji = ref(false)
const emojis = ['😀','😊','😂','😍','😎','👍','🙏','🔥','🎉','❤️']
const messagesEl = ref(null)

const call = ref({ isActive: false, type: 'audio' }) // type: audio|video

const filteredUsers = computed(() => users.value.filter(u => u.name.toLowerCase().includes(search.value.toLowerCase())) )

// Méthode publique (appelée par parent)
function selectUser(user) {
  selected.value = user
  showContacts.value = false
  // ensure messages array exists
  if (!messagesStore.value[user.id]) messagesStore.value[user.id] = []
  // scroll to bottom
  nextTick(() => scrollBottom())
}

// expose method to parent if needed
// (script-setup cannot directly define expose but returning ref is fine when parent uses template ref)

function sendMessage() {
  if (!selected.value) return
  const txt = newMessage.value.trim()
  if (!txt) return
  const msg = { from: 'me', text: txt, time: new Date().toLocaleTimeString().slice(0,5) }
  messagesStore.value[selected.value.id].push(msg)
  newMessage.value = ''
  showEmoji.value = false
  nextTick(() => scrollBottom())
}

function onFile(e) {
  if (!selected.value) return
  const f = e.target.files[0]
  if (!f) return
  const fileObj = { name: f.name, size: Math.round(f.size/1024) }
  messagesStore.value[selected.value.id].push({ from: 'me', file: fileObj, text: '', time: new Date().toLocaleTimeString().slice(0,5) })
  nextTick(() => scrollBottom())
}

function toggleEmoji() { showEmoji.value = !showEmoji.value }
function addEmoji(e) { newMessage.value += e; showEmoji.value = false }

function scrollBottom() {
  const el = messagesEl.value
  if (!el) return
  el.scrollTop = el.scrollHeight + 200
}

function startAudioCall() {
  if (!selected.value) return
  call.value = { isActive: true, type: 'audio' }
}
function startVideoCall() {
  if (!selected.value) return
  call.value = { isActive: true, type: 'video' }
}
function endCall() {
  call.value = { isActive: false, type: 'audio' }
}

// computed current messages
const currentMessages = computed(() => selected.value ? (messagesStore.value[selected.value.id] || []) : [])

</script>

<style scoped>
/* small scrollbar */
.flex-1::-webkit-scrollbar { width: 8px; }
.flex-1::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark .flex-1::-webkit-scrollbar-thumb { background: #475569; }
</style>
