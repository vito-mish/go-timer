import {useCallback, useEffect, useRef, useState} from 'react'

import {ENTITY, storage, StorageValueType} from '../../services'

export const useStatusCenter = () => {
  const [config, setConfig] = useState({
    basicSeconds: 1200,
    countdownSeconds: 30,
    countdownTimes: 3,
    // basicSeconds: 3, // ! for debug
    // countdownSeconds: 5, // ! for debug
    // countdownTimes: 2, // ! for debug
  })
  const [secondsBlack, setSecondsBlack] = useState(config.basicSeconds)
  const [secondsWhite, setSecondsWhite] = useState(config.basicSeconds)
  const [countdownTimesBlack, setCountdownTimesBlack] = useState(config.countdownTimes)
  const [countdownTimesWhite, setCountdownTimesWhite] = useState(config.countdownTimes)
  const [hasEnteredCountdownBlack, setHasEnteredCountdownBlack] = useState(false)
  const [hasEnteredCountdownWhite, setHasEnteredCountdownWhite] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBlackTurn, setIsBlackTurn] = useState(true)
  const [gameStatus, setGameStatus] = useState({isOver: false, isBlackWin: false})
  const timer = useRef<number | null>(null)

  useEffect(() => {
    // ! Check if the game is over, if not, add seconds.
    if (secondsBlack === 0) {
      const nextTimes = countdownTimesBlack - 1
      if (nextTimes > 0) {
        setSecondsBlack(config.countdownSeconds)
        if (hasEnteredCountdownBlack) {
          setCountdownTimesBlack(nextTimes)
        } else {
          setHasEnteredCountdownBlack(true)
        }
      } else {
        setGameStatus({isOver: true, isBlackWin: false})
        setIsPlaying(false)
      }
    } else if (secondsWhite === 0) {
      const nextTimes = countdownTimesWhite - 1
      if (nextTimes > 0) {
        setSecondsWhite(config.countdownSeconds)
        if (hasEnteredCountdownWhite) {
          setCountdownTimesWhite(nextTimes)
        } else {
          setHasEnteredCountdownWhite(true)
        }
      } else {
        setGameStatus({isOver: true, isBlackWin: true})
        setIsPlaying(false)
      }
    }

    // ! for debug: test game over
    // setTimeout(() => {
    //   setGameStatus({isOver: true, isBlackWin: true})
    // }, 3000)
  }, [
    secondsBlack,
    secondsWhite,
    countdownTimesBlack,
    countdownTimesWhite,
    config.countdownSeconds,
    hasEnteredCountdownBlack,
    hasEnteredCountdownWhite,
  ])

  useEffect(() => {
    const clear = () => {
      timer.current !== null && clearInterval(timer.current)
      timer.current = null
    }

    clear()
    if (isPlaying) {
      timer.current = setInterval(() => {
        if (isBlackTurn) {
          setSecondsBlack(prev => prev - 1)
        } else {
          setSecondsWhite(prev => prev - 1)
        }
      }, 1000)
    }

    return () => clear()
  }, [isBlackTurn, isPlaying])

  const init = useCallback(() => {
    const storageConfig: StorageValueType[ENTITY.TIMER_CONFIG] = storage.getData(ENTITY.TIMER_CONFIG)
    const _config = storageConfig ?? config
    const initSeconds = _config.basicSeconds || _config.countdownSeconds
    storageConfig && setConfig(_config)
    setSecondsBlack(initSeconds)
    setSecondsWhite(initSeconds)
    setCountdownTimesBlack(_config.countdownTimes)
    setCountdownTimesWhite(_config.countdownTimes)
    setHasEnteredCountdownBlack(!_config.basicSeconds)
    setHasEnteredCountdownWhite(!_config.basicSeconds)
    setIsPlaying(false)
    setIsBlackTurn(true)
    setGameStatus({isOver: false, isBlackWin: false})
  }, [config])

  return {
    init,
    setIsPlaying,
    setIsBlackTurn,
    config,
    secondsBlack,
    secondsWhite,
    countdownTimesBlack,
    countdownTimesWhite,
    isPlaying,
    isBlackTurn,
    gameStatus,
  }
}
