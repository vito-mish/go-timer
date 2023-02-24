import React, {FC} from 'react'
import styled from 'styled-components/native'

import {theme} from '../../styles/theme'
import {Box} from '../Box'
import {BoxProps} from '../Box/interfaces'

interface Props extends BoxProps {
  children?: React.ReactNode
}

export const ScreenBox: FC<Props> = ({children, ...args}) => {
  return <Container {...args}>{children}</Container>
}

const Container = styled(Box)`
  flex: 1;
  background-color: ${theme.colors.screen[0]};
`
