const hexToRGB = (hex) => {
  return {
    r: +`0x${hex[1]}${hex[2]}`,
    g: +`0x${hex[3]}${hex[4]}`,
    b: +`0x${hex[5]}${hex[6]}`
  }
}

const getAlphaColors = (colorCode) => {
  const { r, g, b } = hexToRGB(colorCode)

  let colors = []
  for (let i = 1; i < 10; i++) {
    colors.push(`rgba(${r}, ${g}, ${b}, ${1 - i * 0.1})`)
  }
  return colors
}

const theme = {
  light: {
    colors: getAlphaColors('#f5f5f5')
  },
  dark: {
    colors: getAlphaColors('#191919')
  }
}

export default theme
