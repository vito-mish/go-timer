/**
 * @format
 */

import {AppRegistry} from 'react-native'

import {name as appName} from './app.json'
import App from './src/App'
import {initI18n} from './src/i18n'

initI18n()
AppRegistry.registerComponent(appName, () => App)
