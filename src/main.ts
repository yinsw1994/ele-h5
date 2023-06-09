import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Search, Icon, Loading, Skeleton } from 'vant'

import App from './App.vue'
import router from './router'

import { KeepAlive } from 'vue'

import './assets/main.css'
import 'vant/lib/index.css'
import './assets/common.scss'

const app = createApp(App)

app.component('KeepAlive', KeepAlive)

app.use(createPinia())
app.use(router)

app.use(Search)
app.use(Icon)
app.use(Loading)
app.use(Skeleton)

const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = `${(rootValue * deviceWidth) / rootWidth}px`

app.mount('#app')
