"use client";

import { setSelection, useResult } from "./store";

export function Preview() {
  const result = useResult();

  const { lines, waitingFor } = result;
  if (!lines) return null;

  return (
    <>
      <pre className="p-2">
        <code>
          {lines.map((l, i) => (
            <div key={i}>
              {l.map((t, j) => (
                <span
                  className="hover:outline-dotted cursor-pointer"
                  key={j}
                  style={t.style}
                  children={t.content}
                  onClick={() => setSelection(t)}
                />
              ))}
            </div>
          ))}
        </code>
      </pre>
      {waitingFor && <div className="absolute">Waiting for {waitingFor}</div>}
    </>
  );
}
