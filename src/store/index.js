import { createStore } from 'vuex'
import paie from './modules/paie'
import employees from './modules/employees'
import chat from './modules/chat' // si tu as un module chat

export default createStore({
  modules: {
    employees,
    paie,
    chat
  }
})
