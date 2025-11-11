import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'tailwindcss/tailwind.css'
import 'remixicon/fonts/remixicon.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
const app = createApp(App)

app.use(VueAxios,axios).use(store).use(router).mount('#app')
