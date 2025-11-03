<template>
  <div class="flex h-full">
    <aside class="w-72 border-r dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
      <input v-model="search" placeholder="Rechercher..." class="w-full px-3 py-2 rounded-lg border dark:border-gray-700 mb-3" />
      <ul class="space-y-2">
        <li v-for="c in filtered" :key="c.id" @click="select(c)" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" :class="selected?.id===c.id ? 'bg-blue-50 dark:bg-blue-900' : ''">
          <div class="font-medium">{{ c.name }}</div>
          <div class="text-xs text-gray-400 truncate">{{ c.last }}</div>
        </li>
      </ul>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
        <div>{{ selected ? selected.name : 'Sélectionnez une conversation' }}</div>
        <div class="text-sm text-gray-400">Online</div>
      </header>

      <div class="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div v-for="m in messages" :key="m.id" class="mb-3 flex" :class="m.from==='me' ? 'justify-end' : 'justify-start'">
          <div class="max-w-[60%] px-4 py-2 rounded-lg" :class="m.from==='me' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-800'">
            {{ m.text }}
          </div>
        </div>
      </div>

      <footer class="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 flex gap-2">
        <input v-model="newMsg" @keyup.enter="send" placeholder="Écrire..." class="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700" />
        <button @click="send" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Envoyer</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selected = ref(null)
const conversations = ref([
  { id: 1, name: 'Jean Dupont', last: 'Ok pour le document' },
  { id: 2, name: 'Marie Durand', last: 'Merci !' }
])
const messages = ref([
  { id: 1, from: 'them', text: 'Bonjour !' },
  { id: 2, from: 'me', text: 'Salut, comment puis-je aider ?' }
])
const newMsg = ref('')

const filtered = computed(() => conversations.value.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase())))

function select(c) {
  selected.value = c
}
function send() {
  if (!newMsg.value.trim()) return
  messages.value.push({ id: Date.now(), from: 'me', text: newMsg.value })
  newMsg.value = ''
}
</script>

<style scoped>
</style>
