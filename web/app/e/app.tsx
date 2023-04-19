"use client";

import { LanguagePicker } from "./language-picker";
import React, { useEffect } from "react";
import { BaseThemePicker } from "./theme-form.base";
import { useSelector } from "./store-provider";
import { fixTheme } from "@/components/theme-utils";
import { getColor } from "@/components/theme-colors";
import { CodeBar } from "./code-bar";
import { CodePreview } from "./code-preview";
import { CodeEditor } from "./code-editor";
import { Separator } from "@/components/ui/separator";
import { ThemeColorsEditor } from "./theme-colors-editor";

export default function App({
  initialState,
}: {
  initialState: { builtInThemes: string[]; selectedThemeName: string };
}) {
  const langs = useSelector((state) => state.langOptions);
  const selected = useSelector(
    (state) => state.langOptions.find((l) => l.name === state.selectedLangName)!
  );
  const pickLang = useSelector((state) => state.pickLang);
  const setTheme = useSelector((state) => state.setTheme);
  const rawTheme = useSelector((state) => state.rawTheme);

  useEffect(() => {
    pickLang(selected.name);
  }, []);

  const selection = useSelector(
    (state) => state.selection || { type: "color", key: "editor.background" }
  );
  const setSelection = useSelector((state) => state.setSelection);

  return (
    <div className="flex h-full fixed w-full">
      <main
        style={{ tabSize: 2 }}
        className="flex items-center h-full w-full justify-center mono flex-1 flex-col gap-4"
      >
        <Footer />
        <LanguagePicker
          langs={langs}
          selected={selected}
          onSelected={(option) => pickLang(option.name)}
        />
        <CodeCanvas />
      </main>
      <div className="bg-slate-900 h-full py-4 w-80 right-0">
        <BaseThemePicker
          onBaseChange={setTheme}
          sponsor="sponsor"
          initialState={{
            themes: initialState.builtInThemes,
            themeName: initialState.selectedThemeName,
            theme: rawTheme,
          }}
        />
        <Separator className="mb-4 mt-4" />
        {selection?.type === "color" && (
          <ThemeColorsEditor
            colorKey={selection.key}
            theme={rawTheme}
            setTheme={setTheme}
            setSelection={setSelection}
          />
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-sm text-slate-300 absolute bottom-12">
      By{" "}
      <a
        href="https://codehike.org/"
        className="text-slate-100 hover:text-white"
      >
        Code Hike
      </a>
      . Go to the{" "}
      <a
        href="https://github.com/code-hike/themes"
        className="text-slate-100 hover:text-white"
      >
        GitHub repo
      </a>{" "}
      for issues or feedback.
    </footer>
  );
}

function CodeCanvas() {
  const result = useSelector((state) => state.result);
  const theme = useSelector((state) => fixTheme(state.rawTheme));
  const editing = useSelector((state) => state.editing);
  const setEditing = useSelector((state) => state.setEditing);
  const lang = useSelector((state) => state.selectedLangName);
  const code = useSelector((state) => state.codes[state.selectedLangName]);
  const updateCode = useSelector((state) => state.updateCode);
  const setSelection = useSelector((state) => state.setSelection);
  return (
    <div
      className="rounded overflow-hidden z-10 "
      style={{
        minWidth: "40ch",
        maxWidth: "80ch",
      }}
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
            updateCode(code);
          }}
        />
      ) : (
        <CodePreview
          lines={result.lines}
          theme={theme}
          setSelection={setSelection}
        />
      )}
    </div>
  );
}
