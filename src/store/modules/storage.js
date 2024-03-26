export default {
  namespaced: true,
  state: {
    theme: 'dark-theme',
    lang: 'zh-cn',
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
  mutations: {
    setTheme (state, { nextTheme }) {
      state.theme = nextTheme
    }
  }
}
