<template>
  <div class="h-full flex">
    <div class="w-80 md:w-64 border-r dark:border-gray-700 p-4 overflow-auto bg-white dark:bg-gray-800">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold text-gray-800 dark:text-gray-100">Groupes</h3>
        <button @click="openCreate" class="text-blue-600">➕</button>
      </div>
      <ul class="space-y-2">
        <li v-for="g in groups" :key="g.id" @click="select(g)" class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" :class="selected?.id === g.id ? 'bg-blue-100 dark:bg-blue-700' : ''">
          <div class="font-medium">{{ g.name }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ g.members.length }} membres</div>
        </li>
      </ul>
    </div>

    <div class="flex-1 flex flex-col">
      <div class="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <div>
          <h4 class="font-semibold text-gray-800 dark:text-gray-100">{{ selected?.name || 'Sélectionnez un groupe' }}</h4>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ selected ? (selected.members.join(', ')) : '' }}</div>
        </div>
        <div class="flex gap-2">
          <button @click="startAudio" class="p-2">🎧</button>
          <button @click="startVideo" class="p-2">🎥</button>
          <button @click="openSettings" class="p-2">⚙️</button>
        </div>
      </div>

      <div v-if="selected" class="flex-1">
        <ChatWindow :messages="selected.messages" @send="onGroupSend" />
      </div>

      <div v-else class="flex-1 flex items-center justify-center text-gray-500">Choisissez un groupe</div>
    </div>

    <GroupManager v-if="createOpen" @close="createOpen=false" @create="createGroup" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import GroupManager from '@/components/chat/GroupManager.vue'

const groups = ref([
  { id: 1, name: 'Informatique', members: ['Alice','Jean'], messages: [{ from:'them', text:'Bienvenue dans le groupe IT', time:'09:00' }] },
  { id: 2, name: 'Comptabilité', members: ['Fatou'], messages: [] }
])
const selected = ref(null)
const createOpen = ref(false)

function select(g) { selected.value = g }
function onGroupSend(msg) { if (selected.value) selected.value.messages.push(msg) }
function createGroup(g) { groups.value.push(g); createOpen.value = false }
function openCreate(){ createOpen.value = true }
function openSettings(){ alert('Paramètres groupe: ajouter/retirer membres, renommer, supprimer') }
function startAudio(){ alert('Démarrage appel audio groupe (WebRTC pour plus tard)') }
function startVideo(){ alert('Démarrage appel vidéo groupe (WebRTC pour plus tard)') }
</script>
<style scoped>
</style>