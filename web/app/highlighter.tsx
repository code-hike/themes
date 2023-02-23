function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export async function highlight(code, lang, theme, id) {
  const lines = code.split("\n").map((line) => {
    return line.split(/(\s)/g).map((word) => {
      const token = {
        content: word,
        style: { color: randomColor() },
        scope: "var",
      };
      return token;
    });
  });
  await wait(1000);
  return { lines, id };
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
