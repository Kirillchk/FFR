import './assets/main.css'
import 'vue-plyr/dist/vue-plyr.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(createPinia())

app.use(router)

app.mount('#app')

