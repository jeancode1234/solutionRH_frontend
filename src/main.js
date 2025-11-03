import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Import TailwindCSS + Remixicon (si utilisés)
import 'tailwindcss/tailwind.css'
import 'remixicon/fonts/remixicon.css'

// Crée et monte l’application Vue
const app = createApp(App)
// initialise le socket (adresse du backend)
// initSocket("http://localhost:3000"); // <-- adapte l'URL de ton serveur
app.use(store)
app.use(router)
app.mount('#app')
