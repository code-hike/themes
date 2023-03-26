import { Preview } from "./preview";
import { setCode, setLang } from "./store";

import { LanguagePicker } from "./language-picker";
import { snippets } from "./snippets";

export function Main() {
  return (
    <main className="flex items-center h-full w-full justify-center mono flex-1 flex-col gap-4">
      <LanguagePicker
        id="preview-lang"
        onChange={(e) => {
          setLang(e);
          setCode(snippets[e] || "lorem ipsum");
        }}
      />
      <Preview />
    </main>
  );
}
