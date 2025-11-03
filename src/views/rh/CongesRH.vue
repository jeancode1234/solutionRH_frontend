<template>
  <TableView :title="'Congés'" :columns="columns" :rows="rows" />
</template>

<script setup>
import TableView from '@/components/common/TableView.vue'

const columns = [
  { label: 'Nom', key: 'nom' },
  { label: 'Type', key: 'type' },
  { label: 'Date de début', key: 'debut' },
  { label: 'Date de fin', key: 'fin' },
  { label: 'Statut', key: 'statut' },
]

const rows = [
  { id: 1, nom: 'Jean Dupont', type: 'Congé annuel', debut: '01/03/2025', fin: '10/03/2025', statut: 'Approuvé' },
  { id: 2, nom: 'Sarah Kone', type: 'Congé maladie', debut: '15/03/2025', fin: '18/03/2025', statut: 'En attente' },
  { id: 3, nom: 'Moussa Traoré', type: 'RTT', debut: '05/03/2025', fin: '07/03/2025', statut: 'Refusé' },
]
</script>
