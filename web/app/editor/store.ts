import {
  LighterResult,
  RawTheme,
  highlightSync,
  preload,
} from "@code-hike/lighter"
import { createStore } from "zustand"
import { immer } from "zustand/middleware/immer"

export type Selection =
  | {
      type: "token"
      scope: string
      content: string
      style: any
      scopes?: string[]
    }
  | { type: "color"; key: string }

export type LangOption = {
  name: string
  status: "empty" | "loading" | "loaded"
  used?: boolean
  popular?: boolean
}

export type State = {
  langOptions: LangOption[]
  selectedLangName: string
  result: LighterResult
  rawTheme: RawTheme
  editing: boolean
  codes: { [key: string]: string }
  selection?: Selection
}

export type Actions = {
  setLangStatus: (langName: string, status: LangOption["status"]) => void
  pickLang: (langName: string) => void
  loadLang: (langName: string) => Promise<void>
  updateResult: () => void
  updateCode: (code: string) => void
  setTheme: (theme: RawTheme) => void
  setEditing: (editing: boolean) => void
  setSelection: (selection: Selection) => void
}

export function createMyStore(initialState: State) {
  const creator = immer<State & Actions>((set, get) => ({
    ...initialState,

    // setters
    setEditing: (editing: boolean) => {
      set((state) => {
        state.editing = editing
      })
    },
    setLangStatus: (langName: string, status: LangOption["status"]) => {
      set((state) => {
        const langOption = state.langOptions.find(
          ({ name }) => name === langName
        )!
        langOption.status = status
        langOption.used = true
      })
    },
    setTheme: (theme: RawTheme) => {
      set((state) => {
        state.rawTheme = theme
      })
      get().updateResult()
    },
    setSelection: (selection: Selection) => {
      set((state) => {
        state.selection = selection
      })
    },

    // actions
    pickLang: (langName: string) => {
      set((state) => {
        state.selectedLangName = langName
      })

      const langs = get().langOptions
      const selectedLang = langs.find(({ name }) => name === langName)!

      if (selectedLang.status === "empty") {
        get().setLangStatus(langName, "loading")
        get().loadLang(langName)
      }

      if (selectedLang.status === "loaded") {
        get().updateResult()
      }
    },
    loadLang: async (langName) => {
      await preload([langName])
      get().setLangStatus(langName, "loaded")
      get().updateResult()
    },
    updateCode: (code: string) => {
      set((state) => {
        state.codes[state.selectedLangName] = code
        state.editing = false
      })
      get().updateResult()
    },
    updateResult: () => {
      const { selectedLangName, rawTheme, codes } = get()
      const code = codes[selectedLangName]
      const result = highlightSync(code, selectedLangName, rawTheme, {
        scopes: true,
      })
      set((state) => {
        state.result = result
      })
    },
  }))
  return createStore(creator)
}
