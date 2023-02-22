export function listColors(theme) {
  const { colors, tokenColors } = theme;

  const palette = new Set();
  Object.values(colors).forEach((color) => {
    palette.add(color);
  });

  tokenColors.forEach((s) => {
    const color = s?.settings?.foreground;
    if (color) {
      palette.add(color);
    }
  });
  return palette;
}
