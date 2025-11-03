<template>
    <div class="relative bg-gray-800">
        <div class="w-[86%] sm:w-[92%] md:w-[95%] lg:w-[81.9%] ml-14 mt-14 absolute md:ml-[15.2rem] p-8">
            <!-- Client Table -->
      <div class="mt-2 mx-4">
        <div class="w-full h-64 rounded-lg shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead class="">
                <tr
                  style=""
                  class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="px-4 py-3">DateRDV</th>
                  <!-- <th class="px-4 py-3">email</th> -->
                  <th class="px-4 py-3">HeureDebut</th>
                  <th class="px-4 py-3">HeureFin</th>
                  <th class="px-4 py-3">Raison</th>
                  <th class="px-4 py-3">Client</th>
                  <th class="px-4 py-3">status</th>
                  <th class="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                <tr
                  v-for="row in rendezvous"
                  :key="row.id"
                  class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                >
                  <td>
                    {{ row.dateRdv }}
                  </td>
                  <td>
                    {{ row.heureDebut }}
                  </td>
                  <td>
                    {{ row.heureFin }}
                  </td>
                  <td>
                  {{ row.raison }}
                  </td>
                  <td class="" v-for="user in users" :key="user.id">
                    <div class="flex items-center text-sm" v-if="row.user_id==user.id">
                      <div
                        class=" hidden w-8 h-8 mr-3 rounded-full md:block"
                      >
                        <img
                          class="object-cover object-top shadow-md shadow-yellow-50/20 w-full h-full rounded-full"
                          alt=""
                          :src="chemin + user.avatar"
                          loading="lazy"
                        />
                        
                      </div>
                      <div>
                        <p class="font-semibold"></p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          {{ user.name }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {{ row.statut }}
                  </td>
                  <td class="flex space-x-1 py-2 justify-center">
                    <button 
                       @click="destroyRdv(row.id)"
                      class="bg-blue-400 text-white font-semibold rounded px-2 py-1"
                    >
                      supprimer
                    </button>
                    <button
                      v-if="row.statut == 'en attente'"
                      @click="switch_rdv(row.id)"
                      class="bg-green-400 text-white font-semibold rounded px-2 py-1"
                    >
                      accepted
                    </button>
                    <button
                      v-if="row.statut == 'accepter'"
                      @click="switch_rdv(row.id)"
                      class="bg-blue-800 text-white font-semibold rounded px-2"
                    >
                       attente
                    </button>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- ./Client Table -->
        </div>
    </div>
</template>
<script>
  export default{

    data() {
        return {
            users: [],
            rendezvous: [],
            chemin: "http://127.0.0.1:8000/avatars/",
            URL_API: "http://127.0.0.1:8000/api/",
        }
  },

  created() {
    this.axios
      .get(this.URL_API + "Allusers")
      .then((response) => (this.users = response.data))
      .catch((error) => console.log(error));

    this.axios
      .get(this.URL_API + "allRdv")
      .then((response) => (this.rendezvous = response.data))
      .catch((error) => console.log(error));
  },

  methods: {
    destroyRdv(id) {
            this.axios.delete(this.URL_API +'delete/' + id)
                .then(response => this.rendezvous = response.data)
                .catch(error => console.log(error))
        },
        switch_rdv(id) {
            this.axios.put(this.URL_API + 'toggleRdv/' + id)
                .then((response )=> {
                    this.rendezvous = response.data
                })
                .catch(error => console.log(error))
        },
  },

  mounted() {
      const token = localStorage.getItem("jwtToken");
      const type = localStorage.getItem('type');
      
      // Vérification du token et du type d'utilisateur pour afficher le tableau des utilisateurs
    if (token && type == 1) {
          //Récupération des données de l'utilisateur
      this.isConnected = true; // Mettre à jour l'état de connexion
      this.axios
        .get(this.URL_API + "user", {
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
    }
}
</script>