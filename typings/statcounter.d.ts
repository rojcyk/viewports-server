declare namespace StatCounter {

  type RegionCode = 'ww' | 'af' | 'as' | 'eu' | 'oc' | 'na' | 'sa'
  type PlatformCode = 'mobile' | 'tablet' | 'desktop'

  type Query = {
    typeHidden: string
    type: string
  }

  type URLOptions = {
    device: string
    query: Query
    regionHidden: RegionCode
    regionUrl: string
  }

  type Result = {
    resolution: string
    share: number
  }

  type PlatformData = {
    [K in RegionCode]: Result[]
  }

  type Data = {
    [K in PlatformCode]: PlatformData
  }
}
