<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">📊 Suivi des rapports d’activité</h2>
    <RapportStats />
    <RapportTable role="rh" />
  </div>
</template>

<script setup>
import RapportTable from "@/components/rapports/RapportTable.vue";
import RapportStats from "@/components/rapports/RapportStats.vue";
</script>
<style scoped>
</style>