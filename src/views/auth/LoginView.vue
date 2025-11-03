<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 font-inter">
    <div class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-8">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div class="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A10 10 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 class="text-2xl font-extrabold text-gray-800">RRH</h1>
      </div>

      <!-- Titre -->
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Connexion</h2>

      <!-- Formulaire avec validation -->
      <Form @submit="handleLogin" :validation-schema="schema" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur / Email</label>
          <Field
            name="email"
            type="text"
            placeholder="ex: jean.dupont@entreprise.com"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="email" class="text-sm text-red-500 mt-1 block" />
        </div>

        <!-- Mot de passe -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <div class="relative">
            <Field
              name="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <!-- Bouton affichage -->
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.99 9.99 0 014.4-8" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <ErrorMessage name="password" class="text-sm text-red-500 mt-1 block" />
        </div>

        <!-- Options -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center text-gray-600">
            <input type="checkbox" v-model="rememberMe" class="mr-2 rounded border-gray-300 focus:ring-blue-500" />
            Se souvenir de moi
          </label>
          <a href="#" class="text-blue-600 hover:underline">Mot de passe oublié ?</a>
        </div>

        <!-- Bouton principal -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Connexion
        </button>
      </Form>

      <!-- OU -->
      <div class="flex items-center my-6">
        <div class="flex-1 h-px bg-gray-200"></div>
        <span class="px-3 text-gray-500 text-sm">ou</span>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <!-- Boutons sociaux -->
      <div class="space-y-3">
        <button
          @click="loginWithGoogle"
          class="w-full border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 py-2 rounded-lg transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5" />
          <span class="text-gray-700 font-medium text-sm">Continuer avec Google</span>
        </button>

        <button
          @click="loginWithFacebook"
          class="w-full border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-2 rounded-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
            <path
              d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.917.001c-1.504 0-1.795.715-1.795 1.762v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.326-.597 1.326-1.334V1.333C24 .597 23.403 0 22.675 0z"
            />
          </svg>
          <span class="font-medium text-sm">Continuer avec Facebook</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

// états
const rememberMe = ref(false)
const showPassword = ref(false)

// ✅ Validation avancée avec Yup
const schema = yup.object({
  email: yup
    .string()
    .required("L'email est obligatoire")
    .email("Format d'email invalide"),
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
})

function togglePassword() {
  showPassword.value = !showPassword.value
}

function handleLogin(values) {
  alert(`Connexion réussie !\nUtilisateur : ${values.email}`)

  
}

// 🔐 Authentification sociale simulée
function loginWithGoogle() {
  alert('Redirection vers Google OAuth...')
}

function loginWithFacebook() {
  alert('Redirection vers Facebook OAuth...')
}
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
