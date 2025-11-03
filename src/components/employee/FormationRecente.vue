<template>
  <div class="space-y-3">
    <div v-for="f in formations" :key="f.id" class="p-3 bg-gray-50 dark:bg-gray-900 rounded">
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">{{ f.title }}</div>
          <div class="text-xs text-gray-500">{{ f.provider }}</div>
        </div>
        <div class="text-sm text-gray-700 dark:text-gray-100">{{ f.progress }}%</div>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-3 overflow-hidden">
        <div :style="{ width: f.progress + '%' }" class="h-2 bg-blue-600"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const formations = [
  { id:1, title:'Sécurité au travail', provider:'Plateforme X', progress: 60 },
  { id:2, title:'Gestion du temps', provider:'Académie Y', progress: 20 }
]
</script>
