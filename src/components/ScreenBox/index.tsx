import React, {FC} from 'react'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import {theme} from '../../styles/theme'
import {Box} from '../Box'
import {BoxProps} from '../Box/interfaces'

interface Props extends BoxProps {
  disableInset?: boolean
  children?: React.ReactNode
}

const useSafeBottom = (): number => {
  const inset = useSafeAreaInsets()
  return inset.bottom || 16 // for safe area bottom is 0
}

export const ScreenBox: FC<Props> = ({disableInset, children, ...args}) => {
  const safeBottom = useSafeBottom()
  return (
    <Container insetBottom={disableInset ? '0px' : `${safeBottom}px`} {...args}>
      {children}
    </Container>
  )
}

const Container = styled(Box)<{insetBottom: string}>`
  flex: 1;
  background-color: ${theme.colors.screen[0]};
  margin-bottom: ${({insetBottom}) => insetBottom};
`

export const SafeAreaScreenBox = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.screen[0]};
`
