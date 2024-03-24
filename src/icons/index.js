import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const icons = {
  install (app) {
    app.component('f-icon', FontAwesomeIcon)
  }
}

export { icons }
