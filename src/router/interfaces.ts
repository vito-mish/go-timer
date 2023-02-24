import {SettingsScreen} from '../screens/Settings'
import {TimerScreen} from '../screens/Timer'

export enum SCREENS {
  TIMER = 'timer',
  SETTINGS = 'settings',
}

// ref: https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
  [SCREENS.TIMER]: undefined
  [SCREENS.SETTINGS]: undefined
}

export const screens = [
  {name: SCREENS.TIMER, component: TimerScreen},
  {name: SCREENS.SETTINGS, component: SettingsScreen},
]
