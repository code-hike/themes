"use client"

import { BaseThemePicker } from "@/components/theme-picker"

import { useSelector } from "./store-provider"

export function SideColumn({ themes, initialThemeName }) {
  const rawTheme = useSelector((state) => state.rawTheme)
  const setTheme = useSelector((state) => state.setTheme)
  return (
    <>
      <BaseThemePicker
        onBaseChange={setTheme}
        sponsor="sponsor"
        initialState={{
          themes,
          themeName: initialThemeName,
          theme: rawTheme,
        }}
      />
    </>
  )
}
