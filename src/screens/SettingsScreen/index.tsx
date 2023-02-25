import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {FC} from 'react'

import {Box, Button, ScreenBox, Text} from '../../components'
import {RootStackParamList, SCREENS} from '../../router/interfaces'

type ScreenType = FC<NativeStackScreenProps<RootStackParamList, SCREENS.SETTINGS>>

export const SettingsScreen: ScreenType = ({navigation}) => {
  return (
    <ScreenBox px={4}>
      <Text>SettingsScreen</Text>
      <Box width={50} height={50} bg="#228877" />
      <Button title="ok" onPress={() => navigation.goBack()} />
    </ScreenBox>
  )
}
