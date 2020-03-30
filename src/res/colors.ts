export const colors = {
  beigeLight: '#F9F0EB',
  beigeDark: '#EEE2DC',
  blueDark: '#0C2333',
  pink: '#C14E7C',
  greyDark: '#BDBCBD',
  yellow: '#E1B674',
  blueLight: '#71C2E8',
  purple: '#7489E1',
  pinkDark: '#E87180',
  green: '#37D37D',
}

export const lightenDarkenColor = (col: string, amt: number) => {
  let usePound = false

  if (col[0] == '#') {
    col = col.slice(1)
    usePound = true
  }

  const num = parseInt(col, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00ff) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000ff) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}
