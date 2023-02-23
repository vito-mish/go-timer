enum HMS_FORMAT {
  HMS = 'hh:mm:ss',
  HM = 'hh:mm',
  H = 'hh',
}

interface GetDateInfoResp {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

const isValidDate = (date: Date): boolean => date instanceof Date && !isNaN(date as any) // ref: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript

const parseMonth = (month: number): number => month + 1 // ex: 2020/10/21, getMonth() will return 9

const fixZero = (data: number): string => data.toString().padStart(2, '0')

const getDateInfo = (date: Date): GetDateInfoResp => {
  return {
    year: date.getFullYear(),
    month: parseMonth(date.getMonth()),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
}

type ParseToYmd = (date: Date, hms?: HMS_FORMAT) => string
const parseToYmd: ParseToYmd = (date, hms) => {
  if (!isValidDate(date)) return 'Invalid Date'
  const res = getDateInfo(date)
  const month = fixZero(res.month)
  const day = fixZero(res.day)
  const hour = fixZero(res.hour)
  const minute = fixZero(res.minute)
  const second = fixZero(res.second)
  if (hms) {
    switch (hms) {
      case HMS_FORMAT.HMS:
        return `${res.year}-${month}-${day} ${hour}:${minute}:${second}`
      case HMS_FORMAT.HM:
        return `${res.year}-${month}-${day} ${hour}:${minute}`
      case HMS_FORMAT.H:
        return `${res.year}-${month}-${day} ${hour}`
      default:
        break
    }
  }
  return `${res.year}-${month}-${day}`
}

export default {
  HMS_FORMAT,
  parseToYmd,
}
