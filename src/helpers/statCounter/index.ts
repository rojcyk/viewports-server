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
  const platformData: StatCounter.PlatformData = {}

  await asyncForEach(allRegions, async (region: Region) => {
      console.log(`- Downloading ${platformName} for ${region.title} ...`)
      const csvPlatformData = await downloadDataForRegion(platformName, region)
      const processedPlatformData = await parseCSV(csvPlatformData)
      platformData[region.code] = processedPlatformData
  })

  return platformData
}