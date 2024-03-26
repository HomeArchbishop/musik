import { createI18n } from 'vue-i18n'
import { store } from '../store'

import zhcn from './zh-cn'
import en from './en'

const i18n = createI18n({
  allowComposition: true,
  locale: store.state.storage.lang,
  fallbackLocale: 'en',
  messages: {
    en,
    'zh-cn': zhcn
  }
})

export {
  i18n
}
