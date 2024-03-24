export default {
  namespaced: true,
  state: {
    theme: window.localStorage.getItem('musik-vuex-storage:theme') ?? 'dark-theme'
  },
  mutations: {},
  actions: {
    setTheme (state, { nextTheme }) {
      state.nextTheme = nextTheme
      window.localStorage.setItem('musik-vuex-storage:theme', nextTheme)
    }
  }
}
