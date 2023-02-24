import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {FC} from 'react'

import {Button, ScreenBox, Text} from '../../components'
import {RootStackParamList, SCREENS} from '../../router/interfaces'

type ScreenType = FC<NativeStackScreenProps<RootStackParamList, SCREENS.TIMER>>
export const TimerScreen: ScreenType = ({navigation}) => {
  return (
    <ScreenBox px={4}>
      <Text>TimerScreen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate(SCREENS.SETTINGS)} />
    </ScreenBox>
  )
}
