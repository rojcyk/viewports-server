declare namespace StatCounter {

  type RegionCode = 'ww' | 'af' | 'as' | 'eu' | 'oc' | 'na' | 'sa'
  type PlatformCode = 'mobile' | 'tablet' | 'desktop'

  interface Query {
    typeHidden: string
    type: string
  }

  interface URLOptions {
    device: string
    query: Query
    regionHidden: string
    regionUrl: string
  }

  interface Result {
    resolution: string
    share: number
  }

  interface PlatformData {
    [key: string]: Result[]
    // ww: Result[]
    // af: Result[]
    // as: Result[]
    // eu: Result[]
    // oc: Result[]
    // na: Result[]
    // sa: Result[]
  }

  interface Data {
    [key: string]: PlatformData
  }
}
