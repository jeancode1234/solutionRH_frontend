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
                  class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="px-4 py-3">Pays</th>
                  <td v-for="item in pays" :key="item.id">
                     <p v-if="prog.pays_id == item.id" class="flex items-center">
                         <img :src="chemin + item.photo" class="w-10 h-10 rounded-full mr-2" alt="country_img">
                         {{item.name}}
                     </p>
                  </td>
                </tr>
                <tr
                  class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700  dark:text-gray-400"
                >
                  <th class="px-4 py-3">Titre</th>
                  <td>{{prog.titre}}</td>
                </tr>
                <tr
                  class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="px-4 py-3">Type</th>
                  <td>
                     {{prog.type}}
                  </td>
                </tr>
                <tr
                  class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700  dark:text-gray-400"
                >
                  <th class="px-4 py-3">Description</th>
                  <td>{{prog.description}}</td>
                </tr>
                <tr
                  class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="px-4 py-3">Frais</th>
                  <td>
                     {{prog.frais}} FCFA
                  </td>
                </tr>
                <tr
                  class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700  dark:text-gray-400"
                >
                  <th class="px-4 py-3">Duree</th>
                  <td>{{prog.duree}} mois</td>
                </tr>
                <tr
                  class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="px-4 py-3">Delais</th>
                  <td>
                     {{prog.delais}}
                  </td>
                </tr>
                <tr
                  class="text-lg font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                >
                  <th class="px-4 py-3">Conditions</th>
                  <td>
                     {{prog.conditions}}
                  </td>
                </tr>
              </thead>
              
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
  props: ['programme'],
  data(){
    return {
      pays:{},
      prog: {},
      // URL_AUTH: 'http://127.0.0.1:8000/api',
      chemin: "http://192.168.1.155:8000/country_img/",
    }
  },
  methods:{
    destroyProg(programme) {
          this.axios
           .delete(store.state.API + 'deleteProg/' + programme)
           .then(response =>this.prog = response.data)
           .catch((error) => console.log(error));
        },
  },
   created(){
    this.axios
        .get(store.state.API + 'allPays')
        .then((response) => (this.pays = response.data))
        .catch((error) => console.log(error));


   },
  mounted() {
        if (localStorage.getItem('jwtToken')) {
            this.axios.get(store.state.API +'showProg/' + this.programme)
                .then(
                  response => this.prog = response.data
                )
                .catch(error => console.log(error))
        } else {
            this.$router.push('/login')
        }
    }
 }
</script>