import * as Localization from 'expo-localization'
import I18n from 'i18n-js'

import fr from './locales/fr-FR.json'
import en from './locales/en-GB.json'

export const initI18n = () => {
  I18n.translations = {
    fr,
    en,
  }

  I18n.locale = Localization.locale
  I18n.fallbacks = true
  I18n.locales.no = 'en'
}

export const useT = () => {
  return { t: I18n.t, locale: Localization.locale }
}
