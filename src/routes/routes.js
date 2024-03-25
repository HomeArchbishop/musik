const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      keepAlive: true,
      savePosition: true
    }
  },
  {
    path: '/playlist/:playlistID',
    name: 'PlaylistView',
    component: () => import('@/views/PlaylistView.vue'),
    props: true,
    meta: {
      keepAlive: true
    }
  }
]

export {
  routes
}
