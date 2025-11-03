<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white dark:bg-gray-800 w-full max-w-md p-4 rounded-lg shadow">
      <h3 class="font-semibold mb-3 text-gray-800 dark:text-gray-100">Créer un groupe</h3>
      <input v-model="name" placeholder="Nom du groupe" class="w-full p-2 mb-3 border rounded dark:bg-gray-700" />
      <div class="mb-3 text-sm text-gray-600 dark:text-gray-300">Sélectionner des membres :</div>
      <div class="max-h-40 overflow-auto space-y-2 mb-3">
        <label v-for="e in employees" :key="e.id" class="flex items-center gap-2">
          <input type="checkbox" v-model="selected" :value="e.name" />
          <span class="text-gray-800 dark:text-gray-100">{{ e.name }}</span>
        </label>
      </div>
      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="px-3 py-2 rounded bg-gray-200">Annuler</button>
        <button @click="create" class="px-3 py-2 rounded bg-blue-600 text-white">Créer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['create','close'])
const name = ref('')
const selected = ref([])
const employees = ref([
  { id: 1, name: 'Alice' }, { id: 2, name: 'Jean' }, { id: 3, name: 'Fatou' }, { id:4, name:'Marc' }
])

function create() {
  if (!name.value) return alert('Nom requis')
  emit('create', { id: Date.now(), name: name.value, members: [...selected.value], messages: [] })
  emit('close')
}
</script>
