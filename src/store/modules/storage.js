export default {
  namespaced: true,
  state: {
    theme: 'dark-theme',
    lang: 'zh-cn',
    player: {
      volume: 68,
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
    setVolume (state, { nextVolume }) {
      state.player.volume = nextVolume
    },
    updateCurrentPlayingIndex (state, { nextIndex }) {
      state.player.currentPlayingIndex = nextIndex
    },
    updatePlayerPlaylist (state, { type, pos, media }) {
      const mediaToBe = JSON.parse(JSON.stringify(media))
      if (type === 'push') {
        state.player.playlist.push(mediaToBe)
      } else if (type === 'pop') {
        state.player.playlist.pop()
      } else if (type === 'shift') {
        state.player.playlist.shift()
      } else if (type === 'unshift') {
        state.player.playlist.unshift(mediaToBe)
      } else {
        state.player.playlist.splice(pos, 0, mediaToBe)
      }
    }
  }
}
