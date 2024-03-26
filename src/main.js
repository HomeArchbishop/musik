import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'
import { store } from './store'
import { icons } from './icons'
import { i18n } from './locale'

import './styles/root.less'
import './styles/global.less'

createApp(App)
  .use(router)
  .use(store)
  .use(icons)
  .use(i18n)
  .mount('#app')
