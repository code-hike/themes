import { highlight } from "@/components/highlighter";
import React from "react";
import darkPlus from "@/themes/dark-plus.json";
import { getColor } from "@/components/theme-colors";
import { fixTheme } from "@/components/theme-utils";

const textAreaProps = {
  spellCheck: false,
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "off",
};

// #editing, #highlighting {
//   /* Both elements need the same text and space styling so they are directly on top of each other */
//   margin: 10px;
//   padding: 10px;
//   border: 0;
//   width: calc(100% - 32px);
//   height: 150px;
// }

const commonStyle: any = {
  margin: 10,
  padding: 10,
  border: 0,
  width: "calc(100% - 32px)",
  height: 150,
  fontSize: "15pt",
  fontFamily: "monospace",
  lineHeight: "20pt",
  position: "absolute",
  top: 0,
  left: 0,
  overflow: "auto",
  whiteSpace: "nowrap",
};

export default function Page() {
  return (
    <CodeArea code="const a = 1" lang="javascript" theme={fixTheme(darkPlus)} />
  );
}

export function CodeArea({ code, lang, theme }) {
  const [input, setInput] = React.useState(code);

  React.useEffect(() => {
    setInput(code);
  }, [code]);

  return (
    <div id="code-preview">
      <style
        dangerouslySetInnerHTML={{
          __html: `#code-preview ::selection { background-color: ${getColor(
            theme,
            "editor.selectionBackground"
          )}; color: transparent; }`,
        }}
      />
      <textarea
        data-gramm_editor="false"
        {...textAreaProps}
        onInput={(e) => {
          setInput(e.currentTarget.value);
        }}
        value={input}
        rows={10}
        style={{
          ...commonStyle,
          zIndex: 0,
          color: "transparent",
          caretColor: getColor(theme, "editorCursor.foreground"),
          background: getColor(theme, "editor.background"),
          resize: "none",
        }}
      />
      <pre
        aria-hidden={true}
        style={{
          ...commonStyle,
          zIndex: 1,
          hyphens: "none",
          pointerEvents: "none",
          // display: "none",
        }}
      >
        <Lines code={input} lang={lang} theme={theme} />
      </pre>
    </div>
  );
}

function Lines({ code, lang, theme }) {
  const [lines, setLines] = React.useState([]);
  React.useEffect(() => {
    highlight(code, lang, theme).promise.then(({ lines }) => {
      setLines(lines);
    });
  }, [code, lang, theme]);
  return (
    <code>
      {lines.map((tokens, i) => (
        <div key={i}>
          {tokens.map((token) => (
            <span style={token.style}>{token.content}</span>
          ))}
        </div>
      ))}
    </code>
  );
}
