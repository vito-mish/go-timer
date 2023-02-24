import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {FC} from 'react'
import {Button} from 'react-native'

import {ScreenBox, Text} from '../../components'
import {RootStackParamList, SCREENS} from '../../router/interfaces'

type ScreenType = FC<NativeStackScreenProps<RootStackParamList, SCREENS.TIMER>>
export const TimerScreen: ScreenType = ({navigation}) => {
  return (
    <ScreenBox>
      <Text>TimerScreen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate(SCREENS.SETTINGS)} />
    </ScreenBox>
  )
}
