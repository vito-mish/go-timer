import styled from 'styled-components/native'

import {theme} from '../../styles/theme'
import {Box} from '../Box'

export const ShadowView = styled(Box)`
  shadow-color: ${theme.colors.gray[0]};
  shadow-opacity: 0.3;
  shadow-offset: 2px 4px;
  shadow-radius: 4px;
  elevation: 6;
`
