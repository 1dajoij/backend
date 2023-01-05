import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "@/router/index"
import "./style/reset.css"
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import App from './App.vue'

createApp(App).use(createPinia()).use(router).mount('#app')
