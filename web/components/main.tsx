import { Preview } from "./preview";
import { setCode, setLang } from "./store";

import { LanguagePicker } from "./language-picker";
import { snippets } from "./snippets";

export function Main() {
  return (
    <main
      style={{ tabSize: 2 }}
      className="flex items-center h-full w-full justify-center mono flex-1 flex-col gap-4"
    >
      <LanguagePicker
        id="preview-lang"
        onChange={(e) => {
          setLang(e);
          setCode(snippets[e] || "lorem ipsum");
        }}
      />
      <Preview />
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
    </main>
  );
}
