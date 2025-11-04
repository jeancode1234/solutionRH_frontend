// 📦 Store Vuex — Gestion complète de la Paie RH
// ----------------------------------------------------

export default {
  namespaced: true,

  state: {
    fiches: JSON.parse(localStorage.getItem('paie_fiches') || '[]'),
    settings: JSON.parse(localStorage.getItem('paie_settings') || '{}'),
  },

  getters: {
    allFiches: (state) => state.fiches,
    settings: (state) =>
      state.settings || { taxRate: 10, cnpsRate: 4.2, autoBonusRate: 5 },

    fichesByStatus: (state) => (status) =>
      state.fiches.filter((f) => f.status === status),

    fichesByEmployee: (state) => (employee) =>
      state.fiches.filter((f) => f.employee === employee),
  },

  mutations: {
    // 🔧 Paramètres
   updateSettings(state, payload) {
    state.settings = payload
    localStorage.setItem('paieSettings', JSON.stringify(payload))
  },

    // ➕ Ajout d’une fiche
    addFiche(state, fiche) {
      const id = Date.now()
      const newFiche = { id, ...fiche }
      state.fiches.push(newFiche)
      localStorage.setItem('paie_fiches', JSON.stringify(state.fiches))
    },

    // ✏️ Mise à jour d’une fiche
    updateFiche(state, updated) {
      const index = state.fiches.findIndex((f) => f.id === updated.id)
      if (index !== -1) {
        state.fiches[index] = { ...state.fiches[index], ...updated }
        localStorage.setItem('paie_fiches', JSON.stringify(state.fiches))
      }
    },

    // 🗑️ Suppression
    deleteFiche(state, id) {
      state.fiches = state.fiches.filter((f) => f.id !== id)
      localStorage.setItem('paie_fiches', JSON.stringify(state.fiches))
    },

    // ✅ Validation
    validateFiche(state, id) {
      const fiche = state.fiches.find((f) => f.id === id)
      if (fiche) {
        fiche.status = 'Validée'
        fiche.validatedAt = new Date().toISOString()
        localStorage.setItem('paie_fiches', JSON.stringify(state.fiches))
      }
    },

    // 💰 Marquer comme payée
    markAsPaid(state, id) {
      const fiche = state.fiches.find((f) => f.id === id)
      if (fiche) {
        fiche.status = 'Payée'
        fiche.paidAt = new Date().toISOString()
        localStorage.setItem('paie_fiches', JSON.stringify(state.fiches))
      }
    },

    // 📥 Import de données (depuis Excel ou JSON)
    importFiches(state, fiches) {
      state.fiches = [...state.fiches, ...fiches]
      localStorage.setItem('paie_fiches', JSON.stringify(state.fiches))
    },
  },

  actions: {
    // 🧮 Calcul automatique du salaire net
    calculateNet({ state }, fiche) {
      const s = state.settings || { taxRate: 10, cnpsRate: 4.2, autoBonusRate: 5 }
      const bonus = (fiche.primes || 0) + (fiche.base * s.autoBonusRate) / 100
      const deductions =
        (fiche.retenues || 0) +
        (fiche.base * s.taxRate) / 100 +
        (fiche.base * s.cnpsRate) / 100
      const net = fiche.base + bonus - deductions
      return parseFloat(net.toFixed(2))
    },

    // 🆕 Création complète
    async createFiche({ commit, dispatch }, fiche) {
      const net = await dispatch('calculateNet', fiche)
      const final = { ...fiche, net, status: 'En attente', createdAt: new Date().toISOString() }
      commit('addFiche', final)
    },

    async updateFiche({ commit, dispatch }, fiche) {
      const net = await dispatch('calculateNet', fiche)
      commit('updateFiche', { ...fiche, net })
    },

    async importFiches({ commit }, fiches) {
      commit('importFiches', fiches)
    },
  },
}
