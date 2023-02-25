import React from 'react'
import {FlexStyle, TouchableOpacityProps, ViewProps} from 'react-native'

export interface TouchableProps extends TouchableOpacityProps {
  withoutFeedback?: boolean
  underlayColor?: string
  onPress: () => void
}

export interface BoxProps extends ViewProps, FlexStyle {
  row?: boolean
  wrap?: boolean
  absoluteFilled?: boolean
  disabled?: boolean
  xalign?: 'flex-start' | 'center' | 'flex-end'
  yalign?: 'flex-start' | 'center' | 'flex-end'
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch'
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'space-between' | 'space-evenly'
  mt?: number
  mb?: number
  mr?: number
  ml?: number
  px?: number
  py?: number
  pt?: number
  pb?: number
  pr?: number
  pl?: number
  borderRadius?: number
  children?: React.ReactNode
  onPress?: () => void
  width?: number | string
  height?: number | string
  bg?: string
  borderWidth?: number
  borderColor?: string
  flex?: number
  activeOpacity?: number
  overflow?: 'hidden'
}

export interface KeyboardDismissBoxProps extends BoxProps {
  isKeyboardShow: boolean
}
