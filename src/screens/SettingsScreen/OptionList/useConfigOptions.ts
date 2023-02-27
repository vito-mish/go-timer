import {useCallback, useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'

import {images} from '../../../assets'
import {config} from '../../../config/appConfig'
import {useActionSheet} from '../../../hooks'
import {LANGUAGE_OPTIONS, setLanguage} from '../../../i18n'
import {ENTITY, storage, TimerConfig} from '../../../services'

export const useConfigOptions = () => {
  const {t, i18n} = useTranslation()
  const {showActionSheet} = useActionSheet()
  const defaultConfig: TimerConfig = useMemo(() => {
    return storage.getData(ENTITY.TIMER_CONFIG) ?? {...config.defaultTimerConfig}
  }, [])
  const [basicMinutes, setBasicMinutes] = useState(defaultConfig.basicSeconds / 60)
  const [countdownSeconds, setCountdownSeconds] = useState(defaultConfig.countdownSeconds)
  const [countdownTimes, setCountdownTimes] = useState(defaultConfig.countdownTimes)

  useEffect(() => {
    storage.setData(ENTITY.TIMER_CONFIG, {
      basicSeconds: basicMinutes * 60,
      countdownSeconds,
      countdownTimes,
    })
  }, [basicMinutes, countdownSeconds, countdownTimes])

  const handlePressBasicMinutes = useCallback(() => {
    const options = config.optionsBasicMinutes.map(num => ({label: `${num}`, value: num}))
    showActionSheet({
      options,
      onSelected: value => setBasicMinutes(value),
    })
  }, [showActionSheet])

  const handlePressCountdownSeconds = useCallback(() => {
    const options = config.optionsCountdownSeconds.map(num => ({label: `${num}`, value: num}))
    showActionSheet({
      options,
      onSelected: value => setCountdownSeconds(value),
    })
  }, [showActionSheet])

  const handlePressCountdownTimes = useCallback(() => {
    const options = config.optionsCountdownTimes.map(num => ({label: `${num}`, value: num}))
    showActionSheet({
      options,
      onSelected: value => setCountdownTimes(value),
    })
  }, [showActionSheet])

  const handlePressLanguage = useCallback(() => {
    const options = LANGUAGE_OPTIONS.map(item => ({label: item.name, value: item.key}))
    showActionSheet({
      options,
      onSelected: value => setLanguage(value),
    })
  }, [showActionSheet])

  const data = useMemo(() => {
    return [
      {
        id: 'type_timer',
        title: t('settings_type_timer'),
        items: [
          {
            id: 'timer_basic_seconds',
            title: t('settings_option_basic_time'),
            value: basicMinutes,
            imageSrc: images.IconClock,
            onPress: handlePressBasicMinutes,
          },
          {
            id: 'timer_countdown_seconds',
            title: t('settings_option_countdown_seconds'),
            value: countdownSeconds,
            imageSrc: images.IconHourglass,
            onPress: handlePressCountdownSeconds,
          },
          {
            id: 'timer_countdown_times',
            title: t('settings_option_countdown_times'),
            value: countdownTimes,
            imageSrc: images.IconHeart,
            onPress: handlePressCountdownTimes,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    basicMinutes,
    countdownSeconds,
    countdownTimes,
    t,
    handlePressBasicMinutes,
    handlePressCountdownSeconds,
    handlePressCountdownTimes,
    handlePressLanguage,
  ])

  return {data}
}
