import { LANG_NAMES } from "@code-hike/lighter"

export type LangOption = {
  name: string
  status: "empty" | "loading" | "loaded"
  used?: boolean
  popular?: boolean
}

export function getLangOptions(): LangOption[] {
  const options: LangOption[] = []
  for (const lang of popular) {
    options.push({ name: lang, status: "empty", popular: true })
  }
  for (const lang of aliases) {
    if (popular.includes(lang)) continue
    options.push({ name: lang, status: "empty" })
  }
  return options
}

const popular = [
  "javascript",
  "html",
  "css",
  "python",
  "java",
  "cpp",
  "csharp",
  "go",
  "rust",
  "typescript",
]

export const aliases = LANG_NAMES
