// ✅ src/store/modules/rapports.js
export default {
  namespaced: true,
  state: () => ({
    rapports: [
      {
        id: 1,
        employee: "Jean Dupont",
        period: "Octobre 2025",
        tasks: "Mise à jour du CRM, support client, formation interne",
        totalTime: 120,
        prodPercent: 85,
        nonProdPercent: 15,
        quality: 4.5,
        status: "En attente",
      },
      {
        id: 2,
        employee: "Claire Mbarga",
        period: "Octobre 2025",
        tasks: "Refonte interface web, rédaction rapport design",
        totalTime: 100,
        prodPercent: 90,
        nonProdPercent: 10,
        quality: 4.7,
        status: "Validé",
      },
    ],
  }),

  mutations: {
    UPDATE_STATUS(state, { id, status }) {
      const r = state.rapports.find((x) => x.id === id)
      if (r) r.status = status
    },
  },

  actions: {
    validateRapport({ commit }, id) {
      commit("UPDATE_STATUS", { id, status: "Validé" })
    },
    rejectRapport({ commit }, id) {
      commit("UPDATE_STATUS", { id, status: "Rejeté" })
    },
  },

  getters: {
    all: (state) => state.rapports,
    validated: (state) => state.rapports.filter((r) => r.status === "Validé"),
    pending: (state) => state.rapports.filter((r) => r.status === "En attente"),
  },
}
