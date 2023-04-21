import { getColor } from "@/lib/theme-colors"
import { fixTheme } from "@/lib/theme-utils"
import { CodeBar } from "@/components/code-bar"
import { CodeEditor } from "@/components/code-editor"
import { CodePreview } from "@/components/code-preview"
import { Hoverboard, hideHoverboard } from "@/components/hoverboard"

import { useSelector } from "./store-provider"

export function CodeCanvas() {
  const result = useSelector((state) => state.result)
  const theme = useSelector((state) => fixTheme(state.rawTheme))
  const editing = useSelector((state) => state.editing)
  const setEditing = useSelector((state) => state.setEditing)
  const lang = useSelector((state) => state.selectedLangName)
  const code = useSelector((state) => state.codes[state.selectedLangName])
  const updateCode = useSelector((state) => state.updateCode)
  const setSelection = useSelector((state) => state.setSelection)

  return (
    <div
      className="rounded overflow-hidden z-10"
      style={{
        minWidth: "40ch",
        maxWidth: "80ch",
      }}
      onMouseLeave={hideHoverboard}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `#code-preview ::selection { background-color: ${getColor(
            theme,
            "editor.selectionBackground"
          )} }`,
        }}
      />
      <CodeBar
        theme={theme}
        editing={editing}
        setEditing={setEditing}
        setSelection={setSelection}
      />
      {editing ? (
        <CodeEditor
          code={code}
          lang={lang}
          theme={theme}
          onDone={(code) => {
            updateCode(code)
          }}
        />
      ) : (
        <CodePreview
          lines={result.lines}
          theme={theme}
          setSelection={setSelection}
        />
      )}
      <Hoverboard background={getColor(theme, "editor.selectionBackground")} />
    </div>
  )
}
