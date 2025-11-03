// src/store/modules/rh.js
export default {
  namespaced: true,
  state: () => ({
    // départements
    departments: [
      { id: 1, name: 'IT', manager: 'Nadine Ayissi', description: 'Développement & infra' },
      { id: 2, name: 'Ressources humaines', manager: 'Brigitte Ewane', description: 'Recrutement, paie' },
      { id: 3, name: 'Finance', manager: 'Moussa Traoré', description: 'Comptabilité' },
      { id: 4, name: 'Marketing', manager: 'Olivier Tchamba', description: 'Com' },
    ],

    // employés (liste centrale) — en prod, venir de l'API
    employees: [
      { id: 1, nom: 'Jean Dupont', email: 'jean@ex.com', poste: 'Dev', departmentId: 1 },
      { id: 2, nom: 'Sarah Kone', email: 'sarah@ex.com', poste: 'RH', departmentId: 2 },
      { id: 3, nom: 'Moussa Traoré', email: 'moussa@ex.com', poste: 'Comptable', departmentId: 3 },
      { id: 4, nom: 'Cynthia Mba', email: 'cynthia@ex.com', poste: 'Designer', departmentId: 4 },
    ],

    // évaluations : { id, employeeId, departmentId, score (1..5), comment, date }
    evaluations: [
      { id: 1, employeeId: 1, departmentId: 1, score: 4, comment: 'Bon travail sur le sprint', date: '2025-09-01' },
    ],

    // bulletins paie : { id, employeeId, mois, salaireBrut, retenues, net, status, createdAt, sent }
    paySlips: [
      { id: 1, employeeId: 1, mois: 'Septembre 2025', salaireBrut: 500000, retenues: 80000, net: 420000, status: 'Brouillon', createdAt: '2025-09-30', sent: false }
    ],
  }),
  getters: {
    allDepartments: (s) => s.departments,
    departmentById: (s) => (id) => s.departments.find(d => d.id === Number(id)),
    employees: (s) => s.employees,
    employeesByDepartment: (s) => (deptId) => s.employees.filter(e => Number(e.departmentId) === Number(deptId)),
    employeeById: (s) => (id) => s.employees.find(e => e.id === Number(id)),
    evaluationsByEmployee: (s) => (employeeId) => s.evaluations.filter(ev => ev.employeeId === Number(employeeId)),
    evaluationsByDepartment: (s) => (deptId) => s.evaluations.filter(ev => Number(ev.departmentId) === Number(deptId)),
    payslipsByEmployee: (s) => (employeeId) => s.paySlips.filter(p => p.employeeId === Number(employeeId))
  },
  mutations: {
    ADD_DEPARTMENT(state, dept) { state.departments.push(dept) },
    UPDATE_DEPARTMENT(state, updated) {
      const i = state.departments.findIndex(d => d.id === updated.id)
      if (i !== -1) state.departments.splice(i, 1, updated)
    },
    DELETE_DEPARTMENT(state, id) { state.departments = state.departments.filter(d => d.id !== id) },

    ASSIGN_EMPLOYEE(state, { employeeId, departmentId }) {
      const emp = state.employees.find(e => e.id === Number(employeeId))
      if (emp) emp.departmentId = Number(departmentId)
    },

    ADD_EVALUATION(state, ev) { state.evaluations.push(ev) },
    UPDATE_EVALUATION(state, ev) {
      const i = state.evaluations.findIndex(e => e.id === ev.id)
      if (i !== -1) state.evaluations.splice(i, 1, ev)
    },

    ADD_PAYSLIP(state, slip) { state.paySlips.push(slip) },
    UPDATE_PAYSLIP(state, slip) {
      const i = state.paySlips.findIndex(s => s.id === slip.id)
      if (i !== -1) state.paySlips.splice(i, 1, slip)
    },
    MARK_PAYSLIP_SENT(state, id) {
      const s = state.paySlips.find(pp => pp.id === id)
      if (s) s.sent = true, s.status = 'Envoyé'
    }
  },
  actions: {
    // Departments
    createDepartment({ commit }, payload) {
      const dept = { id: Date.now(), ...payload }
      commit('ADD_DEPARTMENT', dept)
      return dept
    },
    editDepartment({ commit }, payload) { commit('UPDATE_DEPARTMENT', payload); return payload },
    deleteDepartment({ commit }, id) { commit('DELETE_DEPARTMENT', id) },

    // Assign employee to dept
    assignEmployee({ commit }, { employeeId, departmentId }) {
      commit('ASSIGN_EMPLOYEE', { employeeId, departmentId })
    },

    // Evaluations
    addEvaluation({ commit }, { employeeId, departmentId, score, comment }) {
      const ev = { id: Date.now(), employeeId: Number(employeeId), departmentId: Number(departmentId), score, comment, date: new Date().toISOString().slice(0,10) }
      commit('ADD_EVALUATION', ev)
      return ev
    },
    updateEvaluation({ commit }, ev) { commit('UPDATE_EVALUATION', ev); return ev },

    // Paie
    createPayslip({ commit }, { employeeId, mois, salaireBrut, retenues }) {
      const net = Number(salaireBrut) - Number(retenues)
      const slip = { id: Date.now(), employeeId: Number(employeeId), mois, salaireBrut: Number(salaireBrut), retenues: Number(retenues), net, status: 'Brouillon', createdAt: new Date().toISOString(), sent: false }
      commit('ADD_PAYSLIP', slip)
      return slip
    },
    updatePayslip({ commit }, slip) { commit('UPDATE_PAYSLIP', slip); return slip },

    // Simule l'envoi (par ex. email) — ici on marque 'sent'
    async sendPayslip({ commit }, slipId) {
      // En prod: appel API pour envoyer email au salarié
      // simulation delay
      await new Promise(r => setTimeout(r, 600))
      commit('MARK_PAYSLIP_SENT', slipId)
      return true
    }
  }
}
