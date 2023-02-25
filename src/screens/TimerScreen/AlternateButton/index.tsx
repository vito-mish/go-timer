import React, {FC} from 'react'
import styled from 'styled-components/native'

import {Body3, Box, Images, Text} from '../../../components'
import {theme} from '../../../styles/theme'
import dateUtil from '../../../utils/dateUtil'

const {colors, space} = theme
const BALL_SIZE = 32

interface Props {
  onPress: () => void
  isStart: boolean
  isBlackChess: boolean
  isBlackTurn: boolean
  isOver: boolean
  isWinner: boolean
  moveCount: number
  seconds: number
  countdownSeconds: number
  countdownTimes: number
}

export const AlternateButton: FC<Props> = ({
  onPress,
  isStart,
  isBlackChess,
  isBlackTurn,
  isOver,
  isWinner,
  moveCount,
  seconds,
  countdownSeconds,
  countdownTimes,
}) => {
  const isActive = !isOver && (isBlackChess === isBlackTurn || !isStart)
  return (
    <Container onPress={onPress} isBlackChess={isBlackChess} disabled={!isActive} activeOpacity={0.6}>
      <Box absoluteFilled>
        <InfoBox>
          <Body3 color="primary.2">{`${countdownSeconds}s[${countdownTimes}]`}</Body3>
          <Box absoluteFilled xalign="center" yalign="center">
            <Body3 color="gray.2">{moveCount}</Body3>
          </Box>
        </InfoBox>
        <Box flex={1} />
        <BallBox>
          <Ball isBlackChess={isBlackChess} />
        </BallBox>
      </Box>

      {isWinner && <Images.IconCrown width={48} />}
      <ClockText>{dateUtil.parseSecondsToMs(seconds)}</ClockText>
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
