import {useEffect, useState} from 'react'

import {setupI18n} from '../../i18n'
import {storage} from '../../services'

export const useAppInit = () => {
  const [isInit, setIsInit] = useState(false)

  useEffect(() => {
    const initApp = async () => {
      try {
        // await storage.clearAll() // ! for debug
        await storage.initStorage()
        await setupI18n()
        setIsInit(true)
      } catch (error) {
        // nothing
      }
    }
    initApp()
  }, [])

  return {isInit}
}
