import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import store from './utils/store'

i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}.json`
    },
    react: {
      useSuspense: true
    },
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    interpolation: { escapeValue: false }
  })

// setting to english by default
// i18nextLng is default create
const language = store.get('i18nextLng') || 'en'
i18next.changeLanguage(language).then(res=> {
  console.log('changeLanguage then: ', res)
}).catch(err=> {
  console.error('changeLanguage catch: ', err)
})

export default i18next
