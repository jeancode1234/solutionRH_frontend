// src/store/modules/chat.js
// Vuex module pour la messagerie interne (mock)
// Remplacez les mocks par des appels API / WebSocket selon vos besoins.

const state = () => ({
  conversations: [
    { id: 1, name: 'Jennifer Fritz', avatar: 'https://i.pravatar.cc/40?img=12', last: 'Peux-tu envoyer le doc ?', time: '15:15' },
    { id: 2, name: 'Laney Gray', avatar: 'https://i.pravatar.cc/40?img=32', last: 'Ok pour demain', time: '10:05' },
    { id: 3, name: 'Oscar Thomsen', avatar: 'https://i.pravatar.cc/40?img=22', last: 'Merci !', time: 'Hier' },
  ],
  // messagesByConv: { convId: [messages...] }
  messagesByConv: {
    1: [
      { id: 101, from: 'them', text: 'Bonjour, tu peux valider le document ?', time: '15:10' },
      { id: 102, from: 'me', text: 'Oui, je te l\'envoie tout de suite.', time: '15:12' },
    ],
    2: [
      { id: 201, from: 'them', text: 'On se voit demain ?', time: '09:50' },
    ],
    3: [
      { id: 301, from: 'them', text: 'Merci pour ton aide.', time: 'Hier 11:00' },
    ],
  },
  selectedConversationId: 1,
})

const getters = {
  allConversations: (state) => state.conversations,
  selectedConversationId: (state) => state.selectedConversationId,
  selectedConversation: (state) => state.conversations.find(c => c.id === state.selectedConversationId) || null,
  messagesForSelected: (state) => state.messagesByConv[state.selectedConversationId] || []
}

const mutations = {
  SET_SELECTED_CONV(state, convId) {
    state.selectedConversationId = convId
  },
  ADD_MESSAGE(state, { convId, message }) {
    if (!state.messagesByConv[convId]) state.messagesByConv[convId] = []
    state.messagesByConv[convId].push(message)
    // update last preview in conversations
    const conv = state.conversations.find(c => c.id === convId)
    if (conv) {
      conv.last = message.text || (message.file ? message.file.name : '')
      conv.time = message.time || ''
    }
  },
  ADD_CONVERSATION(state, conv) {
    state.conversations.unshift(conv)
    state.messagesByConv[conv.id] = []
  }
}

const actions = {
  // Simule le chargement initial
  loadConversations({ state }) {
    return Promise.resolve(state.conversations)
  },

  // sélectionne une conversation
  selectConversation({ commit }, convId) {
    commit('SET_SELECTED_CONV', convId)
  },

  // envoie un message (mock) ; en production, remplace par API / socket
  sendMessage({ commit }, { convId, text, file }) {
    const msg = {
      id: Date.now(),
      from: 'me',
      text: text || (file ? `Fichier : ${file.name}` : ''),
      file: file || null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    commit('ADD_MESSAGE', { convId, message: msg })
    // simulate reply after 800ms (optional)
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        from: 'them',
        text: 'Réponse automatique (mock).',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      commit('ADD_MESSAGE', { convId, message: reply })
    }, 800)
    return Promise.resolve(msg)
  },

  // upload mock : transforme le File en URL via URL.createObjectURL
  async uploadFile(_, file) {
    // en réel : envoyer via axios -> obtenir url
    const url = URL.createObjectURL(file)
    return { name: file.name, url, type: file.type }
  },

  // créer une nouvelle conversation (ex: démarrer chat)
  createConversation({ commit }, { name, avatar }) {
    const conv = { id: Date.now(), name, avatar: avatar || 'https://i.pravatar.cc/40', last: '', time: '' }
    commit('ADD_CONVERSATION', conv)
    commit('SET_SELECTED_CONV', conv.id)
    return conv
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
