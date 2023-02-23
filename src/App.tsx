import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack'
import * as React from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'react-native'
import styled from 'styled-components/native'
import {ThemeProvider} from 'styled-components/native'

import {Body3, Body4, Box, ErrorText, Images, Text} from './components'
import {useAppInit} from './hooks'
import {theme} from './styles/theme'

enum SCREENS {
  TIMER = 'timer',
  SETTINGS = 'settings',
}

type RootStackParamList = {
  [SCREENS.TIMER]: undefined
  [SCREENS.SETTINGS]: undefined
  // Profile: {userId: string};
}

// type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

type Props = NativeStackScreenProps<RootStackParamList, SCREENS.TIMER>
const TimerScreen = ({navigation}: Props) => {
  const {t} = useTranslation()
  return (
    <CenterView>
      <Text>{t('settings_option_basic_time')}</Text>
      <ErrorText>error</ErrorText>
      <Body3>Body3</Body3>
      <Body4>Body4</Body4>
      <Images.IconSettings width={24} />
      <Images.IconReload width={24} />
      <Images.IconPlay width={24} />
      <Images.IconPause width={24} />
      <Button title="Go to Details" onPress={() => navigation.navigate(SCREENS.SETTINGS)} />
    </CenterView>
  )
}

const SettingsScreen = () => {
  return (
    <CenterView>
      <Text>Details Screen</Text>
      <Box width={50} height={50} bg="#228877" />
    </CenterView>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const {isInit} = useAppInit()

  if (!isInit) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={SCREENS.TIMER} component={TimerScreen} />
          <Stack.Screen name={SCREENS.SETTINGS} component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App

const CenterView = styled(Box)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
