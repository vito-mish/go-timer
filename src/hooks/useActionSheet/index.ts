import {useActionSheet as useRNActionSheet} from '@expo/react-native-action-sheet'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'

import {theme} from '../../styles/theme'

interface Option<T> {
  label: string
  value: T
}

interface ParamsShowActionSheet<T> {
  options: Option<T>[]
  onCancel?: () => void
  onSelected?: (value: T, index: number) => void
}

export const useActionSheet = () => {
  const {t} = useTranslation()
  const {showActionSheetWithOptions} = useRNActionSheet()

  const showActionSheet = useCallback(
    <T>({options, onCancel, onSelected}: ParamsShowActionSheet<T>) => {
      const data = [...options.map(item => item.label), t('common_cancel')]
      const cancelIndex = options.length
      showActionSheetWithOptions(
        {
          options: data,
          cancelButtonIndex: cancelIndex,
          cancelButtonTintColor: theme.colors.error[0],
        },
        (index?: number): void => {
          if (index === undefined || index === cancelIndex) {
            onCancel && onCancel()
            return
          }
          onSelected && onSelected(options[index].value, index)
        },
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  )

  return {showActionSheet}
}
