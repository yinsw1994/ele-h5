import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { KeepAlive } from 'vue'

import './assets/main.css'
import 'vant/lib/index.css'

const app = createApp(App)

app.component('KeepAlive', KeepAlive)

app.use(createPinia())
app.use(router)

app.mount('#app')
