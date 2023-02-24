import React from 'react'
import {ThemeProvider} from 'styled-components/native'

import {useAppInit} from './hooks'
import {Router} from './router'
import {theme} from './styles/theme'

const App = () => {
  const {isInit} = useAppInit()

  if (!isInit) {
    return null
  }

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default App
