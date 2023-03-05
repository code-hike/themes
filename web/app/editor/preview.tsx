"use client";

import { setSelection, useResult } from "./store";

export function Preview() {
  const result = useResult();

  const { lines, waitingFor, colors } = result;
  if (!lines) return null;

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
