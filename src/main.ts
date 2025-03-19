import '@/assets/index.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
