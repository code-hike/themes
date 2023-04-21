import { transparent } from "./color"

type FinalTheme = any

export function getColor(theme: FinalTheme, name: string) {
  const colors = theme.colors || {}
  if (colors[name]) {
    return colors[name]
  }

  const defaultColors = defaults[name]
  if (typeof defaultColors === "string") {
    return getColor(theme, defaultColors)
  }

  return getDefault(theme, defaultColors)
}

function getDefault(theme: FinalTheme, defaults) {
  const defaultByScheme = defaults[theme.type]
  if (Array.isArray(defaultByScheme)) {
    const [fn, name, ...args] = defaultByScheme
    const color = getColor(theme, name)
    return fn(color, ...args)
  }
  return defaultByScheme
}

// defaults from: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/common/theme.ts
// and: https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/core/editorColorRegistry.ts
// and: https://github.com/microsoft/vscode/blob/main/src/vs/platform/theme/common/colorRegistry.ts
// keys from : https://code.visualstudio.com/api/references/theme-color#editor-groups-tabs
const contrastBorder = "#6FC3DF"
const defaults = {
  "editor.foreground": {
    dark: "#bbbbbb",
    light: "#333333",
    hc: "#ffffff",
  },
  "editorLineNumber.foreground": {
    dark: "#858585",
    light: "#237893",
    hc: "#fffffe",
  },
  "editor.selectionBackground": {
    light: "#ADD6FF",
    dark: "#264F78",
    hc: "#f3f518",
  },
  "editor.background": {
    light: "#fffffe",
    dark: "#1E1E1E",
    hc: "#000000",
  },
  "editorGroupHeader.tabsBackground": {
    dark: "#252526",
    light: "#F3F3F3",
    hc: undefined,
  },
  "tab.activeBackground": "editor.background",
  "tab.activeForeground": { dark: "#ffffff", light: "#333333", hc: "#ffffff" },
  "tab.border": { dark: "#252526", light: "#F3F3F3", hc: contrastBorder },
  "tab.activeBorder": "tab.activeBackground",
  "tab.inactiveBackground": {
    dark: "#2D2D2D",
    light: "#ECECEC",
    hc: undefined,
  },
  "tab.inactiveForeground": {
    dark: [transparent, "tab.activeForeground", 0.5],
    light: [transparent, "tab.activeForeground", 0.5],
    hc: "#ffffff",
  },
  "diffEditor.insertedTextBackground": {
    dark: "#9ccc2c33",
    light: "#9ccc2c40",
    hc: undefined,
  },
  "diffEditor.removedTextBackground": {
    dark: "#ff000033",
    light: "#ff000033",
    hc: undefined,
  },
  "diffEditor.insertedLineBackground": {
    dark: "#9bb95533",
    light: "#9bb95533",
    hc: undefined,
  },
  "diffEditor.removedLineBackground": {
    dark: "#ff000033",
    light: "#ff000033",
    hc: undefined,
  },
  "icon.foreground": { dark: "#C5C5C5", light: "#424242", hc: "#FFFFFF" },
  "sideBar.background": { dark: "#252526", light: "#F3F3F3", hc: "#000000" },
  "sideBar.foreground": "editor.foreground",
  "sideBar.border": "sideBar.background",
  "list.inactiveSelectionBackground": { dark: "#37373D", light: "#E4E6F1" },
  "list.inactiveSelectionForeground": { dark: undefined, light: undefined },
  "list.hoverBackground": { dark: "#2A2D2E", light: "#F0F0F0" },
  "list.hoverForeground": { dark: undefined, light: undefined },
  "editorGroupHeader.tabsBorder": { hc: contrastBorder },
  "tab.activeBorderTop": { hc: contrastBorder },
  "tab.hoverBackground": "tab.inactiveBackground",
  "tab.hoverForeground": "tab.inactiveForeground",
  "editorCursor.foreground": {
    dark: "#AEAFAD",
    light: "#000000",
    hc: "#ffffff",
  },
}
