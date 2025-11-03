<template>
  <div class="flex h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">

    <!-- Liste des conversations -->
    <transition name="slide-left">
      <ChatSidebar
        v-if="!mobileChatOpen"
        :conversations="conversations"
        :active-id="activeId"
        @select="openChat"
        class="flex-shrink-0 w-full sm:w-72"
      />
    </transition>

    <!-- Fenêtre de chat -->
    <transition name="slide-right">
      <ChatWindow
        v-if="mobileChatOpen"
        :conversation="activeConversation"
        :current-user="currentUser"
        @back="mobileChatOpen = false"
        @start-call="startCall"
        class="flex-1"
      />
    </transition>

    <!-- Version desktop : vue simultanée -->
    <div class="hidden sm:flex flex-1">
      <ChatWindow
        v-if="activeConversation"
        :conversation="activeConversation"
        :current-user="currentUser"
        @start-call="startCall"
      />
      <ChatRightPanel
        :conversation="activeConversation"
        :notifications="notifications"
        class="hidden xl:flex"
      />
    </div>

    <!-- Pop-up Appel -->
    <CallWindow
      v-if="callActive"
      :contact="activeConversation"
      @close="callActive = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChatSidebar from '@/components/chat/ChatSidebar.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import ChatRightPanel from '@/components/chat/ChatRightPanel.vue'
import CallWindow from '@/components/chat/CallWindow.vue'

const currentUser = ref({ id: 1, name: 'Marie RH', role: 'RH' })

const conversations = ref([
  { id: 1, name: 'Département Marketing', type: 'groupe', last: 'Réunion demain 9h', messages: [] },
  { id: 2, name: 'Jean Mbarga', type: 'privé', last: 'OK merci !', messages: [] },
  { id: 3, name: 'Département Finance', type: 'groupe', last: 'Rapport envoyé.', messages: [] }
])

const activeId = ref(1)
const mobileChatOpen = ref(false)
const activeConversation = computed(() => conversations.value.find(c => c.id === activeId.value))
const notifications = ref([
  { id: 1, text: "Jean a ajouté un document", time: "il y a 5 min" },
  { id: 2, text: "Appel prévu avec Finance", time: "il y a 30 min" }
])
const callActive = ref(false)

function openChat(id) {
  activeId.value = id
  if (window.innerWidth < 640) mobileChatOpen.value = true
}
function startCall() {
  callActive.value = true
}
</script>

<style scoped>
/* Transitions pour le passage d’une vue à l’autre */
.slide-right-enter-active, .slide-left-leave-active {
  transition: transform 0.35s ease;
}
.slide-right-enter-from, .slide-left-leave-to {
  transform: translateX(100%);
}
.slide-left-enter-active, .slide-right-leave-active {
  transition: transform 0.35s ease;
}
.slide-left-enter-from, .slide-right-leave-to {
  transform: translateX(-100%);
}
</style>
