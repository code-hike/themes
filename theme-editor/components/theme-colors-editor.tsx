import { startTransition, useMemo, useRef, useState } from "react"
import Sketch from "@uiw/react-color-sketch"

import { getPalette } from "@/lib/theme-utils"
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

export function ThemeColorsEditor({ colorKey, theme, setTheme, setSelection }) {
  const color = theme.colors[colorKey]
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
      <Sketch
        className="scheme-light text-black mx-auto mb-2"
        color={color}
        presetColors={palette}
        onChange={(color) => {
          editTheme(color.hexa)
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
]
