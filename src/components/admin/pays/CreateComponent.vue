<template>
  <div class="relative bg-gray-800">
    <div
      class="w-[86%] sm:w-[92%] md:w-[95%] lg:w-[81.9%] ml-14 mt-14 absolute md:ml-[15.2rem] p-8"
    >
      <!-- Client Table -->
      <div class="mt-2 mx-4">
        <div class="w-full border-b py-4">
          <router-link
            to=""
            class="px-8 py-3 rounded bg-red-600 hover:bg-red-700 text-white"
            >Retour</router-link
          >
        </div>
        <div class="w-full py-8">
          <form @submit.prevent="SubmitForm" class="w-full lg:w-5/6 mx-auto h-80 space-y-4">
            <div v-if="errors.length" class="space-y-2">
              <p
                v-for="(error, index) in errors"
                :key="index"
                class="bg-red-600 w-full text-center text-white rounded px-2 py-1"
              >
                {{ error }}
              </p>
            </div>

            <div class="w-full lg:flex space-y-4 lg:space-y-0 lg:space-x-4">
              <input
                type="text"
                v-model="form.name"
                placeholder="Nom du pays"
                class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
              <input
                type="text"
                v-model="form.superficie"
                placeholder="superficie du pays"
                class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>
            <div class="w-full lg:flex space-y-4 lg:space-y-0 lg:space-x-4">
              <input
                type="text"
                v-model="form.nbr_habitant"
                placeholder="Nombre d'habitants du pays"
                class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
              <input
                type="text"
                v-model="form.langue"
                placeholder="Langue du pays"
                class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                required
              />
            </div>

            <input
              type="file"
              @change="avatar"
              id="avatar"
            ref="fileInput"
            accept="image/*"
              class="w-full p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
              required
            />
            <textarea
              v-model="form.description"
              id=""
              cols="30"
              rows="5"
              class="w-full p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Description"
              required
            ></textarea>

            <button
              class="w-full h-14 bg-[#073183] text-white rounded text-lg font-poppins"
            >
              Enregister
            </button>
          </form>
        </div>
      </div>
      <!-- ./Client Table -->
    </div>
  </div>
</template>
<script>
import store from '@/store';
export default {
  data() {
    return {
      form: {
        name: "",
        superficie: "",
        nbr_habitant: "",
        langue: "",
        photo: null,
        description: "",
      },
      // URL_AUTH: 'http://127.0.0.1:8000/api',
      avatarUrl: null,
      errors: {},
    };
  },

  methods: {
    avatar(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.photo = file;
        this.avatarUrl = URL.createObjectURL(file);
      }
    },
    SubmitForm() {
    this.errors = []; // Réinitialiser les erreurs
    let formData = new FormData();
    
    // Ajouter les données du formulaire à formData
    formData.append("name", this.form.name);
    formData.append("superficie", this.form.superficie);
    formData.append("nbr_habitant", this.form.nbr_habitant);
    formData.append("langue", this.form.langue);
    formData.append("description", this.form.description);
    
    // Ajouter la photo si elle existe
    if (this.form.photo) {
        formData.append("photo", this.form.photo);
    }

    // Envoyer la requête POST
    this.axios
        .post(store.state.API + "storePays", formData)
        .then((response) => {
            // Gérer la réponse réussie
            console.log("Pays créé avec succès :", response.data);
            // Réinitialiser le formulaire ou rediriger l'utilisateur
            this.resetForm();
        })
        .catch((error) => {
            // Gérer les erreurs
            if (error.response && error.response.data && error.response.data.errors) {
                // Assignation des erreurs spécifiques
                this.errors = error.response.data.errors;
            } else {
                // Erreur générale
                this.errors = [error.message];
            }
        });
},

resetForm() {
    // Réinitialiser le formulaire (à adapter selon vos besoins)
    this.form = {
        name: '',
        superficie: '',
        nbr_habitant: '',
        langue: '',
        description: '',
        photo: null,
    };
},
    selectImage() {
      this.$refs.fileInput.click();
    },
  },
};
</script>