import { highlightWithScopes as h } from "@code-hike/lighter";

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export async function highlight(code, lang, theme, id) {
  // const lines = code.split("\n").map((line) => {
  const r = await h(code, lang, theme);
  // console.log(r);
  return { id, ...r };
}

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
