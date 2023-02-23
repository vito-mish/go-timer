import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import * as RNLocalize from 'react-native-localize'

import {logger, storage} from '../services'
import translationEN from './locales/en/translation'
import translationZH from './locales/zh/translation'

// ref: https://www.science.co.il/language/Codes.php
export enum LANGUAGE_CODES {
  ZH = 'zh',
  EN = 'en',
}

export const LANGUAGE_OPTIONS = [
  {key: LANGUAGE_CODES.ZH, name: '繁體中文'},
  {key: LANGUAGE_CODES.EN, name: 'English'},
]

const getDefaultLng = () => {
  const locales = RNLocalize.getLocales()
  logger.info('RNLocalize getLocales', locales)
  if (locales?.length > 0) {
    const languageCode = locales[0].languageCode
    const codes = Object.values(LANGUAGE_CODES)
    if (codes.includes(languageCode as LANGUAGE_CODES)) {
      return languageCode
    }
  }
  return LANGUAGE_CODES.EN
}

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      [LANGUAGE_CODES.ZH]: {translation: translationZH},
      [LANGUAGE_CODES.EN]: {translation: translationEN},
    },
    lng: getDefaultLng(),
    fallbackLng: LANGUAGE_CODES.EN,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })
}

export const setupI18n = async () => {
  const language = storage.getData(storage.ENTITY.LANGUAGE)
  logger.info('setupI18n language', language)
  if (language) {
    await i18n.changeLanguage(language)
  }
}

export const setLanguage = async (lng: string) => {
  logger.info('setLanguage lng', lng)
  await i18n.changeLanguage(lng)
  await storage.setData(storage.ENTITY.LANGUAGE, lng)
}

export const generateTKeys = (keyword: string): string[] => {
  return Object.keys(translationZH).filter(item => item.includes(keyword))
}
