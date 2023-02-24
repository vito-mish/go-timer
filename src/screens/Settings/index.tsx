import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {FC} from 'react'

import {Box, ScreenBox, Text} from '../../components'
import {RootStackParamList, SCREENS} from '../../router/interfaces'

type ScreenType = FC<NativeStackScreenProps<RootStackParamList, SCREENS.SETTINGS>>
export const SettingsScreen: ScreenType = () => {
  return (
    <ScreenBox>
      <Text>SettingsScreen</Text>
      <Box width={50} height={50} bg="#228877" />
    </ScreenBox>
  )
}
