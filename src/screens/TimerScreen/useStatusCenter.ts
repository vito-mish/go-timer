import {useCallback, useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'

import {ENTITY, storage, StorageValueType, ttsService} from '../../services'

export const useStatusCenter = () => {
  const {t} = useTranslation()
  const [config, setConfig] = useState({
    basicSeconds: 1200,
    countdownSeconds: 30,
    countdownTimes: 3,
    // basicSeconds: 10, // ! for debug
    // countdownSeconds: 10, // ! for debug
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
  const [isStart, setIsStart] = useState(false)
  const [gameStatus, setGameStatus] = useState({isOver: false, isBlackWin: false})
  const timer = useRef<number | null>(null)
  const isFirstFireBlack = useRef(false)
  const isFirstFireWhite = useRef(false)

  const playTurnMeVoice = useCallback(
    (isBTurn: boolean) => {
      if (isBTurn && !isFirstFireBlack.current) {
        isFirstFireBlack.current = true
        ttsService.speak(t('tts_first_play_black'))
      } else if (!isBTurn && !isFirstFireWhite.current) {
        isFirstFireWhite.current = true
        ttsService.speak(t('tts_first_play_white'))
      } else if (isBTurn && hasEnteredCountdownBlack) {
        ttsService.speak(t('tts_countdown_info_black', {seconds: config.countdownSeconds, times: countdownTimesBlack}))
      } else if (!isBTurn && hasEnteredCountdownWhite) {
        ttsService.speak(t('tts_countdown_info_white', {seconds: config.countdownSeconds, times: countdownTimesWhite}))
      }
    },
    [
      config.countdownSeconds,
      countdownTimesBlack,
      countdownTimesWhite,
      hasEnteredCountdownBlack,
      hasEnteredCountdownWhite,
      t,
    ],
  )

  useEffect(() => {
    // ! Check if the game is over, if not, add seconds.
    if (secondsBlack === 0) {
      const nextTimes = countdownTimesBlack - 1
      if (nextTimes > 0) {
        setSecondsBlack(config.countdownSeconds)
        if (hasEnteredCountdownBlack) {
          setCountdownTimesBlack(nextTimes)
          nextTimes === 1 && ttsService.speak(t('tts_countdown_last_black'))
          ttsService.speak(t('tts_countdown_info_black', {seconds: config.countdownSeconds, times: nextTimes}))
        } else {
          setHasEnteredCountdownBlack(true)
          ttsService.speak(t('tts_countdown_start_black'))
          ttsService.speak(
            t('tts_countdown_info_black', {seconds: config.countdownSeconds, times: countdownTimesBlack}),
          )
        }
      } else {
        setGameStatus({isOver: true, isBlackWin: false})
        setIsPlaying(false)
        ttsService.speak(t('tts_game_over_black'))
      }
    } else if (secondsWhite === 0) {
      const nextTimes = countdownTimesWhite - 1
      if (nextTimes > 0) {
        setSecondsWhite(config.countdownSeconds)
        if (hasEnteredCountdownWhite) {
          setCountdownTimesWhite(nextTimes)
          nextTimes === 1 && ttsService.speak(t('tts_countdown_last_white'))
          ttsService.speak(t('tts_countdown_info_white', {seconds: config.countdownSeconds, times: nextTimes}))
        } else {
          setHasEnteredCountdownWhite(true)
          ttsService.speak(t('tts_countdown_start_white'))
          ttsService.speak(
            t('tts_countdown_info_white', {seconds: config.countdownSeconds, times: countdownTimesWhite}),
          )
        }
      } else {
        setGameStatus({isOver: true, isBlackWin: true})
        setIsPlaying(false)
        ttsService.speak(t('tts_game_over_white'))
      }
    }

    if (isBlackTurn && secondsBlack > 0 && secondsBlack <= 10 && countdownTimesBlack === 1) {
      ttsService.stop().then(() => {
        ttsService.speak(`${secondsBlack}`)
      })
    } else if (!isBlackTurn && secondsWhite > 0 && secondsWhite <= 10 && countdownTimesWhite === 1) {
      ttsService.stop().then(() => {
        ttsService.speak(`${secondsWhite}`)
      })
    }

    // ! for debug: test game over
    // setTimeout(() => {
    //   setGameStatus({isOver: true, isBlackWin: true})
    // }, 3000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsBlack, secondsWhite])

  useEffect(() => {
    const clear = () => {
      timer.current !== null && clearInterval(timer.current)
      timer.current = null
    }

    clear()
    if (isPlaying) {
      playTurnMeVoice(isBlackTurn)
      timer.current = setInterval(() => {
        if (isBlackTurn) {
          setSecondsBlack(prev => prev - 1)
        } else {
          setSecondsWhite(prev => prev - 1)
        }
      }, 1000)
    }

    return () => clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    isFirstFireBlack.current = false
    isFirstFireWhite.current = false
    setGameStatus({isOver: false, isBlackWin: false})
  }, [config])

  return {
    init,
    setIsPlaying,
    setIsBlackTurn,
    setIsStart,
    setSecondsBlack,
    setSecondsWhite,
    config,
    secondsBlack,
    secondsWhite,
    countdownTimesBlack,
    countdownTimesWhite,
    isPlaying,
    isBlackTurn,
    isStart,
    hasEnteredCountdownBlack,
    hasEnteredCountdownWhite,
    gameStatus,
  }
}
