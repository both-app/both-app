import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import fr from './locales/fr-FR.json'
import en from './locales/en-GB.json'

export const initI18n = () => {
  i18n.translations = {
    fr,
    en,
  }

  i18n.locale = Localization.locale
  i18n.fallbacks = true
}

export const useT = () => {
  return { t: i18n.t, locale: Localization.locale }
}
