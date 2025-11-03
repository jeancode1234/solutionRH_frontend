<template>
  <div>
    <div class="  w-full flex items-center z-50 justify-between px-2 sm:px-8 py-6 lg:hidden shadow">
      <div class="items-center">
        <img src="../assets/icon/logo_mfl.png" class="" width="200" height="200" alt="logo_png" />
      </div>
      <div class="flex space-x-2 items-center">
        <div v-if="isConnected" @click="dropDown"
          class="cursor-pointer flex space-x-2 items-center justify-center relative">
          <div class="w-12 h-12 rounded-full overflow-hidden">
            <img :src="avatarUrl" class="w-full h-full object-cover object-center" alt="avatar_img" />
          </div>
          <img src="../assets/icon/drop.png" class="w-8 h-8" alt="arrow_drop_png" />
          <div :class="{ block: isDrop, hidden: !isDrop }"
            class="w-44 p-3 overflow-hidden duration-300 flex-col items-start justify-center absolute z-50 bg-white shadow-xl mx-auto translate-y-14 top-0 right-2">
            <div class="w-full border-b border-[#073183] flex justify-between items-center py-2">
              <a href="#" class="text-sm text-[#073183] font-semibold">Mon profil</a>
              <img src="../assets/icon/account.png" class="w-5 h-5" alt="profil_icon" />
            </div>
            <div class="w-full py-2 flex justify-between">
              <button class="outline-none text-[#073183] font-semibold text-sm">
                Deconnexion
              </button>
              <img src="../assets/icon/deconnect.png" class="w-5 h-5" alt="lougout_png" />
            </div>
          </div>
        </div>
        <button v-if="!isMenuOpen" @click="toggleMenu" class="xl:hidden space-y-1">
          <div class="w-8 h-1 bg-[#073183]"></div>
          <div class="w-8 h-1 bg-[#073183]"></div>
          <div class="w-8 h-1 bg-[#073183]"></div>
        </button>
        <button v-if="isMenuOpen" @click="toggleMenu" class="cursor-pointer relative">
          <div class="absolute right-4 transform rotate-45 w-8 h-1 bg-[#073183]"></div>
          <div class="absolute right-4 transform -rotate-45 w-8 h-1 bg-[#073183]"></div>
        </button>
      </div>
    </div>
    <div class="xl:fixed z-50 w-full">
      <div  v-if="isVisible" class="hidden font-poppins w-full lg:flex items-center justify-between px-8 py-3 bg-[#073183]">
        <div class="flex space-x-4">
          <div class="flex space-x-2 items-center text-white">
            <img src="../assets/icon/schedule_24dp_FFF_FILL0_wght400_GRAD0_opsz24.png" class="w-6 h-6" alt="time_png" />
            <div class="space-y-1">
              <p class="text-xs">
                Nous contacter <br />
                <span>24h/24h</span>
              </p>
            </div>
          </div>
          <div class="flex space-x-2 items-center text-white">
            <img src="../assets/icon/mail_24dp_FFF_FILL0_wght400_GRAD0_opsz24.png" class="w-6 h-6" alt="mail_png" />
            <div class="space-y-1">
              <p class="text-xs">
                Adresse : <br /><a href="http://mflgroup225@gmail.com" target="_blank"
                  rel="noopener noreferrer">mflgroup225@gmail.com</a>
              </p>
            </div>
          </div>
          <div class="flex space-x-2 items-center text-white">
            <img src="../assets/icon/phone_in_talk_24dp_FFF_FILL0_wght400_GRAD0_opsz24.png" class="w-6 h-6"
              alt="phone_png" />
            <div class="space-y-1">
              <p class="text-xs">
                Telephone: <br />
                <span>(+237) 691173 966</span>
              </p>
            </div>
          </div>
        </div>
          <div class="flex space-x-4 ">
              <div class="group">
                  
                  <div title="facebook" class="w-8  group-hover:bg-white duration-500 h-8 flex items-center justify-center rounded-full border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                        <g fill="#ffffff" class="group-hover:fill-blue-600 duration-500" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M16.403,9h-2.403v-2c0,-1.032 0.084,-1.682 1.563,-1.682h0.868c0.552,0 1,-0.448 1,-1v-1.254c0,-0.523 -0.401,-0.97 -0.923,-1.005c-0.604,-0.041 -1.209,-0.06 -1.815,-0.059c-2.713,0 -4.693,1.657 -4.693,4.699v2.301h-2c-0.552,0 -1,0.448 -1,1v2c0,0.552 0.448,1 1,1l2,-0.001v8.001c0,0.552 0.448,1 1,1h2c0.552,0 1,-0.448 1,-1v-8.003l2.174,-0.001c0.508,0 0.935,-0.381 0.993,-0.886l0.229,-1.996c0.069,-0.593 -0.395,-1.114 -0.993,-1.114z"></path></g></g>
                    </svg>
                  </div>
              </div>
              <div class="w-[3px] h-8 bg-white"></div>
              <div class="group">

                  <div title="instagram" class="w-8 h-8 group-hover:bg-white duration-500 flex items-center justify-center rounded-full border border-slate-200">
                      <svg xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                          <g fill="#ffffff" class="group-hover:fill-blue-600 duration-500" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z"></path></g></g>
                      </svg>
                  </div>
              </div>
              <div class="w-[3px] h-8 bg-white"></div>
              <div class="group">

                  <div title="twitter" class="w-8 h-8 group-hover:bg-white duration-500 flex items-center justify-center rounded-full border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0,0,256,256">
                        <g fill="#ffffff" class="group-hover:fill-blue-600 duration-500" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M24,4.30078c-0.89844,0.39844 -1.80078,0.69922 -2.80078,0.80078c1,-0.60156 1.80078,-1.60156 2.19922,-2.70312c-1,0.60156 -2,1 -3.09766,1.20313c-1,-1 -2.30078,-1.60156 -3.69922,-1.60156c-2.70312,0 -4.90234,2.19922 -4.90234,4.89844c0,0.40234 0,0.80078 0.10156,1.10156c-4.10156,-0.19922 -7.69922,-2.10156 -10.10156,-5.10156c-0.5,0.70313 -0.69922,1.60156 -0.69922,2.5c0,1.70313 0.89844,3.20313 2.19922,4.10156c-0.80078,-0.10156 -1.59766,-0.30078 -2.19922,-0.60156c0,0 0,0 0,0.10156c0,2.39844 1.69922,4.39844 3.89844,4.80078c-0.39844,0.09766 -0.79687,0.19922 -1.29687,0.19922c-0.30078,0 -0.60156,0 -0.90234,-0.10156c0.60156,2 2.40234,3.40234 4.60156,3.40234c-1.69922,1.30078 -3.80078,2.09766 -6.10156,2.09766c-0.39844,0 -0.80078,0 -1.19922,-0.09766c2.19922,1.39844 4.80078,2.19922 7.5,2.19922c9.10156,0 14,-7.5 14,-14c0,-0.19922 0,-0.39844 0,-0.60156c1,-0.69922 1.80078,-1.59766 2.5,-2.59766"></path></g></g>
                    </svg>
                  </div>
              </div>
              <div class="w-[3px] h-8 bg-white"></div>
              <div class="flex space-x-2 group items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:fill-red-600 duration-300" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M480.06-486.67q30.27 0 51.77-21.56 21.5-21.55 21.5-51.83 0-30.27-21.56-51.77-21.55-21.5-51.83-21.5-30.27 0-51.77 21.56-21.5 21.55-21.5 51.83 0 30.27 21.56 51.77 21.55 21.5 51.83 21.5ZM480-80Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z"/></svg>
                <p
                  class="text-sm text-white group-hover:scale-105 group-hover:duration-500 ease-in-out group-hover:text-red-600"
                >
                  Douala-pk13 face commissariat 13ème
                </p>
              </div>
          </div> 
       
      </div>
      <nav :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
        class="lg:flex w-full bg-white h-auto lg:justify-between py-8 lg:py-0 z-20 lg:relative lg:px-8 lg:h-24 shadow-xl lg:items-center xl:space-x-4">
        <div class="hidden lg:flex">
          <img src="../assets/icon/logo_mfl.png" class="" width="300" height="300" alt="logo_png" />
        </div>
        <ul
          class="font-poppins font-semibold flex flex-col lg:flex-row space-y-2 lg:space-y-0 px-4 lg:px-0 lg:space-x-8 justify-center lg:items-center">
          <li>
            <router-link to="/" class="block text-[#073183] py-3 duration-300 hover:text-[#000] text-lg">Accueil</router-link>
          </li>
          <li>
            <router-link to="/apropos" class="block text-[#073183] py-3 duration-300 hover:text-[#000] text-lg">Apropos
            </router-link>
          </li>
  
          <div class="relative group">
            <router-link to="/allprog" class=" text-[#073183] py-3 duration-300 group-hover:text-[#000] text-lg">Programmes</router-link>
           
          </div>
          <li>
            <a href="#" class="block text-[#073183] py-3 duration-300 hover:text-[#000] text-lg">Services</a>
          </li>
          <li v-if="isConnected && user.type!=0">
            <router-link class="block text-[#073183] py-3 duration-300 hover:text-[#000] text-lg"
            to="/dashboardAdmin">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/contact" class="block text-[#073183] py-3 duration-300 hover:text-[#000] text-lg">Contact</router-link>
          </li>
          <div v-if="!isConnected" class="w-full flex space-x-4 lg:space-x-2">
            <li>
              <router-link to="/login"
                class="px-6 py-3 rounded bg-[#073183] hover:bg-[#000] duration-300 text-white font-semibold">Se
                connecter</router-link>
            </li>
            <li>
              <router-link to="/register"
                class="px-6 py-3 rounded border border-[#073183] bg-white hover:bg-[#000] duration-300 text-black hover:text-white font-semibold">S'inscrire</router-link>
            </li>
          </div>
          <button type="submit" v-if="isConnected" @click="logout"
            class="px-6 py-3 rounded bg-[#073183] hover:bg-[#000] duration-300 text-white font-semibold">
            Déconnexion
          </button>

          <div @click="dropDown" v-if="isConnected"
            class="cursor-pointer hidden xl:flex space-x-2 items-center justify-center relative">
            <div class="w-12 h-12 border rounded-full overflow-hidden">
              <img :src="chemin + user.avatar" class="w-full h-full object-cover object-center" alt="avatar_img" />
            </div>
            <img src="../assets/icon/drop.png" class="w-8 h-8" alt="arrow_drop_png" />
            <div :class="{ block: isDrop, hidden: !isDrop }"
              class="w-44 p-3 overflow-hidden duration-300 flex-col items-start justify-center bg-white shadow-xl mx-auto absolute translate-y-14 top-0 right-8">
              <div class="w-full border-b border-[#073183] hidden xl:flex justify-between items-center py-2">
                <router-link class="text-sm text-[#073183] font-semibold">Mon profil</router-link>
                <img src="../assets/icon/account.png" class="w-5 h-5" alt="profil_icon" />
              </div>
              <div class="w-full py-2 flex justify-between">
                <button class="outline-none text-[#073183] font-semibold text-sm">
                  Deconnexion
                </button>
                <img src="../assets/icon/deconnect.png" class="w-5 h-5" alt="lougout_png" />
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </div>
    <router-view name="one"></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
import store from '@/store';
export default {
  data() {
    return {
      isVisible: true,
      user: {},
      isConnected: false,
      open: ref(false),
      chemin: "http://127.0.0.1:8000/avatars/",
      isMenuOpen: false,
      isDrop: false,
      // URL_API: "http://127.0.0.1:8000/api/",
    };
  },
  //   computed: {
  //     avatarUrl() {
  //         return this.user && this.user.avatar
  //             ? this.chemin + this.user.avatar
  //             : "http://127.0.0.1:8000/avatars/1724778585.png";
  //     },
  // },

  methods: {
    logout() 
    {
      this.axios
        .post(
          store.state.API + "logout",
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

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    dropDown() {
      this.isDrop = !this.isDrop;
    },
    handleScroll() {
       this.isVisible = window.scrollY < 100; // Changez 100 selon vos besoins
     },
  },
  beforeUnmount() {
     window.removeEventListener('scroll', this.handleScroll);
   },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    const token = localStorage.getItem("jwtToken");
    if (token) {
      this.isConnected = true;
      this.axios
        .get(store.state.API + "user", {
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