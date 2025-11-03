<template>
  <TableView :title="'Présences'" :columns="columns" :rows="rows" />
</template>

<script setup>
import TableView from '@/components/common/TableView.vue'

const columns = [
  { label: 'Nom', key: 'nom' },
  { label: 'Poste', key: 'poste' },
  { label: 'Heure d’arrivée', key: 'arrivee' },
  { label: 'Heure de départ', key: 'depart' },
  { label: 'Statut', key: 'statut' },
]

const rows = [
  { id: 1, nom: 'Jean Dupont', poste: 'Développeur', arrivee: '08:30', depart: '17:00', statut: 'Présent' },
  { id: 2, nom: 'Sarah Kone', poste: 'RH', arrivee: '09:00', depart: '17:00', statut: 'Présent' },
  { id: 3, nom: 'Moussa Traoré', poste: 'Comptable', arrivee: '-', depart: '-', statut: 'Absent' },
  { id: 4, nom: 'Cynthia Mba', poste: 'Designer', arrivee: '08:45', depart: '17:10', statut: 'Présent' },
]
</script>
