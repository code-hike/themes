export function getPalette(theme) {
  const colors = theme.tokenColors
    .filter((rule) => rule.settings && rule.settings.foreground)
    .map((rule) => rule.settings.foreground.toUpperCase());
  // order by count
  const colorCounts = colors.reduce((acc, color) => {
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {});
  const palette = Object.keys(colorCounts).sort(
    (a, b) => colorCounts[b] - colorCounts[a]
  );
  return palette;
}
