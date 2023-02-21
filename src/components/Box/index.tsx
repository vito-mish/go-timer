import React, {forwardRef, ForwardRefRenderFunction} from 'react'
import {TouchableOpacity as RNTouchable, View as RNView} from 'react-native'
import styled from 'styled-components/native'
import {border, color, compose, flexbox, layout, position, space, system} from 'styled-system'

import {BoxProps} from './interfaces'
import Touchable from './Touchable'

const NonInteractiveView = styled(RNView)(
  compose(position, layout, flexbox, space, color, border),
  system({
    borderRadius: true,
  }),
)
const InteractiveView = styled(Touchable)(
  compose(position, layout, flexbox, space, color, border),
  system({
    borderRadius: true,
  }),
)

const _Box: ForwardRefRenderFunction<RNView | RNTouchable, BoxProps> = (
  {row, wrap, absoluteFilled, xalign, yalign, onPress, ...rest},
  ref,
) => {
  const attrs = {
    flexDirection: row ? 'row' : 'column',
    justifyContent: row ? xalign : yalign,
    alignItems: row ? yalign : xalign,
    flexWrap: wrap ? 'wrap' : 'nowrap',

    // for absolute Filled
    position: absoluteFilled ? 'absolute' : undefined,
    top: absoluteFilled ? 0 : undefined,
    bottom: absoluteFilled ? 0 : undefined,
    left: absoluteFilled ? 0 : undefined,
    right: absoluteFilled ? 0 : undefined,
  }

  if (onPress) {
    return <InteractiveView {...attrs} {...rest} ref={ref as React.Ref<RNTouchable>} onPress={onPress} />
  }
  return <NonInteractiveView {...attrs} {...rest} ref={ref} />
}

export const Box = forwardRef(_Box)
