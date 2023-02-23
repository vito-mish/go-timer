import React, {FC, useEffect, useState} from 'react'
import {Image as RNImage, ImageProps as RNImageProps, ImageSourcePropType, LayoutChangeEvent} from 'react-native'
import styled from 'styled-components/native'

import {images} from '../../assets'
import {Box} from '../Box'
import {BoxProps} from '../Box/interfaces'

const TOUCHABLE_SIZE = 44

export interface ImageProps extends BoxProps {
  file?: number
  uri?: string | null
  width?: number
  height?: number
  fallbackSource?: ImageSourcePropType
  resizeMode?: RNImageProps['resizeMode']
  onPress?: () => void
}

const SImage = styled(RNImage)`
  width: 100%;
  height: 100%;
`

const adjustSize = (currentW: number, currentH: number, targetW?: number, targetH?: number): {w: number; h: number} => {
  let w = targetW || currentW
  let h = targetH || currentH
  if (targetW && !targetH) {
    h = currentH * (targetW / currentW)
  } else if (!targetW && targetH) {
    w = currentW * (targetH / currentH)
  }
  return {w, h}
}

export const Image: FC<ImageProps> = ({
  width: targetW = 0,
  height: targetH = 0,
  file,
  uri,
  fallbackSource,
  resizeMode,
  onPress,
  ...rest
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [size, setSize] = useState({w: targetW, h: targetH})
  const [source, setSource] = useState(file || (uri && {uri}) || fallbackSource)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    const nextSource = file || (uri && {uri}) || fallbackSource
    if (source !== nextSource) {
      setSource(nextSource)
    }

    if (uri) {
      RNImage.getSize(
        uri,
        (_w, _h) => {
          const {w, h} = adjustSize(_w, _h, targetW, targetH)
          isMounted && setSize({w, h})
        },
        () => {
          isMounted && setSize({w: targetW || 0, h: targetH || 0})
        },
      )
    } else if (file) {
      const {width: _w, height: _h} = RNImage.resolveAssetSource(file) || {}
      const {w, h} = adjustSize(_w, _h, targetW, targetH)
      setSize({w, h})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetW, targetH, file, uri])

  const increaseTouchHorizontal = size.w < TOUCHABLE_SIZE ? (TOUCHABLE_SIZE - size.w) / 2 : 0
  const increaseTouchVertical = size.h < TOUCHABLE_SIZE ? (TOUCHABLE_SIZE - size.h) / 2 : 0

  return (
    <Box
      width={size.w}
      height={size.h}
      hitSlop={{
        top: increaseTouchVertical,
        bottom: increaseTouchVertical,
        left: increaseTouchHorizontal,
        right: increaseTouchHorizontal,
      }}
      onPress={onPress}
      {...rest}>
      {source && (
        <SImage
          source={source}
          resizeMode={resizeMode}
          onError={() => {
            if (fallbackSource && fallbackSource !== source) {
              setSource(fallbackSource)
            }
          }}
        />
      )}
    </Box>
  )
}

export const StretchImage: FC<ImageProps> = props => {
  const [imageSize, setImageSize] = useState({width: 0, height: 0})

  const handleBoxLayout = (event: LayoutChangeEvent): void => {
    const {layout} = event.nativeEvent
    setImageSize({width: layout.width, height: layout.height})
  }

  const canShow = !!(imageSize.width && imageSize.height)
  return (
    <Box flex={1} onLayout={handleBoxLayout}>
      {canShow && <Image {...props} width={imageSize.width} height={imageSize.height} />}
    </Box>
  )
}

type ImageKeys = keyof typeof images
type LocalImageRecord = Record<ImageKeys, FC<ImageProps>>
export const Images: LocalImageRecord = {} as LocalImageRecord

Object.keys(images).forEach(_filename => {
  const filename = _filename as ImageKeys
  const LocalImage: FC<ImageProps> = props => <Image file={images[filename]} {...props} />
  Images[filename] = LocalImage
})
