import React, {FC} from 'react'
import styled from 'styled-components/native'

import {theme} from '../../styles/theme'
import {Box} from '../Box'
import {Body1} from '../Text'

interface Props {
  title: string
  onPress: () => void
}

export const Button: FC<Props> = ({onPress, title}) => {
  return (
    <Container onPress={onPress}>
      <Body1 color="gray.5">{title}</Body1>
    </Container>
  )
}

const Container = styled(Box)`
  justify-content: center;
  align-items: center;
  align-self: stretch;
  height: 56;
  border-radius: 10;
  background-color: ${theme.colors.primary[0]};
  padding-horizontal: ${theme.space[4]};
`
