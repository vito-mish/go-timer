import {NavigationContainer, useNavigation} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types'
import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components/native'

import {Box, Images} from '../components'
import {theme} from '../styles/theme'
import {RootStackParamList, SCREENS, screens} from './interfaces'

const Stack = createNativeStackNavigator<RootStackParamList>()

const HeaderLeft: FC<HeaderBackButtonProps> = props => {
  const navigation = useNavigation()
  if (!props.canGoBack) return <Box />
  return (
    <HeaderLeftBox onPress={() => navigation.goBack()}>
      <Images.IconBack width={12} />
    </HeaderLeftBox>
  )
}

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
                headerLeft: HeaderLeft,
                headerTitleStyle: {
                  fontSize: 17,
                  fontWeight: '400',
                  color: theme.colors.gray[0],
                },
              }}
            />
          )
        })}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HeaderLeftBox = styled(Box)`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`
