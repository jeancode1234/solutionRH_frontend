<template>
  <div>
    <div class="w-full h-screen flex justify-end items-center relative">
      <div class="w-full h-full bg-[#073183] bg-opacity-60 absolute"></div>
      <div class="w-full h-full overflow-hidden">
        <img
          src="../../assets/img/carousel-2.jpg"
          class="w-full h-full object-cover object-center"
          alt="img_font"
        />
      </div>

      <div
        class="w-full md:w-[600px] flex flex-col justify-center items-center h-full bg-white absolute z-20"
      >
        <div class="w-full flex flex-col items-center space-y-2">
          <p class="text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Connexion à votre compte
          </p>
          <img
            src="../../assets/icon/logo_mfl.png"
            width="160"
            height="160"
            alt=""
          />
        </div>

        <div class="w-full">
          <div
            v-if="errors[0]"
            class="w-full space-y-2 flex flex-col py-2 justify-center"
          >
            <p
              v-if="errors[0]"
              class="bg-red-500 w-full text-center text-white rounded px-2 py-1"
              v-text="errors[0]"
            ></p>
            <p
              v-if="errors[1]"
              class="bg-red-500 w-full text-center text-white rounded px-2 py-1"
              v-text="errors[1]"
            ></p>
          </div>
          <p
            v-if="message"
            class="bg-red-500 w-full text-white rounded px-2 py-1"
            v-text="message"
          ></p>
        </div>
        <form @submit.prevent="login" class="w-full p-4 lg:p-12 space-y-2">
          <div class="w-full relative flex items-center">
            <img
              src="../../assets/icon/address.png"
              class="absolute right-4 w-6 h-6"
              alt=""
            />
            <input
              required
              type="email"
              v-model="form.email"
              autofocus
              class="w-full border focus:ring-2 text-lg focus:duration-300 ease-in-out focus:ring-[#073183] outline-none h-14 px-4 rounded-full placeholder:text-[#7c7d7e]"
              placeholder="Email"
            />
          </div>

          <div class="w-full relative flex items-center py-2">
            <img
              src="../../assets/icon/lock.png"
              @click="hidePassword"
              v-if="visibility == 'text'"
              class="absolute right-4 w-6 h-6"
              alt=""
            />
            <input
              v-model="form.password"
              required
              :type="visibility"
              autofocus
              class="w-full onlyunder border focus:ring-2 text-lg focus:duration-300 ease-in-out focus:ring-[#073183] outline-none h-14 px-4 rounded-full placeholder:text-[#7c7d7e]"
              placeholder="Mot de passe"
            />
            <img
              src="../../assets/icon/unlock.png"
              @click="showPassword"
              v-if="visibility == 'password'"
              class="absolute right-4 w-6 h-6"
              alt="hide_icon"
            />
          </div>
          <div>
            <a href="#" class="text-base text-blue-800 hover:text-blue-900"
              >Mot de passe oublié ?</a
            >
          </div>

          <div class="w-full space-y-4">
            <button
              class="w-full rounded-full h-14 bg-[#073183] hover:bg-[#182a50] ease-in duration-300 flex items-center justify-center text-xl text-white"
            >
              Se connecter
            </button>

            <button
              @click="loginWithGoogle"
              class="w-full rounded-full h-14 border border-[#073183] space-x-4 flex items-center justify-center text-xl"
            >
              <img
                src="../../assets/icon/google.png"
                class="w-6 h-6"
                alt="google_png"
              />
              <span> se connecter avec google</span>
            </button>

            <p class="text-lg text-center text-gray-700">
              n'avez vous pas de compte ?
              <router-link to="/register" class="text-blue-800"
                >S'inscrire</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store"
export default {
  data() {
    return {
       form: {
        email:'',
        password:'',
      },
      // URL_API:'http://127.0.0.1:8000/api/',
       errors:{},
       message:'',
      visibility: "password",
    };
  },
  mounted() {
        if (localStorage.getItem('jwtToken')) {
            this.$router.push('/');
        }
    },
  methods: {
    loginWithGoogle() {
      window.location.href = 'http://localhost:8000/auth/google';
    },
    login() {

            this.axios.post(store.state.BASE_URL + 'login', this.form,{
              // headers: {
              //   'Accept':'application/json',
              //   'Content-Type': 'application/json',
              // }
            }).then((response) => {
                if (response.data && response.data.access_token) {
                    localStorage.setItem('jwtToken', response.data.access_token.token)
                    localStorage.setItem('type', response.data.user.type)
                    this.$router.push('/');
                }
            }).catch(error => {
                if(!(this.form.email || this.form.password) || !(this.form.password && this.form.email)){
                    this.message = ''
                    this.errors = error.response.data.errors
                    // console.log(error)
                }else{
                    this.errors = ''
                    this.message = error.response.data.message
                }
            });
        },
        redirect() {
            this.$router.push('/register');
        },
    showPassword() {
      this.visibility = "text";
    },
    hidePassword() {
      this.visibility = "password";
    },
  },
};
</script>