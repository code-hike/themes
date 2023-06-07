function getColor(theme, name) {
  const colors = theme.colors || {};
  if (colors[name]) {
    return colors[name];
  }

  const defaultColors = defaults[name];
  if (typeof defaultColors === "string") {
    return getColor(theme, defaultColors);
  }

  const result = getDefault(theme, defaultColors);
  // console.log("getColor", name, result)

  return result;
}

module.exports = {
  getEditorColor: getColor,
};

function getDefault(theme, defaults) {
  const themeType = theme.type
    ? theme.type
    : theme.name?.toLowerCase().includes("light")
    ? "light"
    : "dark";
  const defaultByScheme = defaults[themeType];
  if (Array.isArray(defaultByScheme)) {
    const [fn, name, ...args] = defaultByScheme;
    const color = getColor(theme, name);
    return fn(color, ...args);
  }
  return defaultByScheme;
}

// defaults from: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/common/theme.ts
// and: https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/core/editorColorRegistry.ts
// and: https://github.com/microsoft/vscode/blob/main/src/vs/platform/theme/common/colorRegistry.ts
// keys from : https://code.visualstudio.com/api/references/theme-color#editor-groups-tabs
const contrastBorder = "#6FC3DF";
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
  "editor.infoForeground": {
    dark: "#3794FF",
    light: "#1a85ff",
    hc: "#3794FF",
  },
  "editor.rangeHighlightBackground": {
    dark: "#ffffff0b",
    light: "#fdff0033",
  },
};

// from https://stackoverflow.com/a/53936623/1325646
const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
const getChunksFromString = (st, chunkSize) =>
  st.match(new RegExp(`.{${chunkSize}}`, "g"));
const convertHexUnitTo256 = (hex) => parseInt(hex.repeat(2 / hex.length), 16);
function getAlphaFloat(a, alpha) {
  if (typeof a !== "undefined") {
    return a / 255;
  }
  if (typeof alpha != "number" || alpha < 0 || alpha > 1) {
    return 1;
  }
  return alpha;
}

function hexToObject(hex) {
  if (!hex) {
    return undefined;
  }
  if (!isValidHex(hex)) {
    throw new Error("Invalid color string, must be a valid hex color");
  }
  const chunkSize = Math.floor((hex.length - 1) / 3);
  const hexArr = getChunksFromString(hex.slice(1), chunkSize);
  const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
  return {
    r,
    g,
    b,
    a: getAlphaFloat(a, 1),
  };
}

function objectToHex(object) {
  if (!object) {
    return undefined;
  }
  const { r, g, b, a } = object;
  const alpha = Math.round(a * 255);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${alpha
    .toString(16)
    .padStart(2, "0")}`;
}

function transparent(color, opacity) {
  if (!color) {
    return color;
  }
  const { r, g, b, a } = hexToObject(color);
  return objectToHex({ r, g, b, a: a * opacity });
}

function opaque(color) {
  if (!color) {
    return color;
  }
  const { r, g, b } = hexToObject(color);
  return objectToHex({ r, g, b, a: 1 });
}
