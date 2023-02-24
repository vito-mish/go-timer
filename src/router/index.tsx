import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'

import {RootStackParamList, SCREENS, screens} from './interfaces'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.TIMER}>
        {screens.map(item => {
          return <Stack.Screen key={item.name} name={item.name} component={item.component as any} />
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
