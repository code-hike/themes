"use client";

import { LanguagePicker } from "./language-picker";
import React, { useEffect } from "react";
import { BaseThemePicker } from "./theme-form.base";
import { useSelector } from "./store-provider";

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
  const result = useSelector((state) => state.result);

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
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  );
}
