import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mitt from 'mitt'

import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import GameView from './views/GameView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/game/:id', name: 'game', component: GameView, props: true },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const emitter = mitt()

let app = createApp(App)

// app.config.globalProperties.emitter = emitter
app.provide('emitter', emitter); 
app.use(router);
app.mount('#app');
