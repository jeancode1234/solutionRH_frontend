<template>
  <div>
    <div v-for="t in paginated" :key="t.id" class="p-3 border-b dark:border-gray-700 flex items-center justify-between">
      <div>
        <div class="font-medium">{{ t.title }}</div>
        <div class="text-xs text-gray-500">{{ t.due }}</div>
      </div>
      <div>
        <span :class="t.status === 'done' ? 'text-green-500' : 'text-yellow-500'">{{ t.status }}</span>
      </div>
    </div>

    <div class="mt-3 flex justify-between items-center text-sm">
      <div>Page {{ page }} / {{ totalPages }}</div>
      <div class="space-x-2">
        <button @click="prev" :disabled="page===1" class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">Préc</button>
        <button @click="next" :disabled="page===totalPages" class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">Suiv</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const tasks = [
  { id:1, title:'Rendre rapport projet', due:'2025-10-10', status:'pending' },
  { id:2, title:'Mise à jour compétences', due:'2025-10-05', status:'done' },
  { id:3, title:'Validation timesheet', due:'2025-10-12', status:'pending' },
  { id:4, title:'Réunion équipe', due:'2025-10-14', status:'pending' },
  { id:5, title:'Formation CI', due:'2025-10-20', status:'done' },
  { id:6, title:'Test QA', due:'2025-10-22', status:'pending' }
]

const page = ref(1)
const perPage = 3

const totalPages = computed(() => Math.ceil(tasks.length / perPage))
const paginated = computed(() => tasks.slice((page.value-1)*perPage, page.value*perPage))

function next(){ if(page.value < totalPages.value) page.value++ }
function prev(){ if(page.value > 1) page.value-- }
</script>
 