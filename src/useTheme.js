import React from 'react'
import { useGetLatestRef } from './helper'

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

const baseTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256]
}

const whiteColors = getAlphaColors('#f5f5f5')
const blackColors = getAlphaColors('#191919')

const theme = {
  light: {
    ...baseTheme,
    colors: {
      default: whiteColors,
      secondary: blackColors
    }
  },
  dark: {
    ...baseTheme,
    colors: {
      default: blackColors,
      secondary: whiteColors
    }
  }
}

const DEFAULT_THEME = 'light'

const mergeThemes = (customThemes) => {
  return customThemes.reduce((prev, next) => {
    const nextTheme = {}

    nextTheme[next.name] = {
      ...baseTheme,
      colors: {
        default: getAlphaColors(next.default),
        secondary: getAlphaColors(next.secondary)
      }
    }

    return {
      ...prev,
      ...nextTheme
    }
  }, theme)
}

export const useTheme = ({ customThemes }) => {
  const themeRef = React.useRef({})
  const getInstance = useGetLatestRef(themeRef.current)

  const themes = React.useMemo(() => {
    return mergeThemes(customThemes)
  }, [customThemes])

  const getTheme = React.useCallback(
    (themeName) => {
      if (getInstance().themes.hasOwnProperty(themeName)) {
        return themes[themeName]
      }
      return themes[DEFAULT_THEME]
    },
    [themes]
  )

  Object.assign(getInstance(), {
    themes,
    availableThemes: Object.keys(themes),
    getTheme
  })

  return getInstance()
}
