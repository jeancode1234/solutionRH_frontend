<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
      {{ title }}
    </h3>

    <form @submit.prevent="submitForm" class="grid md:grid-cols-2 gap-4">
      <!-- Employé -->
      <div>
        <label class="block text-sm text-gray-500 dark:text-gray-300 mb-1">Employé</label>
        <select v-model="form.employee" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
          <option disabled value="">Choisir...</option>
          <option v-for="e in employees" :key="e.id" :value="e.name">{{ e.name }}</option>
        </select>
      </div>

      <!-- Période -->
      <div>
        <label class="block text-sm text-gray-500 dark:text-gray-300 mb-1">Période concernée</label>
        <select v-model="form.period" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
          <option value="quotidien">Quotidien</option>
          <option value="hebdomadaire">Hebdomadaire</option>
          <option value="mensuel">Mensuel</option>
          <option value="annuel">Annuel</option>
        </select>
      </div>

      <!-- Tâches -->
      <div class="md:col-span-2">
        <label class="block text-sm text-gray-500 dark:text-gray-300 mb-1">Description des tâches</label>
        <textarea v-model="form.tasks" rows="3" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"></textarea>
      </div>

      <!-- Indicateurs -->
      <div>
        <label class="block text-sm text-gray-500 mb-1">Temps total (heures)</label>
        <input v-model.number="form.totalTime" type="number" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1">% Productif</label>
        <input v-model.number="form.prodPercent" type="number" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1">% Non Productif</label>
        <input v-model.number="form.nonProdPercent" type="number" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
      </div>
      <div>
        <label class="block text-sm text-gray-500 mb-1">Qualité du travail (note /10)</label>
        <input v-model.number="form.quality" type="number" class="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
      </div>

      <!-- Bouton -->
      <div class="md:col-span-2 flex justify-end mt-4">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Envoyer le rapport
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const employees = ref([
  { id: 1, name: "Alice Dupont" },
  { id: 2, name: "Jean Mbarga" },
  { id: 3, name: "Fatou Ndiaye" },
]);

const props = defineProps({
  title: { type: String, default: "Nouveau rapport d’activité" },
  auteur: { type: String, default: "Chef" },
});

const form = ref({
  employee: "",
  period: "hebdomadaire",
  tasks: "",
  totalTime: 0,
  prodPercent: 0,
  nonProdPercent: 0,
  quality: 0,
});

function submitForm() {
  if (!form.value.employee || !form.value.tasks) {
    alert("Veuillez compléter le formulaire !");
    return;
  }
  store.dispatch("rapports/ajouterRapport", {
    ...form.value,
    auteur: props.auteur,
  });
  alert("✅ Rapport envoyé avec succès !");
  form.value = {
    employee: "",
    period: "hebdomadaire",
    tasks: "",
    totalTime: 0,
    prodPercent: 0,
    nonProdPercent: 0,
    quality: 0,
  };
}
</script>
