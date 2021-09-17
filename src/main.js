import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { SimpleRouter } from './router/router'
import './assets/css/main.css';

const app = createApp(SimpleRouter)

app.mount('#app')
