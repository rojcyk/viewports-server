import axios, { AxiosResponse } from 'axios'

////////////////////////////////////
// Local imports
////////////////////////////////////

import { createCsvUrl } from './createCsvUrl'
import Region from '@models/Region'

////////////////////////////////////
// DOWNLOADING LOGIC
////////////////////////////////////

export const QUERIES: {
  [key: string]: StatCounter.Query
} = {
  displayResolution: {
    typeHidden: 'resolution',
    type: 'Screen%20Resolution',
  },
  os: {
    typeHidden: 'os_combined',
    type: 'Operating%20System',
  },
}

// Download from page
/////////////////////

const downloadDataFromPage = async (URL: string): Promise<string> => {
  return axios.get(URL).then(
    async (html: AxiosResponse): Promise<string> => {
      return html.data
    },
  )
}

// Download from platform
/////////////////////////

export const downloadDataForRegion = async (
  platform: StatCounter.PlatformCode,
  region: Region,
): Promise<string> => {
  const URL = await createCsvUrl({
    device: platform,
    regionHidden: region.code as StatCounter.RegionCode,
    query: QUERIES.displayResolution,
    regionUrl: region.url
  })

  return downloadDataFromPage(URL)
}
