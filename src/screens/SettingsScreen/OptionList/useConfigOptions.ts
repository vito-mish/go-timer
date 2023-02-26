import {useActionSheet} from '@expo/react-native-action-sheet'
import {useCallback, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'

import {images} from '../../../assets'
import {LANGUAGE_CODES, LANGUAGE_OPTIONS, setLanguage} from '../../../i18n'
import {defaultTimerConfig, ENTITY, storage, TimerConfig} from '../../../services'
import {theme} from '../../../styles/theme'

export const useConfigOptions = () => {
  const {t, i18n} = useTranslation()
  const {showActionSheetWithOptions} = useActionSheet()
  const defaultConfig: TimerConfig = useMemo(() => {
    return storage.getData(ENTITY.TIMER_CONFIG) ?? {...defaultTimerConfig}
  }, [])
  const [basicSeconds, setBasicSeconds] = useState(defaultConfig.basicSeconds)
  const [countdownSeconds, setCountdownSeconds] = useState(defaultConfig.countdownSeconds)
  const [countdownTimes, setCountdownTimes] = useState(defaultConfig.countdownTimes)

  const handlePressLanguage = useCallback(() => {
    const langNames = LANGUAGE_OPTIONS.map(item => item.name)
    const zh = langNames[0]
    const en = langNames[1]
    const options = [zh, en, t('common_cancel')]

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
        cancelButtonTintColor: theme.colors.error[0],
      },
      (selectedIndex?: number): void => {
        switch (selectedIndex) {
          case 0:
            setLanguage(LANGUAGE_CODES.ZH)
            break
          case 1:
            setLanguage(LANGUAGE_CODES.EN)
            break
          default:
            break
        }
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const data = useMemo(() => {
    const list = [
      {
        id: 'type_timer',
        title: t('settings_type_timer'),
        items: [
          {
            id: 'timer_basic_seconds',
            title: t('settings_option_basic_time'),
            value: basicSeconds,
            imageSrc: images.IconClock,
            onPress: () => {},
          },
          {
            id: 'timer_countdown_seconds',
            title: t('settings_option_countdown_seconds'),
            value: countdownSeconds,
            imageSrc: images.IconHourglass,
            onPress: () => {},
          },
          {
            id: 'timer_countdown_times',
            title: t('settings_option_countdown_times'),
            value: countdownTimes,
            imageSrc: images.IconHeart,
            onPress: () => {},
          },
        ],
      },
      {
        id: 'type_other',
        title: t('settings_type_other'),
        items: [
          {
            id: 'other_language',
            title: t('settings_option_language'),
            value: LANGUAGE_OPTIONS.find(item => i18n.language === item.key)?.name ?? '--',
            imageSrc: images.IconEarth,
            onPress: handlePressLanguage,
          },
        ],
      },
    ]
    return list
  }, [basicSeconds, countdownSeconds, countdownTimes, i18n.language, t, handlePressLanguage])

  return {data}
}
