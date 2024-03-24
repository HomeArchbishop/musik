import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import { store } from './store'
import { icons } from './icons'

import './styles/root.less'
import './styles/global.less'

createApp(App)
  .use(router)
  .use(store)
  .use(icons)
  .mount('#app')
