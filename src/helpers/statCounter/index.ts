import { getManager } from "typeorm"

import { downloadDataForRegion } from './downloadData'
import { parseCSV } from './parseData'
import asyncForEach from '@helpers/asyncForEach'
import Region from '@models/Region'

// Process platform data
export default async (
  platformName: StatCounter.PlatformCode,
): Promise<StatCounter.PlatformData> => {

  let regionRepository = getManager().getRepository(Region)
  const allRegions = await regionRepository.find()
  const platformData: {
    [K in StatCounter.RegionCode]: StatCounter.Result[]
  } = {
    ww: [],
    af: [],
    as: [],
    eu: [],
    oc: [],
    na: [],
    sa: []
  }

  await asyncForEach(allRegions, async (region: Region) => {
      console.log(`- Downloading ${platformName} for ${region.title} ...`)
      const csvPlatformData = await downloadDataForRegion(platformName, region)
      console.log(`- platform data: `,csvPlatformData)
      const processedPlatformData = await parseCSV(csvPlatformData)
      console.log(`- processed platform data: `,processedPlatformData)
      platformData[region.code as StatCounter.RegionCode] = processedPlatformData
  })

  return platformData
}