"use client";

import { setSelection, useSelection } from "./store";

export function Editor() {
  const selection = useSelection();
  return (
    <div>
      {selection ? (
        <div>
          <div>Scope: {selection.scope}</div>
          <div>
            Content: <span style={selection.style}>{selection.content}</span>
          </div>
          <div>Style: {JSON.stringify(selection.style)}</div>
          <div onClick={() => setSelection(null)}>Clear</div>
        </div>
      ) : (
        <div>Nothing selected</div>
      )}
    </div>
  );
}
