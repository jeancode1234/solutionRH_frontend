<template>
  <section class="flex flex-col flex-1 bg-white dark:bg-gray-800 relative">
    <!-- En-tête -->
    <header class="flex items-center justify-between p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-20">
      <div class="flex items-center gap-3">
        <!-- Bouton retour mobile -->
        <button @click="$emit('back')" class="sm:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500">
          <i class="ri-arrow-left-line text-2xl"></i>
        </button>

        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ conversation.name }}</h3>
          <p class="text-sm text-gray-500">{{ conversation.type === 'groupe' ? 'Groupe' : 'Privé' }}</p>
        </div>
      </div>

      <div class="flex gap-3">
        <button @click="$emit('start-call')" class="text-gray-500 hover:text-blue-500"><i class="ri-phone-line text-xl"></i></button>
        <button class="text-gray-500 hover:text-blue-500"><i class="ri-video-line text-xl"></i></button>
      </div>
    </header>

    <!-- Messages -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="(msg, i) in conversation.messages"
        :key="i"
        :class="msg.senderId === currentUser.id ? 'text-right' : 'text-left'"
      >
        <div
          :class="[
            'inline-block px-3 py-2 rounded-lg max-w-xs break-words',
            msg.senderId === currentUser.id
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
          ]"
        >
          {{ msg.text }}
        </div>
        <div class="text-xs text-gray-400 mt-1">{{ msg.time }}</div>
      </div>
    </div>

    <ChatInputBar @send="addMessage" />
  </section>
</template>

<script setup>
import ChatInputBar from '@/components/chat/ChatInputBar.vue'
import { defineProps, defineEmits } from 'vue'
defineProps({ conversation: Object, currentUser: Object })
defineEmits(['back', 'start-call'])

function addMessage(payload, conversation, currentUser) {
  conversation.messages.push({
    senderId: currentUser.id,
    text: payload.text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
}
</script>
