import React, {FC, useEffect, useState} from 'react'
import {Text as RNText} from 'react-native'
import styled from 'styled-components/native'
import {color, compose, flexbox, position, space, system, typography} from 'styled-system'

import {TextProps} from './interfaces'

const SText = styled(RNText)(
  compose(
    position,
    flexbox,
    space,
    color,
    typography,
    system({
      textDecorationLine: true,
    }),
  ),
)

export const Text: FC<TextProps> = ({size = 2, weight = 0, bold, align, selectable, onPress, ...rest}) => {
  let handlePress
  if (bold) {
    weight = 1
  }
  if (onPress) {
    handlePress = onPress
  }

  // Cannot select text in android, find the workaround can resolve this
  // ref: https://github.com/facebook/react-native/issues/20887#issuecomment-416775306
  const [isSelectable, setIsSelectable] = useState(false)
  useEffect(() => {
    if (!selectable) return
    const timer = setTimeout(() => setIsSelectable(true), 200)
    return () => clearTimeout(timer)
  })

  return (
    <SText
      fontWeight={weight}
      fontSize={size}
      lineHeight={size}
      color="gray.0"
      textAlign={align}
      textDecorationLine={onPress ? 'underline' : 'none'}
      maxFontSizeMultiplier={1.5}
      allowFontScaling={false}
      selectable={isSelectable}
      onPress={handlePress}
      {...rest}
    />
  )
}

export const LightText: FC<TextProps> = props => <Text color="gray.5" {...props} />
export const OneLineText: FC<TextProps> = props => <Text numberOfLines={1} {...props} />
export const ErrorText: FC<TextProps> = props => <Text size={2} color="error.0" {...props} />

// UI kit
export const Heading1: FC<TextProps> = props => <Text size={7} bold letterSpacing={1} {...props} />
export const Heading2: FC<TextProps> = props => <Text size={6} bold {...props} />
export const Body1: FC<TextProps> = props => <Text size={5} {...props} />
export const Body2: FC<TextProps> = props => <Text size={4} {...props} />

export const Body3: FC<TextProps> = props => <Text size={3} {...props} />
export const Body4: FC<TextProps> = props => <Text size={2} {...props} />
export const Body5: FC<TextProps> = props => <Text size={1} {...props} />
export const Body6: FC<TextProps> = props => <Text size={0} {...props} />
