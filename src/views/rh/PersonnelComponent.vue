<template>
  <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6 flex-wrap gap-3">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Gestion des employés</h2>
      <div class="flex items-center gap-2">
        <input v-model="searchQuery" type="text" placeholder="Rechercher un employé..."
          class="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        <button @click="openModal()" class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
          Ajouter
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-gray-700 dark:text-gray-200">
        <thead class="border-b border-gray-300 dark:border-gray-700">
          <tr class="text-left">
            <th class="pb-3 cursor-pointer" @click="changeSort('name')">Nom</th>
            <th class="pb-3 cursor-pointer" @click="changeSort('email')">Email</th>
            <th class="pb-3">Département</th>
            <th class="pb-3">Poste</th>
            <th class="pb-3">Salaire</th>
            <th class="pb-3">Statut</th>
            <th class="pb-3">Rôle</th>
            <th class="pb-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="emp in employees" :key="emp.id"
            class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <td class="py-2">{{ emp.name }}</td>
            <td>{{ emp.email }}</td>
            <td>{{ emp.fonction?.departement?.nom }}</td>
            <td>{{ emp.fonction?.poste }}</td>
            <td>{{ emp.fonction?.salaire }} €</td>
            <td>
              <span class="px-2 py-1 rounded-full text-xs font-semibold" :class="{
                'bg-green-100 text-green-700': emp.fonction?.statut === 'actif',
                'bg-gray-200 text-gray-700': emp.fonction?.statut === 'inactif'
              }">
                {{ emp.fonction?.statut }}
              </span>
            </td>
            <td>
              <button @click="toggleRole(emp)"
                class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-800 transition text-xs">
                {{ getRoleName(parseInt(emp.type)) }}
              </button>
            </td>
            <td class="py-2 text-right space-x-2">
              <button @click="openModal(emp)" class="text-blue-600 hover:underline">Modifier</button>
              <button @click="confirmDelete(emp)" class="text-red-600 hover:underline">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal : Ajouter / Modifier -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {{ isEditing ? 'Modifier un employé' : 'Ajouter un employé' }}
        </h3>

        <div class="space-y-3">
          <input v-model="form.name" placeholder="Nom complet" class="input-style" />
          <input v-model="form.email" placeholder="Email" class="input-style" />
          <select v-model="form.departement_id" class="input-style">
            <option disabled value="">Choisir un département</option>
            <option v-for="dep in departements" :key="dep.id" :value="dep.id">{{ dep.nom }}</option>
          </select>
          <input v-model="form.poste" placeholder="Poste" class="input-style" />
          <input v-model="form.date_embauche" type="date" class="input-style" />
          <input v-model="form.salaire" type="number" placeholder="Salaire (XAF)" class="input-style" />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="closeModal" class="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700">Annuler</button>
          <button @click="saveEmployee" class="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
            {{ isEditing ? 'Mettre à jour' : 'Créer' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal : Suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3">Confirmation de suppression</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Êtes-vous sûr de vouloir supprimer
          <span class="font-semibold text-red-600">{{ selectedEmployee?.name }}</span> ?
          Cette action est irréversible.
        </p>

        <div class="flex justify-center gap-4">
          <button @click="showDeleteModal = false"
            class="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            Annuler
          </button>
          <button @click="deleteEmployeeConfirmed"
            class="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition">
            Supprimer
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "EmployesManager",
  data() {
    return {
      searchQuery: "",
      sortKey: "",
      sortAsc: true,
      showModal: false,
      showDeleteModal: false,
      selectedEmployee: null,
      isEditing: false,
      currentId: null,
      employees: [],
      departements: [],
      form: {
        name: "",
        email: "",
        departement_id: "",
        poste: "",
        date_embauche: "",
        salaire: 0,
        statut: "actif",
      },
    };
  },
  methods: {
    fetchData() {
      this.axios.get(`${process.env.VUE_APP_APIREQUEST}/AllEmployer`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      })
        .then(({ data }) => {
          this.employees = data[0].data;
          this.departements = data[1];
        })
        .catch(error => console.error('Erreur :', error));
    },

    openModal(emp = null) {
      this.showModal = true;
      if (emp) {
        this.isEditing = true;
        this.currentId = emp.id;
        this.form.name = emp.name;
        this.form.email = emp.email;
        this.form.departement_id = emp?.fonction?.departement?.id;
        this.form.date_embauche = emp?.fonction?.date_embauche;
        this.form.salaire = emp?.fonction?.salaire;
        this.form.poste = emp?.fonction?.poste;
      } else {
        this.isEditing = false;
        this.currentId = null;
        this.resetForm();
      }
    },

    closeModal() {
      this.showModal = false;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        name: "",
        email: "",
        departement_id: 0,
        poste: "",
        date_embauche: "",
        salaire: 0,
        statut: "actif",
      };
    },

    saveEmployee() {
      const route = this.isEditing
        ? `${process.env.VUE_APP_APIREQUEST}/UpdateEmployer/${this.currentId}`
        : `${process.env.VUE_APP_APIREQUEST}/StoreEmployer`;

      const data = { ...this.form, id: this.currentId };
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

      const request = this.isEditing
        ? this.axios.put(route, data, config)
        : this.axios.post(route, data, config);

      request
        .then(() => {
          this.fetchData();
          this.closeModal();
        })
        .catch(error => console.error('Erreur :', error));
    },

    confirmDelete(emp) {
      this.selectedEmployee = emp;
      this.showDeleteModal = true;
    },

    deleteEmployeeConfirmed() {
      this.axios.delete(`${process.env.VUE_APP_APIREQUEST}/employees/delete/${this.selectedEmployee.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      })
        .then(() => {
          this.fetchData();
          this.showDeleteModal = false;
          this.selectedEmployee = null;
        })
        .catch(error => console.error('Erreur :', error));
    },

    toggleRole(emp) {
      let newType = emp.type < 7 ? emp.type + 1 : 0;
      this.axios.post(`${process.env.VUE_APP_APIREQUEST}/employees/change-role`, {
        id: emp.id,
        type: newType,
      })
        .then(() => this.fetchData())
        .catch(error => console.error('Erreur :', error));
    },

    getRoleName(type) {
      switch (type) {
        case 0: return "Stagiaire";
        case 1: return "Employé";
        case 2: return "Chef de département";
        case 3: return "Responsable RH";
        case 4: return "Comptable / Gestionnaire de paie";
        case 5: return "Responsable formation";
        case 6: return "Direction générale";
        case 7: return "Administrateur général";
        default: return "Rôle inconnu";
      }
    },

    changeSort(key) {
      if (this.sortKey === key) this.sortAsc = !this.sortAsc;
      else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.input-style {
  @apply w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition;
}
</style>
