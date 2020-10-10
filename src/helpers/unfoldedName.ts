export default (region?: string) => {
  switch (region) {
    case 'ww':
      return 'World Wide'
    case 'na':
      return 'North America'
    case 'sa':
      return 'South America'
    case 'as':
      return 'Asia'
    case 'af':
      return 'Africa'
    case 'eu':
      return 'Europe'
    case 'oc':
      return 'Oceania'
  }
}