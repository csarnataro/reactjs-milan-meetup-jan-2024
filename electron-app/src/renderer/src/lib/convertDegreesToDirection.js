export const convertDegreesToDirection = (degrees) => {
  const map = {
    0: 'N',
    1: 'NNE',
    2: 'NE',
    3: 'ENE',
    4: 'E',
    5: 'ESE',
    6: 'SE',
    7: 'SSE',
    8: 'S',
    9: 'SSW',
    10: 'SW',
    11: 'WSW',
    12: 'W',
    13: 'WNW',
    14: 'NW',
    15: 'NNW',
    16: 'N'
  }

  return map[Math.round(degrees / 22.5)]
}
