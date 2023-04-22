import { startTransition, useMemo, useRef, useState } from "react"

import { getColor } from "@/lib/theme-colors"
import { fixTheme, getPalette } from "@/lib/theme-utils"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ColorPicker } from "./ui/color-picker"

export function ThemeColorsEditor({ colorKey, theme, setTheme, setSelection }) {
  const color = getColor(fixTheme(theme), colorKey)
  const palette = useMemo(() => getPalette(theme), [])

  function editTheme(color) {
    startTransition(() => {
      setTheme({
        ...theme,
        colors: {
          ...theme.colors,
          [colorKey]: color,
        },
      })
    })
  }
  return (
    <div className="px-2">
      <Label className="mb-4 block">Theme Colors</Label>
      <Select
        value={colorKey}
        onValueChange={(e) => {
          setSelection({ type: "color", key: e })
        }}
      >
        <SelectTrigger className="mb-4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {colorKeys.map((ck) => (
              <SelectItem key={ck} value={ck}>
                <SelectLabel>{ck}</SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ColorPicker
        color={color}
        palette={palette}
        onChange={(hexa) => {
          editTheme(hexa)
        }}
      />
    </div>
  )
}

const colorKeys = [
  "editor.background",
  "editor.foreground",
  "editorLineNumber.foreground",
  "editorGroupHeader.tabsBackground",
  "tab.activeBackground",
  "tab.inactiveBackground",
  "tab.activeForeground",
  "tab.inactiveForeground",
  "tab.border",
  "tab.activeBorder",
  "tab.activeBorderTop",
  "editorGroupHeader.tabsBorder",
  "editor.selectionBackground",
  "editor.infoForeground",
  "editor.rangeHighlightBackground",
]
