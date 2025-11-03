<template>
    <div class="relative bg-gray-800 font-poppins">
      <div class="w-[86%] sm:w-[92%] md:w-[95%] lg:w-[81.9%] ml-14 mt-14 absolute md:ml-[15.2rem] p-8">
        <!-- Client Table -->
        <div class="mt-2 mx-4 ">
          <div class="w-full border-b py-4">
            <router-link
              to="/AdminAllProgram"
              class="px-8 py-3 rounded bg-red-600 hover:bg-red-700 text-white"
            >Retour</router-link>
          </div>
          <div class="w-full py-8">
            <form @submit.prevent="updateForm" class="w-full lg:w-5/6 mx-auto h-80 space-y-4">
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
                <select v-model="form.pays_id" id="pays" class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600">
                  <option value="" selected disabled>Choisir le pays</option>
                  <option v-for="row in pays" :key="row.id" :value="row.id">
                    {{ row.name }}
                  </option>
                </select>
                <input
                  type="text"
                  v-model="form.titre"
                  placeholder="titre du programme"
                  class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                  
                />
              </div>
              <div class="w-full lg:flex space-y-4 lg:space-y-0 lg:space-x-4">
                <input
                  type="text"
                  v-model="form.type"
                  placeholder="Type de programme"
                  class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                  
                />
                <input
                  type="number"
                  v-model="form.frais"
                  placeholder="Frais appliqués au programme"
                  class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                  
                />
              </div>
              <div class="w-full lg:flex space-y-4 lg:space-y-0 lg:space-x-4">
                <input
                  type="text"
                  v-model="form.duree"
                  placeholder="Durée du programme"
                  class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                  
                />
                <input
                  type="date"
                  v-model="form.delais"
                  placeholder="Delais du programme"
                  class="w-full lg:w-1/2 p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                  
                />
              </div>
               <select v-model="form.statut"  class="w-full p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600">
                  <option value="" selected disabled>Choisir le statut du programme</option>
                  <option value="fermer">Fermer</option>
                  <option value="ouvert">Ouvert</option>
                </select> 
              <textarea
                v-model="form.description"
                cols="30"
                rows="5"
                class="w-full p-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Description"
                
              ></textarea>
              
               <div class="w-full pb-4">
                <button
                type="submit"
                class="w-full h-14 bg-[#073183] text-white rounded text-lg font-poppins"
              >
                Mettre à jour le programme
              </button>
               </div>
              
            </form>
          </div>
        </div>
        <!-- ./Client Table -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['programme'],
    data() {
      return {
        user:[],
        prog: {},
        pays: [],
        isConnected: false,
        form: {
          pays_id: "",
          titre: "",
          type: "",
          frais: "",
          duree: "",
          delais: "",
          statut: "",
          description: "",
          // Ajoutez d'autres champs nécessaires ici
        },
        URL_API: 'http://127.0.0.1:8000/api', // Assurez-vous que cette URL est correcte
        errors: [],
      };
    },
    mounted() {
      const token = localStorage.getItem("jwtToken");
      const type = localStorage.getItem('type');

      this.axios.get(this.URL_AUTH+'/showProg/' + this.programme)
                .then((response) => {
                    this.prog = response.data; // Assurez-vous que la structure des données est correcte
                    if (this.prog) {
                        this.form.pays_id = this.prog.pays_id;
                        this.form.titre = this.prog.titre;
                        this.form.type = this.prog.type;
                        this.form.frais = this.prog.frais;
                        this.form.duree = this.prog.duree;
                        this.form.delais = this.prog.delais;
                        this.form.statut = this.prog.statut;
                        this.form.description = this.prog.description;
                    }
                })
                .catch(error => console.log(error))
      // Vérification du token et du type d'utilisateur pour afficher le tableau des utilisateurs
    if (token && type == 1) {
          //Récupération des données de l'utilisateur
      this.isConnected = true; // Mettre à jour l'état de connexion
      this.axios
        .get(this.URL_API + "/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.user = response.data;
          console.log(this.user); // Stocker les données de l'utilisateur
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur: ",
            error
          );
        });
    }else{
      this.$router.push('/login')
    }
    this.fetchPays();
    },
    methods: {
      fetchPays() {
        this.axios
          .get(this.URL_API + "/allPays")
          .then((response) => {
            this.pays = response.data; // Assurez-vous que la structure des données est correcte
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des pays :", error.response ? error.response.data : error.message);
          });
      },

      updateForm()
      {
        this.errors = []; // Réinitialiser les erreurs
         let formData = new FormData();

        //   Ajouter les données du formulaire à formData
        formData.append("pays_id", this.form.pays_id);
        formData.append("titre", this.form.titre);
        formData.append("type", this.form.type);
        formData.append("frais", this.form.frais);
        formData.append("duree", this.form.duree);
        formData.append("delais", this.form.delais);
        formData.append("statut", this.form.statut);
        formData.append("description", this.form.description);
        formData.append("_method", "put");
          // Appeler la méthode pour la mise à jour du programme avec la nouvelle donnée
        this.axios
        .put(this.URL_API + "/updateProg/" + this.programme, formData)
        .then((response) => {
            console.log(response.data)
                this.$router.push('/AdminAllProgram');
                this.$router.go();
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
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>