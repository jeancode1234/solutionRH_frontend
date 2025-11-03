<template>
  <div class="relative bg-gray-800">
    <div
      class="w-[86%] sm:w-[92%] md:w-[95%] lg:w-[81.9%] ml-14 mt-14 absolute md:ml-[15.2rem]"
    >
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
        <div
          class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group"
        >
          <div
            class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
          >
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">{{ users.length }}</p>
            <p>utilisateurs</p>
          </div>
        </div>
        <div
          class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group"
        >
          <div
            class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
          >
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">{{ avis.length }}</p>
            <p>Avis</p>
          </div>
        </div>
        <div
          class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group"
        >
          <div
            class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
          >
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">{{ programmes.length }}</p>
            <p>Programmes</p>
          </div>
        </div>
        <div
          class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group"
        >
          <div
            class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
          >
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">{{ rendezvous.length }}</p>
            <p>Rendez-vous</p>
          </div>
        </div>
        <div
          class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group"
        >
          <div
            class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
          >
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">
              {{ Rdvaccep.length }}
            </p>
            <p>Rendez-vous Accepté</p>
          </div>
        </div>
        <div
          class="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group"
        >
          <div
            class="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
          >
            <svg
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">
              {{ RdvAttentes.length }}
            </p>
            <p>Rendez-vous en attente</p>
          </div>
        </div>
      </div>
      <!-- ./Statistics Cards -->

      <div class="grid grid-cols-1 p-4 gap-2">
        <!-- Social Traffic -->
        <!-- <div class="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
            <div class="rounded-t mb-0 px-0 border-0">
            <div class="flex flex-wrap items-center px-4 py-2">
                <div class="relative w-full max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">Social Traffic</h3>
                </div>
            </div>
            <div class="block w-full overflow-x-auto">
                <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                    <tr>
                    <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">ville occupee</th>
                    <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">proprietaires</th>
                    <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">stats</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Douala</th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">15478</td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                        <span class="mr-2">20%</span>
                        <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div style="width: 20%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                            </div>
                        </div>
                        </div>
                    </td>
                    </tr>
                    <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">Yaounde</th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">380</td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                        <span class="mr-2">40%</span>
                        <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div style="width: 40%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                            </div>
                        </div>
                        </div>
                    </td>
                    </tr>
                    <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">bafoussam</th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">45</td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                        <span class="mr-2">45%</span>
                        <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                            <div style="width: 45%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                            </div>
                        </div>
                        </div>
                    </td>
                    </tr>
                    <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">bertoua</th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">85</td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                        <span class="mr-2">60%</span>
                        <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                            <div style="width: 60%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                            </div>
                        </div>
                        </div>
                    </td>
                    </tr>
                    <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">afrique du sud</th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">50</td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex items-center">
                        <span class="mr-2">30%</span>
                        <div class="relative w-full">
                            <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div style="width: 30%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"></div>
                            </div>
                        </div>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div> -->
        <!-- ./Social Traffic -->

        <!-- Recent Activities -->
        <!-- <div
          class="relative flex flex-col min-w-0 break-words overflow-hidden overflow-y-hidden bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded"
        >
          <div class="rounded-t mb-0 px-0 border-0">
            <div class="flex flex-wrap items-center px-4 py-2">
              <div class="relative w-full max-w-full flex-grow flex-1">
                <h3
                  class="font-semibold text-base text-gray-900 dark:text-gray-50"
                >
                  posts recents
                </h3>
              </div>
            </div>
            <div class="block w-full">
              <div
                class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                Today
              </div>
              <ul class="my-1">
                <li class="flex px-4">
                  <div
                    class="w-9 h-9 rounded-full flex-shrink-0 bg-indigo-500 my-2 mr-3"
                  >
                    <div
                      class="relative hidden w-full h-full mr-3 rounded-full md:block"
                    >
                      <img
                        class="object-cover object-top shadow-md shadow-yellow-50/20 w-full h-full rounded-full"
                        alt=""
                        loading="lazy"
                      />
                      <div
                        class="absolute w-[10px] h-[10px] bg-blue-900 transform translate-y-[25px] translate-x-6 inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                      <div
                        class="absolute w-[10px] h-[10px] bg-indigo-200 transform translate-y-[25px] translate-x-6 inset-0 rounded-full shadow-inner"
                        aria-hidden="true"
                      ></div>
                    </div>
                  </div>
                  <div
                    class="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2"
                  >
                    <div class="flex justify-between items-center">
                      <div class="self-center">
                        <router-link to="">
                          <span class="text-blue-400 font-bold"> </span>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
        <!-- ./Recent Activities -->
      </div>

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
                  <th class="px-4 py-3">Nom</th>
                  <!-- <th class="px-4 py-3">email</th> -->
                  <th class="px-4 py-3">Email</th>
                  <th class="px-4 py-3">Role</th>
                  <th class="px-4 py-3">status</th>
                  <th class="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody
                class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
              >
                <tr
                  v-for="row in users"
                  :key="row.id"
                  class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                >
                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <div
                        class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
                      >
                        <img
                          class="object-cover object-top shadow-md shadow-yellow-50/20 w-full h-full rounded-full"
                          alt=""
                          :src="chemin + row.avatar"
                          loading="lazy"
                        />
                        <div
                          v-if="row.type == 0"
                          class="absolute w-[10px] h-[10px] bg-green-500 transform translate-y-[25px] translate-x-6 inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                        <div
                          v-if="row.type == 1"
                          class="absolute w-[10px] h-[10px] bg-red-500 transform translate-y-[25px] translate-x-6 inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p class="font-semibold"></p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          {{ row.name }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">{{ row.email }}</td>
                  <td class="px-4 py-3 text-sm">
                    <p v-if="row.type == 0">Utilisateur</p>
                    <p v-if="row.type == 1">Administrateur</p>
                  </td>
                  <!-- <td v-if="row.type == 1" class="px-4 py-3 text-sm">administrateur</td>
                    <td v-if="row.type == 0" class="px-4 py-3 text-sm">utilisateur</td>
                    <td v-if="row.type == 2" class="px-4 py-3 text-sm">super-administrateur</td> -->
                  <td class="px-4 py-3 text-xs">
                    <span
                      v-if="row.status == 'unlock'"
                      class="px-2 py-1 font-semibold leading-tight text-green-700 bg-red-100 rounded-full dark:bg-green-700 dark:text-green-100"
                      >{{ row.status }}
                    </span>
                    <span
                      v-if="row.status == 'lock'"
                      class="px-2 py-1 font-semibold leading-tight text-green-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-green-100 text-md"
                      >{{ row.status }}
                    </span>
                  </td>
                  <td
                    class="px-2 py-3 text-sm grid grid-cols-3 gap-2 text-right"
                  >
                    <button 
                      v-if="row.id != user.id" @click="destroyUser(row.id)"
                      class="bg-blue-400 text-white font-semibold rounded px-2 py-1"
                    >
                      supprimer
                    </button>
                    <button
                      v-if="row.status == 'unlock' && row.id != user.id"
                      @click="switch_user(row.id)"
                      class="bg-red-400 text-white font-semibold rounded px-2 py-1"
                    >
                      bloquer
                    </button>
                    <button
                      v-if="row.status == 'lock' && row.id != user.id"
                      @click="switch_user(row.id)"
                      class="bg-blue-800 text-white font-semibold rounded px-2"
                    >
                      debloquer
                    </button>
                    <button
                      @click="showModal(row.id, row.name, row.type)"
                      class="bg-indigo-400 text-white font-semibold rounded px-2 py-1"
                    >
                      changer de status
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

    <div v-if="hide"
            class="h-[800px] flex justify-center items-center ml-14  md:ml-[16.0rem] w-[83.2%] bg-black opacity-80">
            <form @submit.prevent="updateUser"
                class="w-4/12 mx-auto relative bg-white p-2 rounded shadow-xl shadow-blue-500 space-y-2">
                <label for="status" class="text-black text-lg font-semibold">changer le status de {{ name }}</label>
                <select v-model="elems.status" class="w-full px-2 py-1 text-black" name="status" id="">
                    <option value="">Choisissez un statut</option>
                    <option v-if="type == 1" value="utilisateur"
                        class="text-blue-500 hover:text-blue-900 ">utilisateur</option>
                    <option v-if="type == 0" value="administrateur"
                        class="text-blue-500 hover:text-blue-900">administrateur</option>
                </select>
                <div class="w-full justify-end">
                    <button @click="hide = !hide"
                        class="text-white text-md bg-gray-500 px-2 py-1 rounded font-semibold">close</button>
                    <button type="submit"
                        class="text-white text-md bg-green-500 px-2 py-1 rounded font-semibold">validez</button>
                </div>
            </form>
    </div>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data() {
    return {
      isConnected: false,
      pays: [],
      programmes: [],
      avis: [],
      rendezvous: [],
      RdvAttentes: [],
      Rdvaccep: [],
      user: {},
      users: [],
      elems: {
        idUser: "",
        status: "",
      },
      hide: false,
      name: "",
      type: "",
      chemin: "http://127.0.0.1:8000/avatars/",
      // URL_API: "http://127.0.0.1:8000/api/",
    };
  },
  created() {
    // setInterval(()=>{
    this.axios
      .get(store.state.BASE_URL + "Allusers")
      .then((response) => (this.users = response.data))
      .catch((error) => console.log(error));

    this.axios
      .get(store.state.BASE_URL + "allProg")
      .then((response) => (this.programmes = response.data))
      .catch((error) => console.log(error));

    this.axios
      .get(store.state.BASE_URL + "allRdv")
      .then((response) => (this.rendezvous = response.data))
      .catch((error) => console.log(error));
      //rendezvous en attente
      this.axios
      .get(store.state.BASE_URL + "Rdvatt")
      .then((response) => (this.RdvAttentes = response.data))
      .catch((error) => console.log(error));
    // rendezvous accepted
    this.axios
      .get(store.state.BASE_URL + "Rdvaccep")
      .then((response) => (this.Rdvaccep = response.data))
      .catch((error) => console.log(error));


    this.axios
      .get(store.state.API + "allavis")
      .then((response) => (this.avis = response.data))
      .catch((error) => console.log(error));
    // },2000)
  },

  methods: {
        updateUser () { 
		
        this.axios.put(store.state.BASE_URL + 'updateUser',this.elems)
          .then((response)=>{
                  this.users = response.data
                  this.hide = false
  
                  if(this.user.id == this.elems.idUser){
                      this.logout();
                  }
          })
        .catch(error => console.log(error))
          this.loading = false
      },
        destroyUser(id) {
            this.axios.delete(store.state.BASE_URL +'deleteUser/' + id)
                .then(response => this.users = response.data)
                .catch(error => console.log(error))
        },
        logout() 
    {
      this.axios
        .post(
          store.state.BASE_URL + "logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        )
        .then(() => {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("type");
          this.isConnected = false; // Mettre à jour l'état de connexion
          this.user = {}; // Réinitialiser les données de l'utilisateur
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Erreur lors de la déconnexion: ", error);
        });
    },
        switch_user(id) {
            this.axios.put(store.state.BASE_URL + 'switchUser/' + id)
                .then((response )=> {
                    this.users = response.data
                    for (let index = 0; index < this.users.length; index++) {
                        // const element = this.users[index];
                        if (this.users[index].email == this.user.email) {
                            this.user = this.users[index]
                            localStorage.removeItem('type')
                            localStorage.setItem('type', this.users[index].type)
                        }
                    }
                })
                .catch(error => console.log(error))
        },

        showModal(id, nom, type) {
            this.hide = true
            this.elems.idUser = id
            this.name = nom
            this.type = type
        }
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
};
</script>