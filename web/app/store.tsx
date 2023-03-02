import { highlight } from "./highlighter";
import { store, sub, useStore } from "./storer";

const codeStore = store(`function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}

function consectetur(...adipiscing) {
  const elit = adipiscing[0];
  return sed.eiusmod(elit) ? elit : [elit];
}`);
const langStore = store("js");
const themeStore = store(null);
const resultStore = store<any>({});

let highlights = 0;

let worker = null;

sub([codeStore, langStore, themeStore], async (code, lang, theme) => {
  if (!theme) return;
  if (!worker) {
    worker = new Worker(new URL("../worker.ts", import.meta.url));
    worker.onmessage = (event: MessageEvent<any>) => {
      const result = event.data;
      if (result.id < highlights) return;
      resultStore.set({ ...result, waitingFor: null });
    };
  }
  const waitingFor = ++highlights;

  // TODO avoid re-rendering the whole tokens when waiting for a highlight
  resultStore.set({ ...resultStore.get(), waitingFor });
  worker.postMessage({ code, lang, theme, id: waitingFor });
});

export function setCode(code: string) {
  codeStore.set(code);
}
export function useCode() {
  return useStore(codeStore);
}
export function setTheme(theme) {
  themeStore.set(theme);
}
export function useTheme() {
  return useStore(themeStore);
}
export function setLang(lang) {
  langStore.set(lang);
}
export function useLang() {
  return useStore(langStore);
}

export function useResult() {
  return useStore(resultStore);
}

// ...
type Selection = {
  scope: string;
  content: string;
  style: any;
  scopes?: string[];
};
const selectionStore = store<Selection | null>(null);

export function setSelection(selection) {
  selectionStore.set(selection);
}

export function useSelection() {
  return useStore(selectionStore);
}
