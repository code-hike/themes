"use client";

import { LanguagePicker } from "./language-picker";
import React, { useEffect } from "react";
import { BaseThemePicker } from "./theme-form.base";
import { useSelector } from "./store-provider";
import { fixTheme } from "@/components/theme-utils";
import { getColor } from "@/components/theme-colors";
import { CodeBar } from "./code-bar";

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
        editing={false}
        setEditing={() => console.log("set editing")}
        setSelection={(e) => console.log("set selection", e)}
      />
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
