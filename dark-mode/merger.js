const { getEditorColor } = require("./lib/theme-colors");

const dark = require("./material-darker.json");
const light = require("./material-lighter.json");
const name = "material-from-css";

const editorColorsToKeep = [
  "editor.background",
  "editor.foreground",
  "editor.selectionBackground",
  "editor.infoForeground",
  "editor.rangeHighlightBackground",
  "editorLineNumber.foreground",
  "tab.activeBackground",
  "tab.inactiveBackground",
  "tab.activeForeground",
  "tab.inactiveForeground",
  "tab.border",
  "tab.activeBorder",
  "tab.activeBorderTop",
  "tab.hoverBackground",
  "tab.hoverForeground",
  "editorGroupHeader.tabsBorder",
  "editorGroupHeader.tabsBackground",
  "list.inactiveSelectionBackground",
  "list.inactiveSelectionForeground",
  "list.hoverBackground",
  "list.hoverForeground",
];

const colorMap = {};
let counter = 1;
let darkCss = "";
let lightCss = "";
function getColor(darkColor, lightColor) {
  if (darkColor === lightColor) {
    return darkColor;
  }
  if (!darkColor || !lightColor) {
    throw new Error("Missing color in one of the rules");
  }
  const key = `${darkColor.toUpperCase()} ${lightColor.toUpperCase()}`;
  if (colorMap[key]) {
    return colorMap[key];
  }
  colorMap[key] = `var(--ch-${counter})`;
  darkCss += `  --ch-${counter}: ${darkColor.toUpperCase()};\n`;
  lightCss += `  --ch-${counter}: ${lightColor.toUpperCase()};\n`;
  counter++;
  return colorMap[key];
}

function merge(dark, light) {
  const dRules = dark.tokenColors;
  const lRules = light.tokenColors;

  if (dRules.length !== lRules.length) {
    throw new Error("Rules length mismatch");
  }

  const newRules = dRules.map((dRule) => {
    const lRule = lRules.find(
      (r) => r.scope?.toString() === dRule.scope?.toString()
    );

    if (!lRule) {
      throw new Error("No match for ", dRule.scope?.toString());
    }

    const dSettings = dRule.settings;
    const lSettings = lRule.settings;

    if (dSettings.fontStyle !== lSettings.fontStyle) {
      throw new Error("Font style mismatch", dRule.scope?.toString());
    }

    const background = getColor(dSettings.background, lSettings.background);
    const foreground = getColor(dSettings.foreground, lSettings.foreground);
    const fontStyle = dSettings.fontStyle;
    const newSettings = {};
    if (background) {
      newSettings.background = background;
    }
    if (foreground) {
      newSettings.foreground = foreground;
    }
    if (fontStyle) {
      newSettings.fontStyle = fontStyle;
    }

    return {
      scope: dRule.scope,
      settings: newSettings,
    };
  });

  const colors = {};
  editorColorsToKeep.forEach((key) => {
    const dColor = getEditorColor(dark, key);

    const lColor = getEditorColor(light, key);
    colors[key] = getColor(dColor, lColor);
    // console.log(key, dColor, lColor, colors[key]);
  });

  return {
    name,
    type: "from-css",
    tokenColors: newRules,
    colors,
  };
}

const fs = require("fs");
fs.writeFileSync(`./${name}.json`, JSON.stringify(merge(dark, light), null, 2));

fs.writeFileSync(
  `./${name}.css`,
  `:root {\n  --ch-0: dark;\n${darkCss}} \n\n[data-theme="light"] {\n  --ch-0: light;\n${lightCss}}`
);
