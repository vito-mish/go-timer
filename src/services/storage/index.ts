import AsyncStorage from '@react-native-async-storage/async-storage'

import logger from '../logger'

const _prefix = 'go_timer_'
let _cached: {[key: string]: unknown} = {}

export enum ENTITY {
  LANGUAGE = 'language',
  TIMER_CONFIG = 'timer_config',
}

export interface TimerConfig {
  basicSeconds: number
  countdownSeconds: number
  countdownTimes: number
}

export type StorageValueType = {
  [ENTITY.LANGUAGE]: string | null
  [ENTITY.TIMER_CONFIG]: TimerConfig | null
}

const getData = (key: ENTITY): any => {
  return _cached[key]
}

const setData = async (key: ENTITY, value: unknown): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(`${_prefix}${key}`, JSON.stringify(value))
    _cached[key] = value
    return true
  } catch (err) {
    logger.error('storage setData error', err)
  }
  return false
}

const removeData = async (key: ENTITY): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(`${_prefix}${key}`)
    _cached[key] = undefined
    return true
  } catch (err) {
    logger.error('storage removeData error', err)
  }
  return false
}

const initStorage = async (): Promise<void> => {
  try {
    const keys = Object.values(ENTITY).map(k => `${_prefix}${k}`)
    const result = await AsyncStorage.multiGet(keys)
    _cached = result.reduce((obj, [storageKey, v]) => {
      let data = null
      try {
        data = JSON.parse(v || '')
      } catch (err) {
        data = null
      }
      return {
        ...obj,
        [storageKey.slice(_prefix.length)]: data,
      }
    }, {})
  } catch (err) {
    // nothing
  }
}

const clearAll = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear()
    _cached = {}
    return true
  } catch (err) {
    // nothing
  }
  return false
}

export const storage = {
  ENTITY,
  getData,
  setData,
  removeData,
  initStorage,
  clearAll,
}
