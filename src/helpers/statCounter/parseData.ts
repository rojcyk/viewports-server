import neatCsv from 'neat-csv'

////////////////////////////////////
// Local imports
////////////////////////////////////

import asyncForEach from '@helpers/asyncForEach'

////////////////////////////////////
// Functions related to the parsing
////////////////////////////////////

export const parseCSV = async (csvContent: string): Promise<StatCounter.Result[]> => {
  const parsedResults: StatCounter.Result[] = []
  const content = csvContent.replace(/^.*\n/, '"resolution","share"\n')

  await asyncForEach(
    await neatCsv(content),
    async (result: { resolution: string; share: string }): Promise<void> => {
      if (result.resolution !== 'Other') {
        parsedResults.push({
          resolution: result.resolution,
          share: parseFloat(result.share),
        })
      }
    },
  )

  return parsedResults
}