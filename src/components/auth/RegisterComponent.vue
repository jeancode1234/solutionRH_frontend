<template>
  <div class="w-full h-screen flex justify-center lg:justify-end items-center relative">
    <div class="hidden lg:flex w-full h-full bg-[#073183] bg-opacity-60 absolute"></div>
    <div class="hidden lg:flex w-full h-full overflow-hidden">
      <img
        src="../../assets/img/carousel-1.jpg"
        class="w-full h-full object-cover object-center"
        alt="img_font"
      />
    </div>

    <div class="w-full md:w-1/2 flex flex-col justify-center items-center h-full bg-white absolute z-20 px-4 lg:px-8">
      <div class="w-full flex flex-col items-center space-y-2">
        <p class="text-2xl sm:text-3xl lg:text-4xl font-poppins">Création de votre compte</p>
        <img src="../../assets/icon/logo_mfl.png" width="160" height="160" alt="Logo" />
      </div>

      <form @submit.prevent="register" class="w-10/12 space-y-4 mt-6">
        <div class=" overflow-hidden w-24 h-24 p-1 rounded-full shadow-lg bg-white mx-auto transform">
          <img
            id="photo"
            :src="avatarUrl || ''"
            alt="profil"
            class="w-full h-full object-cover rounded-full"
            @click="selectImage"
          />
          <input
            type="file"
            @change="avatar"
            id="avatar"
            class="hidden"
            ref="fileInput"
            accept="image/*"
          />
          <label
            for="avatar"
            class="w-32 h-16 mx-auto grid justify-items-center transform -translate-y-12 -translate-x-2 bg-black opacity-0 hover:opacity-70 cursor-pointer text-white font-semibold duration-150 delay-150"
            @click="selectImage"
          >
            <span class="pt-2">Profil</span>
          </label>
        </div>

        <div v-if="errors.length" class="space-y-2">
          <p
            v-for="(error, index) in errors"
            :key="index"
            class="bg-red-600 w-full text-center text-white rounded px-2 py-1"
          >
            {{ error }}
          </p>
        </div>

        <div class="relative flex items-center font-poppins">
          <img
            src="../../assets/icon/account.png"
            class="absolute right-4 w-6 h-6"
            alt="Account"
          />
          <input
            required
            type="text"
            v-model="form.name"
            class="w-full border focus:ring-2 text-lg focus:ring-[#073183] outline-none h-14 px-4 rounded-full placeholder:text-[#7a7a7a]"
            placeholder="Votre nom"
          />
        </div>

        <div class="relative flex items-center">
          <img
            src="../../assets/icon/address.png"
            class="absolute right-4 w-6 h-6"
            alt="Email"
          />
          <input
            required
            type="email"
            v-model="form.email"
            class="w-full border focus:ring-2 text-lg focus:ring-[#073183] outline-none h-14 px-4 rounded-full placeholder:text-[#7a7a7a]"
            placeholder="Email"
          />
        </div>

        <div class="relative flex items-center">
          <img
            src="../../assets/icon/lock.png"
            v-if="visibility === 'text'"
            @click="togglePasswordVisibility"
            class="absolute right-4 w-6 h-6 cursor-pointer"
            alt="Toggle Visibility"
          />
          <img
            src="../../assets/icon/unlock.png"
            v-if="visibility === 'password'"
            @click="togglePasswordVisibility"
            class="absolute right-4 w-6 h-6 cursor-pointer"
            alt="Toggle Visibility"
          />
          <input
            v-model="form.password"
            required
            :type="visibility"
            class="w-full border focus:ring-2 text-lg focus:ring-[#073183] outline-none h-14 px-4 rounded-full placeholder:text-[#7a7a7a]"
            placeholder="Mot de passe"
          />
        </div>

        <button
          class="w-full font-poppins rounded-full h-14 bg-[#073183] hover:bg-[#182a50] duration-300 flex items-center justify-center text-xl text-white"
        >
          S'inscrire
        </button>

        <p class="sm:text-lg text-center text-gray-700 font-poppins">
          Avez-vous déjà un compte ?
          <router-link to="/login" class="text-blue-800">Se connecter</router-link>
        </p>
      </form>
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
        email: "",
        password: "",
        type: 0,
        avatar: null,
      },
      // URL_AUTH: 'http://127.0.0.1:8000/api',
      avatarUrl: null,
      errors: [],
      visibility: "password",
    };
  },
  mounted() {
    if (localStorage.getItem("jwtToken")) {
      this.$router.push("/");
    }
  },
  methods: {
    avatar(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.avatar = file;
        this.avatarUrl = URL.createObjectURL(file);
      }
    },
    register() {
      this.errors = [];
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("type", this.form.type);
      if (this.form.avatar) {
        formData.append("avatar", this.form.avatar);
      }

      this.axios
        .post(store.state.API + "register",formData)
        .then((response) => {
          if (response.data && response.data.access_token.token) {
            localStorage.setItem("jwtToken", response.data.access_token.token);
            this.$router.push("/");
          } else {
            throw new Error("Réponse inattendue du serveur");
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors || [error.message];
        });
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    togglePasswordVisibility() {
      this.visibility = this.visibility === "password" ? "text" : "password";
    },
  },
};
</script>