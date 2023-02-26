import React, {FC} from 'react'
import styled from 'styled-components/native'

import {Box, Images} from '../../../components'

const ICON_SIZE = 32

interface Props {
  onPressSettings: () => void
  onPressReload: () => void
  onPressTogglePlaying: () => void
  isOver: boolean
  isPlaying: boolean
}

export const ToolButtons: FC<Props> = ({onPressSettings, onPressReload, onPressTogglePlaying, isOver, isPlaying}) => {
  return (
    <Container>
      <IconBox onPress={onPressSettings}>
        <Images.IconSettings width={ICON_SIZE} />
      </IconBox>
      <IconBox onPress={onPressReload}>
        <Images.IconReload width={ICON_SIZE} />
      </IconBox>
      {!isOver && (
        <IconBox onPress={onPressTogglePlaying} disabled={isOver}>
          {isPlaying ? <Images.IconPause width={ICON_SIZE} /> : <Images.IconPlay width={ICON_SIZE} />}
        </IconBox>
      )}
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
