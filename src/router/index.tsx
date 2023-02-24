import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {useTranslation} from 'react-i18next'

import {RootStackParamList, SCREENS, screens} from './interfaces'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Router = () => {
  const {t} = useTranslation()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.TIMER}>
        {screens.map(item => {
          return (
            <Stack.Screen
              key={item.name}
              name={item.name}
              component={item.component}
              options={{
                ...item.options,
                headerTitle: `${t(`${item.name}_title`)}`,
                headerTitleAlign: 'center',
              }}
            />
          )
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
