import {useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'

import {images} from '../../../assets'
import {LANGUAGE_OPTIONS} from '../../../i18n'
import {defaultTimerConfig, ENTITY, storage, TimerConfig} from '../../../services'

export const useConfigOptions = () => {
  const {t, i18n} = useTranslation()
  const defaultConfig: TimerConfig = useMemo(() => {
    return storage.getData(ENTITY.TIMER_CONFIG) ?? {...defaultTimerConfig}
  }, [])
  const [basicSeconds, setBasicSeconds] = useState(defaultConfig.basicSeconds)
  const [countdownSeconds, setCountdownSeconds] = useState(defaultConfig.countdownSeconds)
  const [countdownTimes, setCountdownTimes] = useState(defaultConfig.countdownTimes)

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
            onPress: () => {},
          },
        ],
      },
    ]
    return list
  }, [basicSeconds, countdownSeconds, countdownTimes, i18n.language, t])

  return {data}
}
