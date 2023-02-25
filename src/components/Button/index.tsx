import React, {FC} from 'react'
import styled from 'styled-components/native'

import {theme} from '../../styles/theme'
import {ShadowView} from '../ShadowView'
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

const Container = styled(ShadowView)`
  justify-content: center;
  align-items: center;
  align-self: stretch;
  height: 56px;
  border-radius: 10px;
  background-color: ${theme.colors.primary[0]};
  padding-horizontal: ${theme.space[4]};
`
