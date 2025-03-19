import '@/assets/index.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
