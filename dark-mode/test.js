const dark = require("./material-darker.json");
const light = require("./material-lighter.json");

function test() {
  const lightScopes = light.tokenColors.map((t) => t.scope);
  const darkScopes = dark.tokenColors.map((t) => t.scope);

  // check that the scopes list is the same
  if (lightScopes.length !== darkScopes.length) {
    throw new Error("Scopes length mismatch");
  }

  let doubleSettings = [];

  for (let i = 0; i < lightScopes.length; i++) {
    const lightScope = lightScopes[i]?.toString();
    const darkScope = darkScopes[i]?.toString();

    if (lightScope !== darkScope) {
      console.log("Scopes mismatch", lightScope, darkScope);
      return;
    }

    doubleSettings.push({
      scope: lightScope,
      light: light.tokenColors[i].settings,
      dark: dark.tokenColors[i].settings,
    });
  }

  const colors = doubleSettings.map(({ dark, light }) => {
    return `${dark.foreground?.toUpperCase()} ${light.foreground?.toUpperCase()}`;
  });

  const uniqueColors = [...new Set(colors)];
  const digits = (uniqueColors.length - 1).toString(10).length;
  let counter = 0;
  const colorMap = {};
  const css = {
    dark: "",
    light: "",
  };
  uniqueColors.forEach((color) => {
    if (color === "undefined undefined") {
      return;
    }

    const darkColor = color.split(" ")[0];
    const lightColor = color.split(" ")[1];

    if (darkColor === lightColor) {
      colorMap[color] = darkColor;
      return;
    }

    const n = counter.toString(10).padStart(digits, "0");
    colorMap[color] = `var(--ch-${n})`;
    counter++;
    css.dark += `--ch-${n}: ${darkColor};\n`;
    css.light += `--ch-${n}: ${lightColor};\n`;
  });
  console.log(colorMap);
  console.log(css);

  const newSettings = doubleSettings.map(({ scope, dark, light }) => {
    let foreground = undefined;
    if (dark.foreground?.toUpperCase() === light.foreground?.toUpperCase()) {
      foreground = dark.foreground?.toUpperCase();
    } else {
      foreground =
        colorMap[
          `${dark.foreground?.toUpperCase()} ${light.foreground?.toUpperCase()}`
        ];
    }

    const settings = { ...dark };
    if (foreground) {
      settings.foreground = foreground;
    }
    const result = {
      settings,
    };
    if (scope) {
      result.scope = scope;
    }
    return result;
  });

  console.log(newSettings);
}

test();
