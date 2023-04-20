import { getColor } from "@/lib/theme-colors"

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
    >
      <pre
        className="p-2 cursor-pointer"
        onClick={() =>
          setSelection({ type: "color", key: "editor.background" })
        }
      >
        <code>
          {currentLines.map((l, i) => (
            <div key={i}>
              <span
                className="hover:outline-dotted cursor-pointer"
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
              {l.map((t, j) => (
                <span
                  className="hover:outline-dotted cursor-pointer"
                  key={j}
                  style={t.style}
                  children={t.content}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelection({ ...t, type: "token" })
                  }}
                />
              ))}
              <br />
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
