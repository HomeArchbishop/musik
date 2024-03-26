import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import runtime from './modules/runtime'
import storage from './modules/storage'

const vuexPersistedState = createPersistedState({
  key: 'musik:vuex-storage-state',
  paths: ['storage']
})

const store = createStore({
  modules: {
    runtime,
    storage
  },
  plugins: [vuexPersistedState]
})

export {
  store
}
