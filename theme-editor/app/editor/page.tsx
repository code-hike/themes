import Link from "next/link"
import { highlight } from "@code-hike/lighter"

import codes from "@/lib/codes"
import darkPlus from "@/lib/dark-plus.json"
import { getLangOptions } from "@/lib/langs"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { Main } from "./main"
import { SideColumn } from "./side-column"
import { StoreProvider } from "./store-provider"

const initialLang = "javascript"
const initialTheme = darkPlus

export default async function Page() {
  const result = await highlight(
    codes[initialLang],
    initialLang,
    initialTheme,
    { scopes: true }
  )
  const initialState = {
    selectedLangName: initialLang,
    langOptions: getLangOptions(),
    result: result,
    rawTheme: initialTheme,
    codes,
    editing: false,
  }
  return (
    <StoreProvider initialState={initialState}>
      <div className="flex h-full fixed w-full">
        <main
          style={{ tabSize: 2 }}
          className="flex items-center h-full w-full justify-center mono flex-1 flex-col gap-4"
        >
          <Main />
          <Footer />
        </main>

        <div className="h-full py-4 w-80 right-0 border-l">
          <SideColumn themes={builtInThemes} initialThemeName={"dark-plus"} />
        </div>
      </div>
    </StoreProvider>
  )
}

function Footer() {
  return (
    <footer className="text-sm absolute bottom-6">
      <Link
        href="https://github.com/code-hike/themes"
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
          <Icons.gitHub className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </div>
      </Link>
      <Link
        href="https://twitter.com/codehike_"
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
          <Icons.twitter className="h-5 w-5 fill-current" />
          <span className="sr-only">Twitter</span>
        </div>
      </Link>
      <Link
        href="https://discord.gg/DnpTjcRTgG"
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
          <Icons.discord className="h-5 w-5 fill-current" />
          <span className="sr-only">Discord</span>
        </div>
      </Link>
    </footer>
  )
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
]
