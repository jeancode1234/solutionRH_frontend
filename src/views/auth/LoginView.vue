<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 font-inter">
    <div class="w-full max-w-sm bg-white shadow-2xl rounded-3xl p-10 backdrop-blur-sm">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-semibold text-gray-800 tracking-tight">Connexion</h1>
      </div>

      <Form @submit="handleLogin" :validation-schema="schema" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nom d'utilisateur / Email</label>
          <Field name="email" type="text" placeholder="jean.dupont@entreprise.com"
            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
          <ErrorMessage name="email" class="text-sm text-red-500 mt-1 block" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
          <div class="relative">
            <Field name="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
              class="w-full border border-gray-300 rounded-xl px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.99 9.99 0 014.4-8" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <ErrorMessage name="password" class="text-sm text-red-500 mt-1 block" />
        </div>

        <div class="flex justify-end">
          <button type="button" @click="openResetModal" class="text-blue-600 text-sm hover:underline">
            Mot de passe oublié ?
          </button>
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center">
          <div v-if="loading" class="w-4 h-4 ">
            <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C16.9706 3 21 7.02944 21 12H19C19 8.13401 15.866 5 12 5V3Z"></path>
            </svg>
          </div>
          <div v-else>
            se connecter
          </div>
        </button>
      </Form>
    </div>

    <ResetPasswordModal v-if="showResetModal" @close="showResetModal = false" />
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import ResetPasswordModal from './resetpassword/ResetPasswordModal.vue'

export default {
  created() {
    if (localStorage.getItem('authToken')) {
      this.$router.push("/dashboard")
    }
  },
  components: { Form, Field, ErrorMessage, ResetPasswordModal },

  data() {
    return {
      showPassword: false,
      showResetModal: false,
      loading: false,
      schema: yup.object({
        email: yup.string().required("L'email est obligatoire").email("Format d'email invalide"),
        password: yup.string().required("Le mot de passe est obligatoire").min(6, "Minimum 6 caractères"),
      }),
    }
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },

    openResetModal() {
      this.showResetModal = true
    },

    handleLogin(values) {
      this.axios.post(`${process.env.VUE_APP_APIREQUEST}/login`, {
        email: values.email,
        password: values.password,
      }).then(({ data }) => {
        localStorage.setItem('authToken', data.access_token.token)
        this.$router.push("/dashboard")
      }).catch(error => {
        console.error('Erreur lors de la connexion :', error)
      })
    },
  },
}
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
