import {TextProps as RNTextProps} from 'react-native'
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system'

interface StyledProps
  extends PositionProps,
    LayoutProps,
    FlexboxProps,
    SpaceProps,
    ColorProps,
    BorderProps,
    TypographyProps {}

export interface TextProps extends RNTextProps, StyledProps {
  size?: number
  weight?: number
  bold?: boolean
  align?: 'left' | 'center' | 'right'
  selectable?: boolean
  textDecorationLine?: string
  onPress?: () => void
}
