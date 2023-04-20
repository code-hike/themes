import { useState } from "react"
import { RawTheme } from "@code-hike/lighter"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"

type ThemeOption = {
  name: string
  status: "empty" | "loading" | "loaded"
  theme: RawTheme | null
}

export function BuiltInThemePicker({
  initialState,
  onThemeChange,
}: {
  initialState: {
    themeName: string
    theme: RawTheme
    themes: string[]
    isSponsor: boolean
  }
  onThemeChange: (theme: RawTheme) => void
}) {
  const [themeOptions, setThemeOptions] = useState<ThemeOption[]>(
    initialState.themes.map((themeName) => ({
      name: themeName,
      status: themeName === initialState.themeName ? "loaded" : "empty",
      theme: themeName === initialState.themeName ? initialState.theme : null,
    }))
  )

  const [selectedTheme, setSelectedTheme] = useState<string>(
    initialState.themeName
  )

  const handleThemeSelection = async (option: ThemeOption) => {
    setSelectedTheme(option.name)

    if (option.status === "empty") {
      const themeIndex = themeOptions.findIndex(
        (theme) => theme.name === option.name
      )
      const updatedThemes = [...themeOptions]
      updatedThemes[themeIndex].status = "loading"
      setThemeOptions(updatedThemes)

      const rawTheme = await fetchTheme(option.name)
      onThemeChange(rawTheme)
      setThemeOptions((prev) => {
        const updated = [...prev]
        updated[themeIndex].status = "loaded"
        updated[themeIndex].theme = rawTheme
        return updated
      })
    } else if (option.status === "loaded") {
      onThemeChange(option.theme!)
    }
  }

  return (
    <UI
      isSponsor={initialState.isSponsor}
      themes={themeOptions}
      selected={selectedTheme}
      onSelect={handleThemeSelection}
    />
  )
}

async function fetchTheme(name: string): Promise<RawTheme> {
  const res = await fetch(`https://lighter.codehike.org/themes/${name}.json`)
  return res.json()
}

function UI({
  isSponsor,
  selected,
  themes,
  onSelect,
}: {
  isSponsor: boolean
  selected: string
  themes: ThemeOption[]
  onSelect: (theme: ThemeOption) => void
}) {
  const selectedOption = themes.find((theme) => theme.name === selected)!

  return (
    <Select
      disabled={!isSponsor}
      value={selected}
      onValueChange={(e) => {
        if (!isSponsor) return
        const option = themes.find((theme) => theme.name === e)!
        onSelect(option)
      }}
    >
      <SelectTrigger icon={selectedOption.status === "loading" && <Spinner />}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themes.map((option) => {
            return (
              <SelectItem
                key={option.name}
                value={option.name}
                icon={option.status === "loading" ? <Spinner /> : null}
              >
                <SelectLabel
                  className={
                    option.status === "loaded" ? "text-white" : "text-gray-400"
                  }
                >
                  {option.name}
                </SelectLabel>
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
