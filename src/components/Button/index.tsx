import React, {FC} from 'react'
import styled from 'styled-components/native'

import {theme} from '../../styles/theme'
import {BoxProps} from '../Box/interfaces'
import {ShadowView} from '../ShadowView'
import {Body1} from '../Text'

interface Props extends BoxProps {
  title: string
  onPress: () => void
}

export const Button: FC<Props> = ({onPress, title, ...args}) => {
  return (
    <Container {...args} onPress={onPress}>
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
