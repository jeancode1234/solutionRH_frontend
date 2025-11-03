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
                  <th class="px-4 py-3">Pays</th>
                  <!-- <th class="px-4 py-3">email</th> -->
                  <th class="px-4 py-3">Titre</th>
                  <th class="px-4 py-3">Type</th>
                  <th class="px-4 py-3">Frais</th>
                  <th class="px-4 py-3">Durée</th>
                  <th class="px-4 py-3">Delais</th>
                  <th class="px-4 py-3">statut</th>
                  <th class="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                <tr
                  v-for="row in programmes"
                  :key="row.id"
                  class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                >
                  <td class="px-4 py-3" >
                    <div v-for="item in pays" :key="item.id">
                      <div class="flex items-center text-sm" v-if="row.pays_id == item.id">
                      <div
                        class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                      >
                        <img
                          class="object-cover object-top shadow-md shadow-yellow-50/20 w-full h-full rounded-full"
                          alt=""
                          :src="chemin + item.photo"
                          loading="lazy"
                        />
                        
                      </div>
                      <div>
                        <p class="font-semibold"></p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          {{ item.name }}
                        </p>
                      </div>
                    </div>
                    </div>
                    
                  </td>
                  <td class="px-4 py-3 text-sm">{{ row.titre }}</td>
                  <td class="px-4 py-3 text-sm">{{ row.type }}</td>
                  <td class="px-4 py-3 text-sm">{{ row.frais }}</td>
                  <td class="px-4 py-3 text-sm">{{ row.duree }}</td>
                  <td class="px-4 py-3 text-sm">{{ row.delais }}</td>
                  <td class="px-4 py-3 text-sm">{{ row.statut }}</td>
                  
                  <td
                     class="px-2 py-3 text-sm grid grid-cols-3 gap-2 text-right"
                  >
                    <button 
                      v-if="row.id" @click="destroyProg(row.id)"
                      class="bg-blue-400 text-white font-semibold rounded px-2 py-1"
                    >
                      Delete
                    </button>
                    <router-link :to="{name:'edit', params:{programme: row.id} }" class="px-4 py-2 rounded bg-green-600 text-white font-poppins">
                       Edit
                    </router-link>
                    <router-link 
                                :to="{name:'detail', params:{programme: row.id} }">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </router-link>
                    <!-- <button class="px-4 py-2 rounded bg-pink-600 text-white font-poppins">
                       close
                    </button> -->
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
import store from '@/store';
export default{
    data() {
    return {
      user:[],
      pays: [],
      programmes: [],
      // URL_AUTH: 'http://127.0.0.1:8000/api',
      chemin: "http://192.168.1.155:8000/country_img/",
    };
  },


    created()
    {
        this.axios
        .get(store.state.BASE_URL + 'allPays')
        .then((response) => (this.pays = response.data))
        .catch((error) => console.log(error));

        this.axios
        .get(store.state.BASE_URL + 'allProg')
        .then((response) => (this.programmes = response.data))
        .catch((error) => console.log(error));
        
    },
    methods:
    {
        destroyProg(id) {
          this.axios
           .delete(store.state.BASE_URL + 'deleteProg/' + id)
           .then(response =>this.programmes = response.data)
           .catch((error) => console.log(error));
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
        .get(store.state.BASE_URL + "user", {
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