import React, {FC} from 'react'
import styled from 'styled-components/native'

import {Body3, Box, Text} from '../../../components'
import {theme} from '../../../styles/theme'

const {colors, space} = theme
const BALL_SIZE = 32

interface Props {
  onPress: () => void
  isBlackChess: boolean
  isBlackTurn: boolean
  moveCount: number
}

export const AlternateButton: FC<Props> = ({onPress, isBlackChess, isBlackTurn, moveCount}) => {
  const isActive = isBlackChess === isBlackTurn
  return (
    <Container onPress={onPress} isBlackChess={isBlackChess} disabled={!isActive} activeOpacity={0.6}>
      <Box absoluteFilled>
        <InfoBox>
          <Body3 color="primary.2">30s[3]</Body3>
          <Box absoluteFilled xalign="center" yalign="center">
            <Body3 color="gray.2">{moveCount}</Body3>
          </Box>
        </InfoBox>
        <Box flex={1} />
        <BallBox>
          <Ball isBlackChess={isBlackChess} />
        </BallBox>
      </Box>
      <ClockText>20:00</ClockText>
    </Container>
  )
}

const Container = styled(Box)<{isBlackChess: boolean; disabled: boolean}>`
  flex: 1;
  border-width: 8px;
  border-radius: 2px;
  margin-horizontal: ${space[2]};
  justify-content: center;
  align-items: center;
  border-color: ${({disabled}) => (disabled ? colors.primary[1] : colors.primary[0])};
  transform: ${({isBlackChess}) => (isBlackChess ? 'rotate(180deg)' : 'rotate(0deg)')};
  margin-top: ${({isBlackChess}) => (isBlackChess ? space[2] : space[0])};
  margin-bottom: ${({isBlackChess}) => (isBlackChess ? space[0] : space[2])};
`

const ClockText = styled(Text)`
  font-size: 88px;
  font-weight: 400;
  line-height: 100px;
  letter-spacing: 4px;
  color: ${colors.gray[0]};
`

const InfoBox = styled(Box)`
  padding-left: ${space[4]};
  height: 48px;
  justify-content: center;
`

const BallBox = styled(Box)`
  flex-direction: row;
  justify-content: flex-end;
  padding-horizontal: ${space[3]};
  padding-vertical: ${space[3]};
`

const Ball = styled(Box)<{isBlackChess: boolean}>`
  width: ${`${BALL_SIZE}px`};
  height: ${`${BALL_SIZE}px`};
  border-radius: ${`${BALL_SIZE / 2}px`};
  border-width: 1px;
  border-color: ${({isBlackChess}) => (isBlackChess ? colors.gray[0] : colors.gray[3])};
  background-color: ${({isBlackChess}) => (isBlackChess ? colors.gray[0] : colors.gray[5])};
`
