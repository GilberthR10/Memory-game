import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))

app.mount('#app')
