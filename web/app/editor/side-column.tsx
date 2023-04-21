"use client"

import { Separator } from "@/components/ui/separator"
import { ExportDialog } from "@/components/export-dialog"
import { ThemeColorsEditor } from "@/components/theme-colors-editor"
import { BaseThemePicker } from "@/components/theme-picker"
import { ThemeRuleEditor } from "@/components/theme-rule-editor"

import { useSelector } from "./store-provider"

export function SideColumn({ themes, initialThemeName }) {
  const rawTheme = useSelector((state) => state.rawTheme)
  const setTheme = useSelector((state) => state.setTheme)
  const selection = useSelector(
    (state) => state.selection || { type: "color", key: "editor.background" }
  )
  const setSelection = useSelector((state) => state.setSelection)
  const result = useSelector((state) => state.result)

  return (
    <>
      <BaseThemePicker
        onBaseChange={setTheme}
        sponsor="sponsor"
        initialState={{
          themes,
          themeName: initialThemeName,
          theme: rawTheme,
        }}
      />
      <Separator className="mb-4 mt-4" />
      <Editor
        selection={selection}
        result={result}
        rawTheme={rawTheme}
        setTheme={setTheme}
        setSelection={setSelection}
        key={rawTheme.name}
      />
      <Separator className="mb-4 mt-4" />
      <div className="px-2">
        <ExportDialog theme={rawTheme} />
      </div>
    </>
  )
}

function Editor({ selection, result, rawTheme, setTheme, setSelection }) {
  if (selection.type === "token") {
    return (
      <ThemeRuleEditor
        token={selection}
        result={result}
        key={selection.scopes?.toString() + selection.content}
        theme={rawTheme}
        setTheme={setTheme}
        setSelection={setSelection}
      />
    )
  } else {
    return (
      <ThemeColorsEditor
        key={selection.key}
        colorKey={selection.key}
        theme={rawTheme}
        setTheme={setTheme}
        setSelection={setSelection}
      />
    )
  }
}
