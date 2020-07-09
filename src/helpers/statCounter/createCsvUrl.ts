import dayjs from 'dayjs'

export const URL = `https://gs.statcounter.com/chart.php?`

export const createCsvUrl = async (opts: StatCounter.URLOptions): Promise<string> => {
  const { query, device, regionHidden, regionUrl } = opts

  const date = {
    dateInt: dayjs()
      .subtract(4, 'month')
      .format('YYYYMM'),
    dateOut: dayjs()
      .subtract(2, 'month')
      .format('YYYYMM'),
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
    `&fromMonthYear=${date.dateInt}`,
    `&toMonthYear=${date.dateOut}`,
    `&csv=1`,
  )
}
