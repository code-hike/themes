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

  return (
    <main className="p-12">
      <LanguagePicker
        langs={langs}
        selected={selected}
        onSelected={(option) => pickLang(option.name)}
      />
      <BaseThemePicker
        onBaseChange={setTheme}
        sponsor="sponsor"
        initialState={{
          themes: initialState.builtInThemes,
          themeName: initialState.selectedThemeName,
          theme: rawTheme,
        }}
      />
      <CodeCanvas />
    </main>
  );
}

function CodeCanvas() {
  const result = useSelector((state) => state.result);
  const theme = useSelector((state) => fixTheme(state.rawTheme));
  const editing = useSelector((state) => state.editing);
  const setEditing = useSelector((state) => state.setEditing);
  const lang = useSelector((state) => state.selectedLangName);
  const setSelection = (e) => console.log(e);
  return (
    <div className="rounded overflow-hidden z-10">
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
          code="hey"
          lang={lang}
          theme={theme}
          onDone={(code) => {
            setEditing(false);
            console.log(code);
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
