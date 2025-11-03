export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    LOGOUT(state) {
      state.user = null
      localStorage.removeItem('user')
    },
  },
  actions: {
    login({ commit }, { email }) {
      let role = 'employee'
      if (email.includes('admin')) role = 'admin'
      else if (email.includes('rh')) role = 'rh'
      else if (email.includes('chef')) role = 'chef'
      const user = { id: Date.now(), name: email.split('@')[0], role }
      commit('SET_USER', user)
      return user
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    role: state => state.user?.role || null,
  },
}
