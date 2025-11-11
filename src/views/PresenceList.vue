<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Suivi des présences</h2>
      <button
        @click="openModal()"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
      >
        + Nouvelle présence
      </button>
    </div>

    <!-- Tableau des présences -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th class="p-3">Employé</th>
            <th class="p-3">Date</th>
            <th class="p-3">Heure arrivée</th>
            <th class="p-3">Heure départ</th>
            <th class="p-3">Statut</th>
            <th class="p-3">Remarque</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="presence in presences" :key="presence.id" class="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="p-3">{{ presence.user?.name }} {{ presence.user?.prenom }}</td>
            <td class="p-3">{{ presence.date }}</td>
            <td class="p-3">{{ presence.heure_arrivee }}</td>
            <td class="p-3">{{ presence.heure_depart }}</td>
            <td class="p-3">
              <span
                class="px-3 py-1 rounded-full text-white text-sm"
                :class="{
                  'bg-green-500': presence.statut === 'présent',
                  'bg-yellow-500': presence.statut === 'retard',
                  'bg-red-500': presence.statut === 'absent',
                  'bg-blue-500': presence.statut === 'congé',
                }"
              >
                {{ presence.statut }}
              </span>
            </td>
            <td class="p-3">{{ presence.remarque || '-' }}</td>
            <td class="p-3 text-center">
              <button
                @click="editPresence(presence)"
                class="text-blue-500 hover:text-blue-700 mr-3"
              >Modifier</button>
              <button
                @click="deletePresence(presence.id)"
                class="text-red-500 hover:text-red-700"
              >Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {{ isEditing ? 'Modifier la présence' : 'Ajouter une présence' }}
        </h3>

        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-200 mb-1">Employé</label>
            <select v-model="form.user_id" class="w-full border rounded-lg px-3 py-2">
              <option disabled value="">Sélectionner un employé</option>
              <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                {{ emp.name }} {{ emp.prenom }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-200 mb-1">Date</label>
            <input type="date" v-model="form.date" class="w-full border rounded-lg px-3 py-2" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 dark:text-gray-200 mb-1">Heure d’arrivée</label>
              <input type="time" v-model="form.heure_arrivee" class="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-200 mb-1">Heure de départ</label>
              <input type="time" v-model="form.heure_depart" class="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-200 mb-1">Statut</label>
            <select v-model="form.statut" class="w-full border rounded-lg px-3 py-2">
              <option disabled value="">Sélectionner un statut</option>
              <option value="présent">Présent</option>
              <option value="absent">Absent</option>
              <option value="retard">Retard</option>
              <option value="congé">Congé</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 dark:text-gray-200 mb-1">Remarque</label>
            <textarea v-model="form.remarque" class="w-full border rounded-lg px-3 py-2"></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button @click="closeModal" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Annuler</button>
          <button
            @click="savePresence"
            class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {{ isEditing ? 'Mettre à jour' : 'Enregistrer' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PresenceList",
  data() {
    return {
      presences: [],
      employees: [],
      showModal: false,
      isEditing: false,
      currentId: null,
      form: {
        user_id: "",
        date: "",
        heure_arrivee: "",
        heure_depart: "",
        statut: "",
        remarque: "",
      },
    };
  },
  methods: {
    fetchData() {
      this.axios
        .get(`${process.env.VUE_APP_APIREQUEST}/presences`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        })
        .then(({ data }) => {
          this.presences = data.presences;
          this.employees = data.employees;
        })
        .catch((error) => console.error("Erreur :", error));
    },
    openModal() {
      this.resetForm();
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    resetForm() {
      this.form = {
        user_id: "",
        date: "",
        heure_arrivee: "",
        heure_depart: "",
        statut: "",
        remarque: "",
      };
      this.isEditing = false;
      this.currentId = null;
    },
    editPresence(presence) {
      this.form = { ...presence, user_id: presence.user_id };
      this.currentId = presence.id;
      this.isEditing = true;
      this.showModal = true;
    },
    savePresence() {
      const route = this.isEditing
        ? `/presences/${this.currentId}`
        : "/presences";
      const method = this.isEditing ? "put" : "post";

      this.axios[method](`${process.env.VUE_APP_APIREQUEST}${route}`, this.form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
        .then(() => {
          this.fetchData();
          this.closeModal();
        })
        .catch((error) => console.error("Erreur :", error));
    },
    deletePresence(id) {
      if (!confirm("Voulez-vous vraiment supprimer cette présence ?")) return;
      this.axios
        .delete(`${process.env.VUE_APP_APIREQUEST}/presences/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        })
        .then(() => this.fetchData())
        .catch((error) => console.error("Erreur :", error));
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
