import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components/native'

import {Body3, Button, ScreenBox} from '../../components'
import {config} from '../../config/appConfig'
import {RootStackParamList, SCREENS} from '../../router/interfaces'
import {theme} from '../../styles/theme'
import {OptionList} from './OptionList'

type ScreenType = FC<NativeStackScreenProps<RootStackParamList, SCREENS.SETTINGS>>

export const SettingsScreen: ScreenType = ({navigation}) => {
  const {t} = useTranslation()

  const handleConfirm = useCallback(() => {
    navigation.navigate(SCREENS.TIMER, {message: 'action_reload'})
  }, [navigation])

  return (
    <ScreenBox>
      <OptionList />
      <AppText>{`v${config.appVersion}`}</AppText>
      <Button mx={4} title={t('common_confirm')} onPress={handleConfirm} />
    </ScreenBox>
  )
}

const AppText = styled(Body3)`
  text-align: center;
  color: ${theme.colors.gray[1]};
  margin-bottom: ${theme.space[3]};
`
