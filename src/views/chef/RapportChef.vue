<template>
  <div class="space-y-6">
    <RapportForm title="Rapport sur un employé" auteur="Chef de département" />
    <RapportTable role="chef" />
  </div>
</template>

<script setup>
import RapportForm from "@/components/rapports/RapportForm.vue";
import RapportTable from "@/components/rapports/RapportTable.vue";
</script>
<style scoped>
</style>