import {NativeStackNavigationOptions, NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'

import {SettingsScreen} from '../screens/SettingsScreen'
import {TimerScreen} from '../screens/TimerScreen'

export enum SCREENS {
  TIMER = 'timer',
  SETTINGS = 'settings',
}

// ref: https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
  [SCREENS.TIMER]: undefined
  [SCREENS.SETTINGS]: undefined
}

interface ScreenConfig {
  name: SCREENS
  component: React.FC<NativeStackScreenProps<RootStackParamList, any>>
  options?: NativeStackNavigationOptions
}

export const screens: ScreenConfig[] = [
  {name: SCREENS.TIMER, component: TimerScreen, options: {headerShown: false}},
  {name: SCREENS.SETTINGS, component: SettingsScreen},
]

// const navigation: NativeStackNavigationProp<RootStackParamList, SCREENS.TIMER> = useNavigation()
