<template>
  <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 animate-fadeIn">
      <h2 class="text-xl font-semibold text-gray-800 text-center mb-4">Réinitialiser le mot de passe</h2>
      <p class="text-gray-500 text-sm text-center mb-6">
        Entrez votre adresse email pour recevoir le lien de réinitialisation.
      </p>

      <Form @submit.prevent="handleReset" :validation-schema="schema" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Adresse email</label>
          <Field name="email" type="email" placeholder="ex: exemple@mail.com"
            class="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          <ErrorMessage name="email" class="text-sm text-red-500 mt-1 block" />
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition">Annuler</button>
          <button type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Envoyer</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
  components: { Form, Field, ErrorMessage },

  data() {
    return {
      schema: yup.object({
        email: yup.string().required("L'email est obligatoire").email("Format invalide"),
      }),
    }
  },

  methods: {
    handleReset(values) {
      console.log('Réinitialisation demandée pour :', values.email)
      alert(`Un lien de réinitialisation a été envoyé à ${values.email}`)
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
