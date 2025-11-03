<template>
  <div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Top bar -->
    <div class="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800 bg-white dark:bg-gray-800">
      <div class="flex items-center gap-4">
        <h1 class="text-lg font-semibold">Chat ONN</h1>
        <div class="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <button class="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Direct</button>
          <button class="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Groupes</button>
          <button class="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Public</button>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button @click="toggleRight" class="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <i class="ri-notification-line"></i>
          Notifications
        </button>
        <div class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">RN</div>
      </div>
    </div>

    <!-- Body: 3 columns -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <transition name="slide-left" mode="out-in">
        <div
          v-show="showLeft"
          key="left"
          class="w-80 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col"
        >
          <ChatSidebar
            :conversations="conversations"
            :activeId="activeConversation?.id"
            @select="onSelect"
            @create="createConversation"
          />
        </div>
      </transition>

      <!-- Main Chat Window -->
      <div class="flex-1 min-w-0 flex flex-col">
        <ChatWindow
          v-if="activeConversation"
          :conversation="activeConversation"
          :currentUser="currentUser"
          @send="handleSend"
          @start-call="startCall"
        />
        <div v-else class="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
          Sélectionnez une conversation pour commencer.
        </div>
      </div>

      <!-- Right Panel -->
      <transition name="slide-right">
        <div v-show="showRight" key="right" class="w-72 bg-white dark:bg-gray-800 border-l dark:border-gray-700 hidden md:flex flex-col">
          <ChatRightPanel :notifications="notifications" :suggestions="suggestions" @add="addSuggestion" />
        </div>
      </transition>
    </div>

    <!-- Floating Call Window -->
    <CallWindow
      v-if="callActive"
      :visible="callActive"
      :contact="callTarget"
      :callType="callType"
      @close="endCall"
      @ended="endCall"
      @accepted="onCallAccepted"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChatSidebar from '@/components/chat/ChatSidebar.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import ChatRightPanel from '@/components/chat/ChatRightPanel.vue'
import CallWindow from '@/components/chat/CallWindow.vue'

/* -------------------------
   Sample / mock data
   ------------------------- */
const currentUser = ref({ id: 1, name: 'Marie RH' })

const conversations = ref([
  {
    id: 11,
    type: 'direct',
    title: 'Jean Dupont',
    members: [{ id: 2, name: 'Jean Dupont' }],
    avatar: 'https://i.pravatar.cc/100?img=5',
    last: 'Ok merci 👌',
    updated: '09:32',
    messages: [
      { id: 'm1', senderId: 2, senderName: 'Jean', text: 'Bonjour Marie, peux-tu vérifier le dossier ?', time: '09:30' },
      { id: 'm2', senderId: 1, senderName: 'Marie', text: 'Oui, je regarde et je reviens.', time: '09:31' }
    ]
  },
  {
    id: 20,
    type: 'group',
    title: 'Département IT',
    members: [{ id: 3, name: 'Kevin' }, { id: 4, name: 'Sophie' }],
    avatar: '',
    last: 'MàJ serveur planifiée',
    updated: '08:10',
    messages: [
      { id: 'g1', senderId: 3, senderName: 'Kevin', text: 'On redémarre à 22h', time: '08:05' }
    ]
  },
  {
    id: 31,
    type: 'public',
    title: 'Annonces',
    members: [],
    avatar: '',
    last: 'Nouveau process RH',
    updated: 'Hier',
    messages: [
      { id: 'p1', senderId: 0, senderName: 'System', text: 'Note : nouvelle politique congés.', time: 'Yesterday' }
    ]
  }
])

const notifications = ref([
  { id: 1, text: 'Ankita mentioned you in "Trip to Goa"', when: '2h' },
  { id: 2, text: 'rakesh added you in group "Study"', when: '1d' }
])

const suggestions = ref([
  { id: 's1', name: 'Abhimaan Singh', title: 'Dev', mutual: 3 },
  { id: 's2', name: 'Ved Prakash', title: 'Analyst', mutual: 1 }
])

/* -------------------------
   reactive state
   ------------------------- */
const activeId = ref(conversations.value[0].id)
const activeConversation = computed(() => conversations.value.find(c => c.id === activeId.value))
const showLeft = ref(true)
const showRight = ref(true)

/* Call state */
const callActive = ref(false)
const callType = ref('audio')
const callTarget = ref(null)

/* actions */
function onSelect(id) {
  activeId.value = id
  // ensure right panel visible on desktop
  if (window.innerWidth >= 768) showRight.value = true
}

function createConversation(payload) {
  // quick mock creation
  const newConv = {
    id: Date.now(),
    type: 'direct',
    title: payload.name || 'Nouveau contact',
    members: [{ id: payload.id || Date.now(), name: payload.name || 'Invité' }],
    avatar: payload.avatar || '',
    last: '',
    updated: '',
    messages: []
  }
  conversations.value.unshift(newConv)
  activeId.value = newConv.id
}

function handleSend(msg) {
  // append to conversation messages safely (no prop mutation)
  const conv = activeConversation.value
  if (!conv) return
  conv.messages.push({
    id: 'm' + Date.now(),
    senderId: currentUser.value.id,
    senderName: currentUser.value.name,
    text: msg.text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  conv.last = msg.text
  conv.updated = 'Now'
}

function toggleRight() {
  showRight.value = !showRight.value
}
function startCall(payload) {
  callType.value = payload.type || 'audio'
  callTarget.value = payload.target || { name: activeConversation.value?.title || 'Groupe' }
  callActive.value = true
}
function endCall() {
  callActive.value = false
  callTarget.value = null
}
function onCallAccepted() {
  // could set inCall state, etc.
}

/* helper to add suggestions (mock) */
function addSuggestion(s) {
  alert(`Ajouté ${s.name} aux contacts (mock)`)
}
</script>

<style scoped>
/* basic transitions */
.slide-left-enter-active, .slide-left-leave-active { transition: all .25s ease; }
.slide-left-enter-from { transform: translateX(-8px); opacity:0; }
.slide-left-leave-to { transform: translateX(-8px); opacity:0; }

.slide-right-enter-active, .slide-right-leave-active { transition: all .25s ease; }
.slide-right-enter-from { transform: translateX(8px); opacity:0; }
.slide-right-leave-to { transform: translateX(8px); opacity:0; }
</style>
