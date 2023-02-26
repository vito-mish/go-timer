import {useEffect, useState} from 'react'

import {setupI18n} from '../../i18n'
import {storage, ttsService} from '../../services'

export const useAppInit = () => {
  const [isInit, setIsInit] = useState(false)
  const tts = ttsService.useInit()

  useEffect(() => {
    const initApp = async () => {
      try {
        // await storage.clearAll() // ! for debug
        await storage.initStorage()
        await setupI18n()
        tts.init()
        setIsInit(true)
      } catch (error) {
        // nothing
      }
    }
    initApp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {isInit}
}
