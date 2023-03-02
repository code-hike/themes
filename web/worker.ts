import { highlightWithScopes as h } from "@code-hike/lighter";

addEventListener("message", async (event: MessageEvent<any>) => {
  const { code, lang, theme, id } = event.data;
  highlight(code, lang, theme, id).then((r) => {
    postMessage(r);
  });
});

async function highlight(code, lang, theme, id) {
  const r = await h(code, lang, theme);
  return { id, ...r };
}
