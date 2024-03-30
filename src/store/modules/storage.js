export default {
  namespaced: true,
  state: {
    theme: 'dark-theme',
    lang: 'zh-cn',
    player: {
      volume: 68,
      playtime: 0,
      totaltime: 0,
      currentPlayingIndex: -1,
      playlist: [/*
        {
          title: String,
          subtitle: String,
          id: String,
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
    },
    setLang (state, { nextLang }) {
      state.lang = nextLang
    },
    setPlaytime (state, { nextPlaytime }) {
      state.player.playtime = nextPlaytime
    },
    setVolume (state, { nextVolume }) {
      state.player.volume = nextVolume
    }
  }
}
