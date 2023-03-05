"use client";

import { setSelection, useResult, useTheme } from "./store";

export function Preview() {
  const result = useResult();

  const { lines, waitingFor, colors } = result;

  const theme = useTheme();

  if (!lines) return null;
  const lineCount = lines.length;
  const lineDigits = lineCount.toString().length;
  const lineNumberColor = theme.colors["editorLineNumber.foreground"];

  return (
    <>
      <pre
        className="p-2 rounded cursor-pointer"
        style={{
          background: colors.background,
          minWidth: "40ch",
          maxWidth: "80ch",
          overflow: "auto",
          maxHeight: "80vh",
        }}
        onClick={() =>
          setSelection({ type: "color", key: "editor.background" })
        }
      >
        <code>
          {lines.map((l, i) => (
            <div key={i}>
              <span
                className="hover:outline-dotted cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelection({
                    type: "color",
                    key: "editorLineNumber.foreground",
                  });
                }}
                style={{
                  width: lineDigits + "ch",
                  marginRight: "1.5ch",
                  display: "inline-block",
                  textAlign: "right",
                  color: lineNumberColor,
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
                    e.stopPropagation();
                    setSelection({ ...t, type: "token" });
                  }}
                />
              ))}
              <br />
            </div>
          ))}
        </code>
      </pre>
      {/* {waitingFor && <div className="absolute">Waiting for {waitingFor}</div>} */}
    </>
  );
}
