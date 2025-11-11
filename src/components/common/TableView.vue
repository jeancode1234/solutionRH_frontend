<template>
  <div
    class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-6 transition-all duration-300">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h3 class="font-semibold text-2xl text-gray-800 dark:text-gray-100 tracking-tight">
        {{ title }}
      </h3>

      <div class="relative w-full sm:w-64">
        <input v-model="searchQuery" type="text" placeholder="🔍 Rechercher..."
          class="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800/80 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
      <table class="min-w-full text-sm text-gray-700 dark:text-gray-200">
        <thead class="bg-gray-100/80 dark:bg-gray-800/70">
          <tr>
            <th v-for="(col, index) in columns" :key="index"
              class="py-3 px-4 font-medium text-left cursor-pointer hover:text-blue-500 select-none"
              @click="changeSort(col.key)">
              <div class="flex items-center gap-1">
                <span>{{ col.label }}</span>
                <span v-if="sortKey === col.key" class="text-xs opacity-70">
                  {{ sortAsc ? '↑' : '↓' }}
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in paginatedData" :key="item.id"
            class="hover:bg-gray-50/80 dark:hover:bg-gray-800/60 transition-all">
            <td v-for="(col, i) in columns" :key="i" class="py-3 px-4 border-t border-gray-100 dark:border-gray-700">
              {{ item[col.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-6 text-sm text-gray-600 dark:text-gray-300">
      <p>Page {{ currentPage }} sur {{ totalPages }}</p>

      <div class="flex gap-3">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-all">
          ◀ Précédent
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 transition-all">
          Suivant ▶
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppleTable',
  props: {
    title: String,
    columns: Array,
    rows: Array,
  },

  data() {
    return {
      searchQuery: '',
      sortKey: '',
      sortAsc: true,
      currentPage: 1,
      itemsPerPage: 5,
    }
  },

  computed: {
    filtered() {
      return this.rows.filter((r) =>
        Object.values(r).some((v) =>
          String(v).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      )
    },
    sorted() {
      if (!this.sortKey) return this.filtered
      return [...this.filtered].sort((a, b) => {
        const valA = a[this.sortKey]?.toString().toLowerCase() || ''
        const valB = b[this.sortKey]?.toString().toLowerCase() || ''
        return this.sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA)
      })
    },
    totalPages() {
      return Math.ceil(this.sorted.length / this.itemsPerPage)
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.sorted.slice(start, start + this.itemsPerPage)
    },
  },

  methods: {
    changeSort(key) {
      if (this.sortKey === key) this.sortAsc = !this.sortAsc
      else {
        this.sortKey = key
        this.sortAsc = true
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
  },
}
</script>

<style scoped>
/* Style inspiré d’Apple – lisible, élégant et doux */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th,
td {
  transition: color 0.3s ease, background-color 0.3s ease;
}
</style>
