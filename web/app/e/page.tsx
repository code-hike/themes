import App from "./app";
import { getLangOptions } from "./languages";
import { StoreProvider } from "./store-provider";
import darkPlus from "../../themes/dark-plus.json";
import { highlight } from "@code-hike/lighter";

export default async function Page() {
  const initialLang = "javascript";
  const code = "console.log('hello world')";
  const initialTheme = darkPlus;

  const result = await highlight(code, initialLang, initialTheme);

  return (
    <StoreProvider
      initialState={{
        selectedLangName: initialLang,
        langOptions: getLangOptions(),
        result: result,
        rawTheme: initialTheme,
      }}
    >
      <App initialState={{ selectedThemeName: "dark-plus", builtInThemes }} />
    </StoreProvider>
  );
}

const builtInThemes = [
  "dark-plus",
  "dracula-soft",
  "dracula",
  "github-dark",
  "github-dark-dimmed",
  "github-light",
  "light-plus",
  "material-darker",
  "material-default",
  "material-lighter",
  "material-ocean",
  "material-palenight",
  "min-dark",
  "min-light",
  "monokai",
  "nord",
  "one-dark-pro",
  "poimandres",
  "slack-dark",
  "slack-ochin",
  "solarized-dark",
  "solarized-light",
];
