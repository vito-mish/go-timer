/* eslint-disable no-console */
import {isDebug} from '../../config/appConfig'
import dateUtil from '../../utils/dateUtil'

const info = (tag: string, ...rest: any[]) => {
  if (isDebug) {
    const dateStr = dateUtil.parseToYmd(new Date(), dateUtil.HMS_FORMAT.HMS)
    console.info(`${dateStr} [Logger.info][${tag}]`, ...rest)
  }
}

const error = (tag: string, ...rest: any[]) => {
  if (isDebug) {
    const dateStr = dateUtil.parseToYmd(new Date(), dateUtil.HMS_FORMAT.HMS)
    console.warn(`${dateStr} [Logger.error][${tag}]`, ...rest)
  }
}

export default {
  info,
  error,
}
