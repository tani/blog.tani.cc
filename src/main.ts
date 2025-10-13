// src/main.ts
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createHead } from '@unhead/vue/client'
import { routes } from 'vue-router/auto-routes'
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const head = createHead()
createApp(App).use(router).use(head).mount('#app')
