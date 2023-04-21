import { opaque } from "./color"

export function getPalette(theme) {
  const tokenColors = theme.tokenColors
    .filter((rule) => rule.settings && rule.settings.foreground)
    .map((rule) => rule.settings.foreground.toUpperCase())

  const themeColors = Object.values(theme?.colors || {}).filter(
    (c) => typeof c === "string"
  )

  const colors = [...tokenColors, ...themeColors].map((color) => opaque(color)!)

  // order by count
  const colorCounts = colors.reduce((acc, color) => {
    acc[color] = (acc[color] || 0) + 1
    return acc
  }, {})
  const palette = Object.keys(colorCounts).sort(
    (a, b) => colorCounts[b] - colorCounts[a]
  )
  return palette.slice(0, 13 * 5)
}

export function fixTheme(theme) {
  const fixedTheme = { ...theme }
  if (!fixedTheme.tokenColors?.find((rule) => !rule.scope)) {
    fixedTheme.themeColors = [
      {
        name: "Global",
        scope: "",
        settings: {
          foreground: theme.foreground,
          background: theme.background,
        },
      },
      ...(theme.themeColors || []),
    ]
  }

  fixedTheme.type = getColorScheme(fixedTheme)

  return fixedTheme
}

function getColorScheme(theme) {
  const themeType = theme.type
    ? theme.type
    : theme.name?.toLowerCase().includes("light")
    ? "light"
    : "dark"
  if (themeType === "light") {
    return "light"
  } else {
    return "dark"
  }
}
