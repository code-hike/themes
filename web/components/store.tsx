import { highlight } from "./highlighter";
import { snippets } from "./snippets";
import { store, sub, useStore } from "./storer";

const codeStore = store(snippets["javascript"]);
const langStore = store("js");
const themeStore = store(null);
const resultStore = store<any>({});

let latestWaitingFor = 0;

sub([codeStore, langStore, themeStore], async (code, lang, theme) => {
  if (!theme) return;

  const { promise, waitingFor } = highlight(code, lang, theme);
  latestWaitingFor = waitingFor;
  const result: any = await promise;
  if (latestWaitingFor <= waitingFor) {
    resultStore.set({ ...result, waitingFor: null });
  }
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
type Selection =
  | {
      type: "token";
      scope: string;
      content: string;
      style: any;
      scopes?: string[];
    }
  | { type: "color"; key: string };
const selectionStore = store<Selection | null>(null);

export function setSelection(selection) {
  selectionStore.set(selection);
}

export function useSelection() {
  return useStore(selectionStore);
}
