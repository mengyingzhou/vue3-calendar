import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'vant/lib/index.css'
import './styles/vant-theme.css'
import router from "@/router"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import RouterViewKeepAlive from "router-view-keep-alive";
import kt from 'kitty-ui'
import Vant from 'vant'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.use(router)
    .use(pinia)
    .use(kt)
    .use(RouterViewKeepAlive)
    .use(Vant)
    .mount('#app')
