// FIXME: lazy load of routes may cause stuck in hot-dev

import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView, // () => import('@/views/HomeView.vue'),
    meta: {
      keepAlive: true,
      savePosition: true
    }
  }
]

export {
  routes
}
