import {Platform} from 'react-native'
import {TestIds} from 'react-native-google-mobile-ads'

import Package from '../../package.json'

const INTERSTITIAL_ID =
  Platform.OS === 'android' ? 'ca-app-pub-1623587656477694/2102896451' : 'ca-app-pub-1623587656477694/8041086017'

export const isDebug = __DEV__
export const config = {
  appVersion: Package.version,
  adUnitIdActionReload: isDebug ? TestIds.INTERSTITIAL : INTERSTITIAL_ID,
  optionsBasicMinutes: [1, 5, 10, 15, 20, 30, 40, 50, 60],
  optionsCountdownSeconds: [10, 20, 30, 40, 50, 60],
  optionsCountdownTimes: [1, 2, 3, 5, 10],
  defaultTimerConfig: {
    basicSeconds: 1200,
    countdownSeconds: 30,
    countdownTimes: 3,
  },
}
