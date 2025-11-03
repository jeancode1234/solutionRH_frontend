<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Documents RH</h2>

    <!-- Upload -->
    <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg text-center">
      <input type="file" multiple @change="handleFiles" class="hidden" ref="fileInput" />
      <button
        @click="$refs.fileInput.click()"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        📁 Ajouter des documents
      </button>
    </div>

    <!-- Liste -->
    <ul class="mt-6 divide-y dark:divide-gray-700">
      <li
        v-for="(doc, index) in documents"
        :key="index"
        class="flex items-center justify-between py-3"
      >
        <div>
          <p class="font-medium text-gray-800 dark:text-gray-200">{{ doc.name }}</p>
          <p class="text-sm text-gray-500">{{ doc.size }} KB</p>
        </div>
        <div class="flex gap-2">
          <button
            @click="downloadFile(doc)"
            class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            ⬇️
          </button>
          <button
            @click="removeFile(index)"
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            🗑
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const documents = ref([])

function handleFiles(event) {
  const files = event.target.files
  for (let file of files) {
    documents.value.push({
      name: file.name,
      size: Math.round(file.size / 1024),
      file
    })
  }
}

function removeFile(index) {
  documents.value.splice(index, 1)
}

function downloadFile(doc) {
  const url = URL.createObjectURL(doc.file)
  const a = document.createElement('a')
  a.href = url
  a.download = doc.name
  a.click()
  URL.revokeObjectURL(url)
}
</script>
<style scoped>
</style>