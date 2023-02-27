import Package from '../../package.json'

export const isDebug = __DEV__
export const config = {
  appVersion: Package.version,
  optionsBasicMinutes: [1, 5, 10, 15, 20, 30, 40, 50, 60],
  optionsCountdownSeconds: [10, 20, 30, 40, 50, 60],
  optionsCountdownTimes: [1, 2, 3, 5, 10],
  defaultTimerConfig: {
    basicSeconds: 1200,
    countdownSeconds: 30,
    countdownTimes: 3,
  },
}
