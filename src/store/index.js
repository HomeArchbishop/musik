import { createStore } from 'vuex'

import runtime from './modules/runtime'
import storage from './modules/storage'

const store = createStore({
  modules: {
    runtime,
    storage
  }
})

export {
  store
}
