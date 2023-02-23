import { highlight } from "./highlighter";
import { store, sub, useStore } from "./storer";
import monokai from "../themes/monokai.json";

const codeStore = store("const a = 1");
const langStore = store("js");
const themeStore = store(monokai);
const resultStore = store<any>({});

let highlights = 0;

sub([codeStore, langStore, themeStore], async (code, lang, theme) => {
  const waitingFor = ++highlights;
  resultStore.set({ ...resultStore.get(), waitingFor });
  const result = await highlight(code, lang, theme, waitingFor);
  if (result.id < highlights) return;
  resultStore.set({ ...result, waitingFor: null });
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
type Selection = { scope: string; content: string; style: any };
const selectionStore = store<Selection | null>(null);

export function setSelection(selection) {
  selectionStore.set(selection);
}

export function useSelection() {
  return useStore(selectionStore);
}
