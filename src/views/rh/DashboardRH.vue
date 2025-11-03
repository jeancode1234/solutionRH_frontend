<template>
  <div class="space-y-6">
    <!-- CARTES DE STAT -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Employés actifs" value="128" color="blue" />
      <StatCard label="Congés en cours" value="12" color="yellow" />
      <StatCard label="Formations" value="6" color="purple" />
      <StatCard label="Taux de présence" value="92%" color="green" />
    </div>

    <!-- GRAPHIQUES -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PresenceChart />
      <CongeChart />
    </div>

    <!-- ÉCHÉANCES & ACTIVITÉS -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RHUpcoming />
      <RHActivity />
    </div>
  </div>
</template>

<script setup>
import StatCard from '@/components/rh/RHStatCard.vue'
import PresenceChart from '@/components/rh/PresenceChart.vue'
import CongeChart from '@/components/rh/CongeChart.vue'
import RHUpcoming from '@/components/rh/RHUpcoming.vue'
import RHActivity from '@/components/rh/RHActivity.vue'
</script>
<style scoped>
</style>