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
    <div className="rounded overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `#code-preview ::selection { background-color: ${theme.colors["editor.selectionBackground"]} }`,
        }}
      />
      <div
        style={{
          background: theme.colors["editorGroupHeader.tabsBackground"],
          position: "relative",
          display: "flex",
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelection({
            type: "color",
            key: "editorGroupHeader.tabsBackground",
          });
        }}
      >
        <Tab active={false} theme={theme} />
        <Tab active={true} theme={theme} />
        <Tab active={false} theme={theme} />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 1,
            zIndex: 9,
            background: theme.colors["editorGroupHeader.tabsBorder"],
          }}
          className="hover:outline-dotted cursor-pointer"
        ></div>
      </div>
      <pre
        id="code-preview"
        className="p-2 cursor-pointer"
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
    </div>
  );
}

function Tab({ active, theme }) {
  const backgroundKey = active
    ? "tab.activeBackground"
    : "tab.inactiveBackground";
  const foregroundKey = active
    ? "tab.activeForeground"
    : "tab.inactiveForeground";

  return (
    <span
      style={{
        background: theme.colors[backgroundKey],
        color: theme.colors[foregroundKey],
        cursor: "pointer",
        display: "inline-block",
        padding: "0.5em 1em",
        position: "relative",
        fontSize: "13px",
        borderRight: `1px solid ${theme.colors["tab.border"]}`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelection({
          type: "color",
          key: backgroundKey,
        });
      }}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
          setSelection({
            type: "color",
            key: foregroundKey,
          });
        }}
      >
        {active ? "Active" : "Inactive"}
      </span>
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 1,
            zIndex: 10,
            width: "100%",
            background: theme.colors["tab.activeBorder"],
          }}
        />
      )}
      {active && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 1,
            zIndex: 10,
            width: "100%",
            background: theme.colors["tab.activeBorderTop"],
          }}
        />
      )}
    </span>
  );
}
