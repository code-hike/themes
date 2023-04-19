import { highlight } from "@/components/highlighter";
import React from "react";
import { getColor } from "@/components/theme-colors";
import { setSelection, useCode, useLang, useResult, useTheme } from "./store";
import { CheckIcon } from "lucide-react";

export function EditableCode({ editing, onDone }) {
  const result = useResult();
  const theme = useTheme();
  const code = useCode();
  const lang = useLang();
  if (!result || !theme) return null;
  const { lines } = result;
  return editing ? (
    <CodeArea code={code} lang={lang} theme={theme} onDone={onDone} />
  ) : (
    <CodePreview code={code} lines={lines} theme={theme} />
  );
}

const textAreaProps = {
  spellCheck: false,
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "off",
};

const commonStyle: any = {
  margin: 0,
  padding: "0.5rem",
  border: 0,
  // fontSize: "15pt",
  fontFamily: "monospace",
  position: "absolute",
  top: 0,
  left: 0,
  // overflow: "auto",
  width: "100%",
};

export function CodeArea({ code, lang, theme, onDone }) {
  const [input, setInput] = React.useState(code);
  const ref = React.useRef<HTMLTextAreaElement>(null);

  React.useLayoutEffect(() => {
    setInput(code);
  }, [code]);

  const lineCount = input.split("\n").length;
  const lineDigits = lineCount.toString().length;

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <>
      <div
        onClick={() => onDone(input)}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out"
      />
      <div
        id="code-preview"
        style={{
          position: "relative",
          background: getColor(theme, "editor.background"),
          minWidth: "40ch",
          maxWidth: "80ch",
          // overflow: "auto",
          maxHeight: "80vh",
        }}
        className="z-50"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `#code-preview ::selection { background-color: ${getColor(
              theme,
              "editor.selectionBackground"
            )}; color: transparent; }`,
          }}
        />
        <button
          style={{
            position: "absolute",
            top: -24,
            right: 0,
            color: getColor(theme, "icon.foreground"),
          }}
          className="z-50 mr-2"
          onClick={() => onDone(input)}
        >
          <CheckIcon
            className=" opacity-80 hover:opacity-100 w-5 h-5"
            title="Edit Code"
          />
        </button>
        <textarea
          ref={ref}
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
            background: "transparent",
            resize: "none",
            height: "100%",
            fontSize: 16,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            paddingLeft: `calc(${lineDigits + 1.5 + "ch"} + 0.5rem)`,
            boxSizing: "border-box",
          }}
        />
        <pre
          aria-hidden={true}
          style={{
            ...commonStyle,
            zIndex: 1,
            hyphens: "none",
            pointerEvents: "none",
            position: "relative",
            // display: "none",
          }}
        >
          <Lines code={input} lang={lang} theme={theme} />
        </pre>
      </div>
    </>
  );
}

function Lines({ code, lang, theme }) {
  const [lines, setLines] = React.useState(() =>
    code.split("\n").map((l) => [{ content: l, style: {} }])
  );
  React.useEffect(() => {
    highlight(code, lang, theme).promise.then(({ lines }) => {
      setLines(lines);
    });
  }, [code, lang, theme]);
  const lineCount = lines.length;
  const lineDigits = lineCount.toString().length;
  const lineNumberColor = getColor(theme, "editorLineNumber.foreground");
  return (
    <code style={{ fontSize: 16, lineHeight: "24px" }}>
      {lines.map((tokens, i) => (
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
          {tokens.map((token, i) => (
            <span style={token.style} key={i}>
              {token.content}
            </span>
          ))}
          <br />
        </div>
      ))}
    </code>
  );
}

function CodePreview({ lines, theme, code }) {
  const currentLines =
    lines || code.split("\n").map((l) => [{ content: l, style: {} }]);
  const lineCount = currentLines.length;
  const lineDigits = lineCount.toString().length;
  const lineNumberColor = getColor(theme, "editorLineNumber.foreground");
  return (
    <div
      id="code-preview"
      style={{
        background: getColor(theme, "editor.background"),
        minWidth: "40ch",
        maxWidth: "80ch",
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
    </div>
  );
}
