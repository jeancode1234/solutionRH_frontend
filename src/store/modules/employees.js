export default {
  namespaced: true,
  state: () => ({
    employees: [
      { id: 1, nom: 'Jean Dupont', poste: 'Développeur', departement: 'IT' },
      { id: 2, nom: 'Sarah Kone', poste: 'RH', departement: 'Ressources humaines' },
      { id: 3, nom: 'Moussa Traoré', poste: 'Comptable', departement: 'Finance' }
    ]
  }),
  getters: {
    allEmployees: state => state.employees,
    totalEmployees: state => state.employees.length
  },
  mutations: {
    addEmployee(state, emp) {
      state.employees.push(emp)
    }
  },
  actions: {
    createEmployee({ commit }, emp) {
      commit('addEmployee', emp)
    }
  }
}
