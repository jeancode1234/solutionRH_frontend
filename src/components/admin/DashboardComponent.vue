<template>
  <div>
      <div
        class="min-h-screen min-w-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <!-- Header -->
        <div
          class="fixed min-w-full w-full flex items-center justify-between text-white z-10"
        >
          <div
            class="flex items-center justify-start md:justify-center p-3 w-20 md:w-64 h-16 bg-blue-800 dark:bg-gray-900 border-none"
          >
            <img
              class="w-7 h-7 md:w-14 md:h-14 mr-2 rounded-full object-cover object-top shadow-xl shadow-white overflow-hidden"
              :src="chemin + user.avatar"
            />
            <span class="hidden md:block">{{user.name}}</span>
          </div>
          <div
            class="px-3 min-w-[83.5%] flex justify-between items-center h-16 bg-blue-800 dark:bg-gray-900 header-right"
          >
            <div
              class="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200"
            >
              <button class="outline-none focus:outline-none">
                <svg
                  class="w-5 text-gray-600 h-5 cursor-pointer"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                class="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent"
              />
            </div>
            <ul class="flex items-center space-x-2">
              <li class="relative">
                <button
                  @click="isOpen = !isOpen"
                  class="block w-8 h-8 rounded-full overflow-hidden border-2 focus:outline-none focus:border-white"
                >
                  <img
                    :src="chemin + user.avatar"
                    class="w-full h-full object-cover"
                    alt=""
                  />
                </button>
                <!-- <button @click="isOpen = false" tabindex="-1" class="fixed z-10 top-0 right-0 bottom-0 left-0 h-full w-full " ></button> -->
               
              </li>
              <li>
                <button
                  @click="logout"
                  class="flex items-center mr-4 hover:text-blue-100"
                >
                  <span class="inline-flex mr-1">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <!-- ./Header -->

        <!-- Sidebar -->
        <div
          class="fixed flex flex-col mt-2 top-14 left-0 w-16 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar"
        >
          <div
            class="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow"
          >
            <ul class="flex flex-col py-4 space-y-1">
              <li class="px-5 hidden md:block">
                <div class="flex flex-row items-center h-8">
                  <div
                    class="text-sm font-light tracking-wide text-gray-400 uppercase"
                  >
                    Tableau de bord 
                  </div>
                </div>
              </li>
              <li>
                <router-link
                  to="/dashboardAdmin"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate"
                    >Dashboard</span
                  >
                </router-link>
              </li>
              <li>
                <router-link
                  to="/"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate"
                    >utilisateurs</span
                  >
                </router-link>
              </li>
              <li>
                <router-link
                  to="/"
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate"
                    >Programmes</span
                  >
                </router-link>
              </li>
              <li>
                <router-link
                  to="/"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate"
                    >Avis</span
                  >
                </router-link>
              </li>
              <li>
                <router-link
                  to="/"
                  href="#"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate"
                    >RendezVous</span
                  >
                  <!-- <span class="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span> -->
                </router-link>
              </li>
              <li class="px-5 hidden md:block">
                <div class="flex flex-row items-center mt-5 h-8">
                  <div
                    class="text-sm font-light tracking-wide text-gray-400 uppercase"
                  >
                    Settings
                  </div>
                </div>
              </li>
              <li>
                <router-link
                  to="/navbarUser"
                  class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-sm tracking-wide truncate"
                    >Profile</span
                  >
                </router-link>
              </li>
            </ul>
            <p class="mb-14 px-5 py-3 hidden md:block text-center text-xs">
              Copyright @2022
            </p>
          </div>
        </div>
        <!-- ./Sidebar -->
            
        <router-view name="two"></router-view>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isConnected: false,
      user: {},
      users: {},
      chemin: "http://127.0.0.1:8000/avatars/",
      URL_API: "http://127.0.0.1:8000/api/",
    };
  },

  created() {
    // setInterval(()=>{
    this.axios
      .get("/api/allusers")
      .then((response) => (this.users = response.data))
      .catch((error) => console.log(error));

    // },1000)
  },

  methods: {
    logout() {
      this.axios
        .post(
          this.URL_API + "logout",
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
  },
  mounted() {
    const token = localStorage.getItem("jwtToken");
    // const type = localStorage.getItem('type');
    // if (!token) {
    //   this.$router.push("/login");
    // }
    // if (type == 0) {
    //   this.$router.push("/");
    // }

    if (token) {
      this.isConnected = true;
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
    }
  },
};
</script>

<style>
</style>