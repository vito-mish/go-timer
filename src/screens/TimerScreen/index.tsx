import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {FC, useCallback, useEffect, useState} from 'react'

import {SafeAreaScreenBox} from '../../components'
import {RootStackParamList, SCREENS} from '../../router/interfaces'
import {logger, ttsService} from '../../services'
import {AlternateButton} from './AlternateButton'
import {ToolButtons} from './ToolButtons'
import {useStatusCenter} from './useStatusCenter'

type ScreenType = FC<NativeStackScreenProps<RootStackParamList, SCREENS.TIMER>>

export const TimerScreen: ScreenType = ({navigation, route}) => {
  const {
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
  } = useStatusCenter()

  const [isReady, setIsReady] = useState(false)
  const [moveCount, setMoveCount] = useState(1)

  const resetStatus = useCallback(() => {
    logger.info('TimerScreen resetStatus')
    init()
    setMoveCount(1)
    setIsStart(false)
    setIsReady(true)
    ttsService.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init])

  useEffect(() => {
    resetStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (route.params?.message === 'action_reload') {
      navigation.setParams({message: undefined})
      resetStatus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.message])

  const handlePressSettings = useCallback(() => {
    navigation.navigate(SCREENS.SETTINGS)
    setIsPlaying(false)
    ttsService.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, resetStatus])

  const handleTogglePlayer = useCallback(() => {
    if (isStart) {
      setIsBlackTurn(prev => !prev)
      setMoveCount(prev => prev + 1)
    } else {
      setIsStart(true)
    }
    if (isBlackTurn && hasEnteredCountdownBlack) {
      setSecondsBlack(config.countdownSeconds)
    } else if (!isBlackTurn && hasEnteredCountdownWhite) {
      setSecondsWhite(config.countdownSeconds)
    }
    setIsPlaying(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.countdownSeconds, hasEnteredCountdownBlack, hasEnteredCountdownWhite, isBlackTurn, isStart])

  const handlePressTogglePlaying = useCallback(() => {
    !isStart && setIsStart(true)
    setIsPlaying(prev => {
      const nextState = !prev
      !nextState && ttsService.stop()
      return nextState
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart])

  if (!isReady) return null

  return (
    <SafeAreaScreenBox>
      <AlternateButton
        onPress={handleTogglePlayer}
        isStart={isStart}
        isBlackChess={true}
        isBlackTurn={isBlackTurn}
        isOver={gameStatus.isOver}
        isWinner={gameStatus.isOver && gameStatus.isBlackWin}
        moveCount={moveCount}
        seconds={secondsBlack}
        countdownSeconds={config.countdownSeconds}
        countdownTimes={countdownTimesBlack}
      />
      <ToolButtons
        onPressSettings={handlePressSettings}
        onPressReload={resetStatus}
        onPressTogglePlaying={handlePressTogglePlaying}
        isOver={gameStatus.isOver}
        isPlaying={isPlaying}
      />
      <AlternateButton
        onPress={handleTogglePlayer}
        isStart={isStart}
        isBlackChess={false}
        isBlackTurn={isBlackTurn}
        isOver={gameStatus.isOver}
        isWinner={gameStatus.isOver && !gameStatus.isBlackWin}
        moveCount={moveCount}
        seconds={secondsWhite}
        countdownSeconds={config.countdownSeconds}
        countdownTimes={countdownTimesWhite}
      />
    </SafeAreaScreenBox>
  )
}
