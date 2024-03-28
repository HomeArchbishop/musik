export default {
  namespaced: true,
  state: {
    isShowLyricsView: false,
    lyrics: {
      origin: [],
      pronunciation: [],
      translation: []
    }
  },
  mutations: {
    setLyricsView (state, { nextValue }) {
      state.isShowLyricsView = nextValue
    },
    setLyrics (state, { type, lyrics }) {
      if (type === 'origin' || type === 'pronunciation' || type === 'translation') {
        state.lyrics[type] = JSON.parse(JSON.stringify(lyrics))
      }
    }
  },
  actions: {}
}
