import {ActionSheetProvider} from '@expo/react-native-action-sheet'
import React, {useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen'
import {ThemeProvider} from 'styled-components/native'

import {useAppInit} from './hooks'
import {Router} from './router'
import {theme} from './styles/theme'

const App = () => {
  const {isInit} = useAppInit()

  useEffect(() => {
    isInit && SplashScreen.hide()
  }, [isInit])

  if (!isInit) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <ActionSheetProvider>
        <Router />
      </ActionSheetProvider>
    </ThemeProvider>
  )
}

export default App
