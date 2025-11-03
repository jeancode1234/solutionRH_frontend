<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border dark:border-gray-700">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
      <h3 class="font-semibold text-lg">{{ title }}</h3>

      <input
        v-model="searchQuery"
        placeholder="Rechercher..."
        class="px-3 py-2 border dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none w-full sm:w-64"
      />
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-left">
        <thead class="text-gray-600 dark:text-gray-300 border-b dark:border-gray-600">
          <tr>
            <th
              v-for="(col, index) in columns"
              :key="index"
              class="pb-2 cursor-pointer"
              @click="changeSort(col.key)"
            >
              {{ col.label }}
              <span v-if="sortKey === col.key">{{ sortAsc ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in paginatedData"
            :key="item.id"
            class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <td v-for="(col, i) in columns" :key="i" class="py-2">
              {{ item[col.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <p>Page {{ currentPage }} sur {{ totalPages }}</p>
      <div class="space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
        >
          Précédent
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'

const props = defineProps({
  title: String,
  columns: Array,
  rows: Array,
})

const searchQuery = ref('')
const sortKey = ref('')
const sortAsc = ref(true)
const currentPage = ref(1)
const itemsPerPage = 5

const filtered = computed(() =>
  props.rows.filter((r) =>
    Object.values(r).some((v) => String(v).toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
)

const sorted = computed(() => {
  if (!sortKey.value) return filtered.value
  return [...filtered.value].sort((a, b) => {
    const valA = a[sortKey.value].toString().toLowerCase()
    const valB = b[sortKey.value].toString().toLowerCase()
    return sortAsc.value ? valA.localeCompare(valB) : valB.localeCompare(valA)
  })
})

const totalPages = computed(() => Math.ceil(sorted.value.length / itemsPerPage))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sorted.value.slice(start, start + itemsPerPage)
})

const changeSort = (key) => {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else {
    sortKey.value = key
    sortAsc.value = true
  }
}

const nextPage = () => currentPage.value < totalPages.value && currentPage.value++
const prevPage = () => currentPage.value > 1 && currentPage.value--
</script>
