import React, {FC} from 'react'
import styled from 'styled-components/native'

import {theme} from '../../styles/theme'
import {Box} from '../Box'

interface Props {
  children?: React.ReactNode
}

export const ScreenBox: FC<Props> = ({children}) => {
  return <Container>{children}</Container>
}

const Container = styled(Box)`
  flex: 1;
  background-color: ${theme.colors.screen[0]};
`
