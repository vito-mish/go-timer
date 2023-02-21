import React, {forwardRef, ForwardRefRenderFunction} from 'react'
import {TouchableHighlight, TouchableOpacity} from 'react-native'

import {TouchableProps} from './interfaces'

const Touchable: ForwardRefRenderFunction<TouchableOpacity, TouchableProps> = (
  {withoutFeedback, underlayColor, onPress, ...rest},
  ref,
) => {
  const props = {
    ref,
    activeOpacity: withoutFeedback ? 1 : 0.2,
    onPress,
    ...rest,
  }

  if (underlayColor) {
    return <TouchableHighlight {...props} underlayColor={underlayColor} />
  }

  return <TouchableOpacity {...props} />
}

export default forwardRef(Touchable)
