import React, {FC} from 'react'
import styled from 'styled-components/native'

import {Body2, Body3, Box, Image} from '../../../components'
import {theme} from '../../../styles/theme'
import {useConfigOptions} from './useConfigOptions'

export const OptionList: FC = () => {
  const {data} = useConfigOptions()
  return (
    <Box flex={1}>
      {data.map(object => {
        return (
          <Box key={object.id} px={6}>
            <HeaderText>{object.title}</HeaderText>
            <ItemsContainer>
              {object.items.map((item, index) => {
                return (
                  <ItemBox key={item.id} showBorder={index !== 0} onPress={item.onPress} activeOpacity={0.5}>
                    <Box row>
                      <Image file={item.imageSrc} width={24} />
                      <Title>{item.title}</Title>
                    </Box>
                    <ValueText>{item.value}</ValueText>
                  </ItemBox>
                )
              })}
            </ItemsContainer>
          </Box>
        )
      })}
    </Box>
  )
}

const HeaderText = styled(Body2).attrs({bold: true})`
  color: ${theme.colors.primary[0]};
  margin-vertical: ${theme.space[4]};
  margin-left: ${theme.space[2]};
`

const ItemsContainer = styled(Box)`
  background-color: ${theme.colors.gray[5]};
  border-radius: 12px;
`

const ItemBox = styled(Box)<{showBorder: boolean}>`
  min-height: 56px;
  border-top-width: ${({showBorder}) => (showBorder ? '2px' : '0px')};
  border-color: ${theme.colors.screen[0]};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${theme.space[4]};
`

const Title = styled(Body3)`
  color: ${theme.colors.gray[0]};
  margin-left: ${theme.space[3]};
`

const ValueText = styled(Body3)`
  color: ${theme.colors.gray[3]};
`
