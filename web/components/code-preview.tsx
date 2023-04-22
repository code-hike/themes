import { getColor } from "@/lib/theme-colors"

import { handleMouseEnter } from "./hoverboard"

export function CodePreview({ lines, theme, setSelection }) {
  const currentLines = lines
  const lineCount = currentLines.length
  const lineDigits = lineCount.toString().length
  const lineNumberColor = getColor(theme, "editorLineNumber.foreground")

  return (
    <div
      id="code-preview"
      style={{
        background: getColor(theme, "editor.background"),
        overflow: "auto",
        maxHeight: "80vh",
      }}
      onMouseOver={handleMouseEnter}
    >
      <pre
        className="cursor-pointer py-2 w-fit min-w-full"
        onClick={() =>
          setSelection({ type: "color", key: "editor.background" })
        }
      >
        <code className="relative">
          {currentLines.map((l, i) => (
            <div key={i} className="px-2 ">
              {3 <= i && i <= 4 && (
                <Mark theme={theme} setSelection={setSelection} />
              )}
              <span
                className="cursor-pointer relative"
                onMouseOver={handleMouseEnter}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelection({
                    type: "color",
                    key: "editorLineNumber.foreground",
                  })
                }}
                style={{
                  width: lineDigits + "ch",
                  marginRight: "1.5ch",
                  display: "inline-block",
                  textAlign: "right",
                  color: lineNumberColor,
                  userSelect: "none",
                }}
              >
                {i + 1}
              </span>
              <span className="relative">
                {l.map((t, j) => (
                  <span
                    className="cursor-pointer py-[2.8px]"
                    onMouseOver={handleMouseEnter}
                    key={j}
                    style={t.style}
                    children={t.content}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelection({ ...t, type: "token" })
                    }}
                  />
                ))}
              </span>
              <br />
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

function Mark({ theme, setSelection }) {
  return (
    <div
      style={{
        position: "absolute",
        background: getColor(theme, "editor.rangeHighlightBackground"),
        width: "100%",
        left: 0,
        color: "transparent",
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelection({ type: "color", key: "editor.rangeHighlightBackground" })
      }}
      onMouseOver={handleMouseEnter}
    >
      <div
        style={{
          background: getColor(theme, "editor.infoForeground"),
          width: 3,
          position: "absolute",
          left: 0,
          height: "100%",
        }}
        onMouseOver={handleMouseEnter}
        onClick={(e) => {
          e.stopPropagation()
          setSelection({
            type: "color",
            key: "editor.infoForeground",
          })
        }}
      />
      x
    </div>
  )
}
