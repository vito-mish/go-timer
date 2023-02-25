import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import React, {FC, useCallback} from 'react'
import styled from 'styled-components/native'

import {Box, Images} from '../../../components'
import {RootStackParamList, SCREENS} from '../../../router/interfaces'

const ICON_SIZE = 32

interface Props {
  onPressReload: () => void
  onPressTogglePlaying: () => void
  isOver: boolean
  isPlaying: boolean
}

export const ToolButtons: FC<Props> = ({onPressReload, onPressTogglePlaying, isOver, isPlaying}) => {
  const navigation: NativeStackNavigationProp<RootStackParamList, SCREENS.TIMER> = useNavigation()

  const handlePressSettings = useCallback(() => {
    navigation.navigate(SCREENS.SETTINGS)
  }, [navigation])

  return (
    <Container>
      <IconBox onPress={handlePressSettings}>
        <Images.IconSettings width={ICON_SIZE} />
      </IconBox>
      <IconBox onPress={onPressReload}>
        <Images.IconReload width={ICON_SIZE} />
      </IconBox>
      <IconBox onPress={onPressTogglePlaying} disabled={isOver}>
        {isPlaying ? <Images.IconPause width={ICON_SIZE} /> : <Images.IconPlay width={ICON_SIZE} />}
      </IconBox>
    </Container>
  )
}

const Container = styled(Box)`
  height: 72px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

const IconBox = styled(Box)`
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
`
