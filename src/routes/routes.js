const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      keepAlive: true,
      savePosition: true
    }
  }
]

export {
  routes
}
