"use client"

import { useEffect } from "react"

import { LanguagePicker } from "@/components/language-picker"

import { CodeCanvas } from "./code-canvas"
import { useSelector } from "./store-provider"

export function Main() {
  const langs = useSelector((state) => state.langOptions)
  const selected = useSelector(
    (state) => state.langOptions.find((l) => l.name === state.selectedLangName)!
  )
  const pickLang = useSelector((state) => state.pickLang)

  useEffect(() => {
    pickLang(selected.name)
  }, [])
  return (
    <>
      <LanguagePicker
        langs={langs}
        selected={selected}
        onSelected={(option) => pickLang(option.name)}
      />
      <CodeCanvas />
    </>
  )
}
