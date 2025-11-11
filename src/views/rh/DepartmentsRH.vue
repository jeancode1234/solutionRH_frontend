<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm backdrop-blur-md transition-all duration-300">
    <!-- En-tête -->
    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
        Départements
      </h2>
      <button @click="openModal()"
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition active:scale-95 shadow-sm">
        <i class="ri-add-line text-lg"></i> Nouveau
      </button>
    </div>

    <!-- Barre de recherche -->
    <div class="relative mb-6">
      <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
      <input v-model="search" placeholder="Rechercher un département..."
        class="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 transition" />
    </div>

    <!-- Tableau -->
    <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th class="p-4 text-left font-medium">Nom</th>
            <th class="p-4 text-left font-medium">Description</th>
            <th class="p-4 text-center font-medium">Employés</th>
            <th class="p-4 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dept in departments" :key="dept.id"
            class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <td class="p-4">{{ dept.nom }}</td>
            <td class="p-4 text-gray-600 dark:text-gray-300">{{ dept.description }}</td>
            <td class="p-4 text-center">{{ dept.employees?.length || 0 }}</td>
            <td class="p-4 text-center flex justify-center gap-3">
              <button @click="openModal(dept)" class="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                <i class="ri-edit-line text-lg"></i>
              </button>
              <button @click="deleteDepartment(dept.id)"
                class="text-red-600 hover:text-red-800 dark:hover:text-red-400">
                <i class="ri-delete-bin-line text-lg"></i>
              </button>
            </td>
          </tr>
          <tr v-if="departments.length === 0">
            <td colspan="4" class="p-4 text-center text-gray-500 dark:text-gray-400 italic">
              Aucun département trouvé.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <transition name="fade">
      <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="closeModal">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
          <button @click="closeModal"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
            <i class="ri-close-line text-2xl"></i>
          </button>

          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            {{ editingDept ? 'Modifier le département' : 'Ajouter un département' }}
          </h3>

          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Nom du département
              </label>
              <input v-model="newDept.nom" placeholder="Ex: Ressources Humaines"
                class="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea v-model="newDept.description" placeholder="Ex: Gère le personnel et les recrutements"
                class="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"></textarea>
            </div>
          </div>

          <div class="flex justify-end mt-6 gap-2">
            <button @click="closeModal"
              class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              Annuler
            </button>
            <button @click="saveDepartment"
              class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition active:scale-95">
              {{ editingDept ? 'Mettre à jour' : 'Ajouter' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DepartementsView',
  data() {
    return {
      departments: [],
      search: '',
      isModalOpen: false,
      newDept: { nom: '', description: '' },
      editingDept: null
    }
  },
  computed: {
    filteredDepartments() {
      return this.departments.filter(d =>
        d.nom?.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  created() {
    this.getDepartements()
  },
  methods: {
    getDepartements() {
      const token = localStorage.getItem('authToken')
      this.axios.get(`${process.env.VUE_APP_APIREQUEST}/departements`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(({ data }) => {
          this.departments = data
        })
        .catch(error => {
          console.error('Erreur chargement départements :', error)
        })
    },

    openModal(dept = null) {
      this.editingDept = dept
      this.newDept = dept ? { ...dept } : { nom: '', desc: '' }
      this.isModalOpen = true
    },

    closeModal() {
      this.isModalOpen = false
      this.editingDept = null
      this.newDept = { name: '', desc: '' }
    },

    saveDepartment() {
      if (!this.newDept.nom) {
        alert('Veuillez entrer un nom.')
        return
      }

      const token = localStorage.getItem('authToken')
      let url = `${process.env.VUE_APP_APIREQUEST}/StoreDepartement`

      if (this.editingDept) {
        url = `${process.env.VUE_APP_APIREQUEST}/UpdateDepartement/${this.editingDept.id}`
      }

      this.axios.post(url, this.newDept, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          this.getDepartements()
          this.closeModal()
        })
        .catch(error => {
          console.error('Erreur sauvegarde département :', error)
        })
    },

    deleteDepartment(id) {
      if (!confirm('Supprimer ce département ?')) return

      const token = localStorage.getItem('authToken')
      this.axios.delete(`${process.env.VUE_APP_APIREQUEST}/DeleteDepartement/${id}`,  {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
          this.getDepartements()
        })
        .catch(error => {
          console.error('Erreur suppression département :', error)
        })
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
