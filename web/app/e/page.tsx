import App from "./app";
import { getLangOptions } from "./languages";
import { StoreProvider } from "./store-provider";
import darkPlus from "../../themes/dark-plus.json";
import { highlight } from "@code-hike/lighter";
import codes from "./codes";

export default async function Page() {
  const initialLang = "javascript";
  const code = "console.log('hello world')";
  const initialTheme = darkPlus;

  const result = await highlight(code, initialLang, initialTheme);

  return (
    <StoreProvider
      initialState={{
        selectedLangName: initialLang,
        langOptions,
        result: result,
        rawTheme: initialTheme,
        codes,
        editing: false,
      }}
    >
      <App initialState={{ selectedThemeName: "dark-plus", builtInThemes }} />
    </StoreProvider>
  );
}

const langOptions = getLangOptions();

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
