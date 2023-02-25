import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {FC, useCallback, useEffect, useState} from 'react'

import {ScreenBox} from '../../components'
import {RootStackParamList, SCREENS} from '../../router/interfaces'
import {AlternateButton} from './AlternateButton'
import {ToolButtons} from './ToolButtons'
import {useStatusCenter} from './useStatusCenter'

type ScreenType = FC<NativeStackScreenProps<RootStackParamList, SCREENS.TIMER>>

export const TimerScreen: ScreenType = () => {
  const {
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
  } = useStatusCenter()

  const [isReady, setIsReady] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [moveCount, setMoveCount] = useState(1)

  const resetStatus = useCallback(() => {
    init()
    setMoveCount(1)
    setIsStart(false)
    setIsReady(true)
  }, [init])

  useEffect(() => {
    resetStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTogglePlayer = useCallback(() => {
    if (isStart) {
      setIsBlackTurn(prev => !prev)
      setMoveCount(prev => prev + 1)
    } else {
      setIsStart(true)
    }
    setIsPlaying(true)
  }, [isStart, setIsBlackTurn, setIsPlaying])

  const handlePressTogglePlaying = useCallback(() => {
    !isStart && setIsStart(true)
    setIsPlaying(prev => !prev)
  }, [isStart, setIsPlaying])

  if (!isReady) return null

  return (
    <ScreenBox>
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
    </ScreenBox>
  )
}
