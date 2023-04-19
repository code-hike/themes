import { create, createStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { LangOption, getLangOptions } from "./languages";
import {
  preload,
  highlightSync,
  LighterResult,
  RawTheme,
} from "@code-hike/lighter";

export type State = {
  langOptions: LangOption[];
  selectedLangName: string;
  result: LighterResult;
  rawTheme: RawTheme;
  editing: boolean;
  codes: { [key: string]: string };
};

export type Actions = {
  setLangStatus: (langName: string, status: LangOption["status"]) => void;
  pickLang: (langName: string) => void;
  loadLang: (langName: string) => Promise<void>;
  updateResult: () => void;
  updateCode: (code: string) => void;
  setTheme: (theme: RawTheme) => void;
  setEditing: (editing: boolean) => void;
};

export function createMyStore(initialState: State) {
  console.log("creating store");
  const creator = immer<State & Actions>((set, get) => ({
    // initial state
    ...initialState,
    editing: false,
    codes: initialState.langOptions.reduce((acc, { name }) => {
      acc[name] = `const foo = "bar";\nconsole.log(foo);`;
      return acc;
    }, {} as { [key: string]: string }),

    // setters
    setEditing: (editing: boolean) => {
      set((state) => {
        state.editing = editing;
      });
    },
    setLangStatus: (langName: string, status: LangOption["status"]) => {
      set((state) => {
        const langOption = state.langOptions.find(
          ({ name }) => name === langName
        )!;
        langOption.status = status;
      });
    },
    setTheme: (theme: RawTheme) => {
      set((state) => {
        state.rawTheme = theme;
      });
      get().updateResult();
    },

    // actions
    pickLang: (langName: string) => {
      set((state) => {
        state.selectedLangName = langName;
      });

      const langs = get().langOptions;
      const selectedLang = langs.find(({ name }) => name === langName)!;

      if (selectedLang.status === "empty") {
        get().setLangStatus(langName, "loading");
        get().loadLang(langName);
      }

      if (selectedLang.status === "loaded") {
        get().updateResult();
      }
    },
    loadLang: async (langName) => {
      await preload([langName]);
      get().setLangStatus(langName, "loaded");
      get().updateResult();
    },
    updateCode: (code: string) => {
      set((state) => {
        state.codes[state.selectedLangName] = code;
        state.editing = false;
      });
      get().updateResult();
    },
    updateResult: () => {
      const { selectedLangName, rawTheme, codes } = get();
      const code = codes[selectedLangName];
      const result = highlightSync(code, selectedLangName, rawTheme);
      set((state) => {
        state.result = result;
      });
    },
  }));
  return createStore(creator);
}

export const useStore = create();
