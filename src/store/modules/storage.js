export default {
  namespaced: true,
  state: {
    theme: window.localStorage.getItem('musik-vuex-storage:theme') ?? 'dark-theme',
    player: {
      playtime: 0,
      totaltime: 0,
      currentPlayingIndex: -1,
      playlist: [/*
        {
          title: String,
          subtitle: String,
          album: {
            id: String,
            title: String,
            coverImg: String
          },
          artists: [{
            name: String,
            id: String
          }]
        }
    */]
    }
  },
  mutations: {},
  actions: {
    setTheme (state, { nextTheme }) {
      state.nextTheme = nextTheme
      window.localStorage.setItem('musik-vuex-storage:theme', nextTheme)
    }
  }
}
