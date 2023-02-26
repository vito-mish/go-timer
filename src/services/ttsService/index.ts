import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import Tts, {TtsEvent} from 'react-native-tts'

import {LANGUAGE_CODES} from '../../i18n'
import logger from '../logger'

let voiceId = ''

const useInit = () => {
  const {i18n} = useTranslation()

  const init = () => {
    logger.info('ttsService init')
    const lang: LANGUAGE_CODES = i18n.language as LANGUAGE_CODES
    let langCode = ''
    switch (lang) {
      case LANGUAGE_CODES.ZH:
        langCode = 'zh-TW'
        voiceId = 'com.apple.voice.compact.zh-TW.Meijia'
        break
      case LANGUAGE_CODES.EN:
      default:
        langCode = 'en-US'
        voiceId = 'com.apple.ttsbundle.Moira-compact'
        break
    }
    Tts.setDefaultLanguage(langCode)
    // Tts.setIgnoreSilentSwitch(true) // TODO: test
    // Tts.voices().then(voices => console.log(voices)) // ! for debug
  }

  useEffect(() => {
    // type Events = "tts-start" | "tts-finish" | "tts-error" | "tts-cancel" | "tts-progress";
    const handleStart = (event: TtsEvent) => {
      logger.info('tts-start', event)
    }
    const handleProgress = (event: TtsEvent) => {
      logger.info('tts-progress', event)
    }

    Tts.addEventListener('tts-start', handleStart)
    Tts.addEventListener('tts-progress', handleProgress)
    return () => {
      Tts.removeEventListener('tts-start', handleStart)
      Tts.removeEventListener('tts-progress', handleProgress)
    }
  }, [])

  return {init}
}

const stop = async () => {
  try {
    const resp = await Tts.stop()
    return resp
  } catch (error) {
    logger.error('ttsService error', error)
  }
  return false
}

const speak = async (text: string) => {
  Tts.speak(text, {
    iosVoiceId: voiceId,
    rate: 0.5,
    androidParams: {
      KEY_PARAM_PAN: -1,
      KEY_PARAM_VOLUME: 1,
      KEY_PARAM_STREAM: 'STREAM_MUSIC',
    },
  })
}

export const ttsService = {
  useInit,
  speak,
  stop,
}

/*

! Tts.voices().then(resp => console.log(resp))

const voices = [
  {
    id: 'zh-TW-SMTf00',
    language: 'zh-TW',
    latency: 300,
    name: 'zh-TW-SMTf00',
    networkConnectionRequired: false,
    notInstalled: false,
    quality: 300,
  },
  {
    id: 'zh-CN-SMTf00',
    language: 'zh-CN',
    latency: 300,
    name: 'zh-CN-SMTf00',
    networkConnectionRequired: false,
    notInstalled: false,
    quality: 300,
  },
  {
    id: 'en-US-SMTf00',
    language: 'en-US',
    latency: 300,
    name: 'en-US-SMTf00',
    networkConnectionRequired: false,
    notInstalled: false,
    quality: 300,
  },
]

*/
