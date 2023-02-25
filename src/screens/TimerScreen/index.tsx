import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {FC, useCallback, useState} from 'react'

import {ScreenBox} from '../../components'
import {RootStackParamList, SCREENS} from '../../router/interfaces'
import {AlternateButton} from './AlternateButton'
import {ToolButtons} from './ToolButtons'

type ScreenType = FC<NativeStackScreenProps<RootStackParamList, SCREENS.TIMER>>

export const TimerScreen: ScreenType = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBlackTurn, setIsBlackTurn] = useState(true)
  const [moveCount, setMoveCount] = useState(1)

  const handleReset = useCallback(() => {
    setIsPlaying(false)
    setIsBlackTurn(true)
    setMoveCount(1)
  }, [])

  const handleTogglePlayer = useCallback(() => {
    setIsBlackTurn(prev => !prev)
    setMoveCount(prev => prev + 1)
    setIsPlaying(true)
  }, [])

  const handlePressTogglePlaying = useCallback(() => setIsPlaying(prev => !prev), [])

  return (
    <ScreenBox>
      <AlternateButton
        onPress={handleTogglePlayer}
        isBlackChess={true}
        isBlackTurn={isBlackTurn}
        moveCount={moveCount}
      />
      <ToolButtons onPressReload={handleReset} onPressTogglePlaying={handlePressTogglePlaying} isPlaying={isPlaying} />
      <AlternateButton
        onPress={handleTogglePlayer}
        isBlackChess={false}
        isBlackTurn={isBlackTurn}
        moveCount={moveCount}
      />
    </ScreenBox>
  )
}
