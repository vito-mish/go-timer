import Package from '../../package.json'

export const isDebug = __DEV__
export const config = {
  appVersion: Package.version,
}
