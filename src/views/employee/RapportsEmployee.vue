<template>
  <div class="space-y-6">
    <RapportForm title="Mon rapport d’activité" auteur="Employé" />
    <RapportTable role="employee" />
  </div>
</template>

<script setup>
import RapportForm from "@/components/rapports/RapportForm.vue";
import RapportTable from "@/components/rapports/RapportTable.vue";
</script>
