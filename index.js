/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native'

import {name as appName} from './app.json'
import App from './src/App'
import {initI18n} from './src/i18n'

initI18n()

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state', // ref: https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
])

AppRegistry.registerComponent(appName, () => App)
