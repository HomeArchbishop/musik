export default {
  namespaced: true,
  state: {
    isShowLyricsView: false,
    lyrics: [/*
      {
        from: '',
        origin: [],
        pronunciation: [],
        translation: []
      }
    */]
  },
  mutations: {
    setLyricsView (state, { nextValue }) {
      state.isShowLyricsView = nextValue
    },
    setLyrics (state, { lyrics }) {
      state.lyrics = JSON.parse(JSON.stringify(lyrics))
    }
  },
  actions: {}
}
