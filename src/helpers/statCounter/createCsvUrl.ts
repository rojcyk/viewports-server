import dayjs from 'dayjs'

export const URL = `https://gs.statcounter.com/chart.php?`

export const createCsvUrl = async (opts: StatCounter.URLOptions): Promise<string> => {
  const { query, device, regionHidden, regionUrl } = opts

  // We are looking one month back.
  const date = {
    dateInt: dayjs()
      .subtract(2, 'month')
      .format('YYYYMM'),
    dateOut: dayjs()
      .subtract(1, 'month')
      .format('YYYYMM'),
    fromMonthToYear: dayjs()
      .subtract(2, 'month')
      .format('YYYY-MM'),
    toMonthYear: dayjs()
      .subtract(1, 'month')
      .format('YYYY-MM')
  }

  return URL.concat(
    `device=${device}`,
    `&device_hidden=${device}`,
    `&statType_hidden=${query.typeHidden}`,
    `&region_hidden=${regionHidden}`,
    `&granularity=monthly`,
    `&statType=${query.type}`,
    `&region=${regionUrl}`,
    `&fromInt=${date.dateInt}`,
    `&toInt=${date.dateInt}`,
    `&fromMonthYear=${date.fromMonthToYear}`,
    `&toMonthYear=${date.toMonthYear}`,
    `&csv=1`,
  )
}