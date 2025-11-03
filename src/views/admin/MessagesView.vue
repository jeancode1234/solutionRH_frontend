<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Messagerie interne</h1>
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700">
      <div class="space-y-3">
        <div v-for="msg in messages" :key="msg.id" class="p-3 rounded-lg" :class="msg.sender === 'Admin' ? 'bg-blue-100 dark:bg-blue-900 text-right' : 'bg-gray-100 dark:bg-gray-700'">
          <p class="text-sm">{{ msg.text }}</p>
          <span class="text-xs text-gray-400">{{ msg.date }}</span>
        </div>
      </div>

      <div class="flex mt-4">
        <input v-model="newMsg" placeholder="Écrire un message..." class="flex-1 rounded-l-lg px-3 py-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-700" />
        <button @click="send" class="bg-blue-600 text-white px-4 rounded-r-lg">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const messages = ref([
  { id: 1, sender: "Employé", text: "Bonjour, j’ai une question sur mon bulletin.", date: "21/10 - 09:12" },
  { id: 2, sender: "Admin", text: "Bonjour ! Je vous écoute 😊", date: "21/10 - 09:13" }
])
const newMsg = ref("")
function send() {
  if (!newMsg.value.trim()) return
  messages.value.push({ id: Date.now(), sender: "Admin", text: newMsg.value, date: "21/10 - 09:20" })
  newMsg.value = ""
}
</script>
<style scoped>
</style>