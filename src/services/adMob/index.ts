import {useCallback, useEffect, useRef} from 'react'
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads'

import {config} from '../../config/appConfig'
import logger from '../logger'

export const useAdMob = () => {
  const adInstance = useRef<InterstitialAd | null>(null)
  const isAdReady = useRef(false)

  useEffect(() => {
    adInstance.current = InterstitialAd.createForAdRequest(config.adUnitIdActionReload)
    const unsubscribeLoaded = adInstance.current.addAdEventListener(AdEventType.LOADED, () => {
      logger.info('AdEvent LOADED')
      isAdReady.current = true
    })
    const unsubscribeClosed = adInstance.current.addAdEventListener(AdEventType.CLOSED, () => {
      logger.info('AdEvent CLOSED')
      adInstance.current?.load()
    })
    adInstance.current?.load()
    return () => {
      unsubscribeLoaded()
      unsubscribeClosed()
    }
  }, [])

  const showAd = useCallback(() => {
    if (!isAdReady.current) {
      logger.info('show ad failed, is not ready')
      return
    }
    isAdReady.current = false
    adInstance.current?.show()
  }, [])

  return {showAd}
}
