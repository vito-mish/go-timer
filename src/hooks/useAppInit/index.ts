import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import mobileAds, {AdapterStatus, InitializationState} from 'react-native-google-mobile-ads'

import {setupI18n} from '../../i18n'
import {logger, storage, ttsService} from '../../services'

export const useAppInit = () => {
  const {i18n} = useTranslation()
  const [isInit, setIsInit] = useState(false)
  const tts = ttsService.useInit()

  useEffect(() => {
    const initApp = async () => {
      try {
        // await storage.clearAll() // ! for debug
        await storage.initStorage()
        await setupI18n()
        const adapterStatuses: AdapterStatus[] = await mobileAds().initialize()
        logger.info('mobileAds init', adapterStatuses)
        if (adapterStatuses[0].state === InitializationState.AdapterInitializationStateReady) {
          logger.info('mobileAds is ready')
        }
        setIsInit(true)
      } catch (error) {
        logger.error('useAppInit error', error)
      }
    }
    initApp()
  }, [])

  useEffect(() => {
    if (isInit) {
      tts.init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInit, i18n.language])

  return {isInit}
}
