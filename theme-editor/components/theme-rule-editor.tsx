import { startTransition, useMemo, useState } from "react"
import {
  Cross2Icon,
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons"
import Sketch from "@uiw/react-color-sketch"

import { getBestMatchRule } from "@/lib/theme-matcher"
import { getPalette } from "@/lib/theme-utils"

import { Label } from "./ui/label"
import { Toggle } from "./ui/toggle"

export function ThemeRuleEditor({
  token,
  result,
  theme,
  setTheme,
  setSelection,
}) {
  const [color, setColor] = useState(token.style.color)
  const [fontStyle, setFontStyle] = useState(token.style.fontStyle || "normal")
  const { colors } = result

  const palette = useMemo(() => getPalette(theme), [])

  function editTheme(color, fontStyle) {
    const matchedRule = getBestMatchRule(theme, token.scopes.slice().reverse())

    const ruleIndex = theme.tokenColors.findIndex(
      (r) => r.name === matchedRule.name && r.scope === matchedRule.scope
    )
    const newTokenColors = [
      ...theme.tokenColors.slice(0, ruleIndex),
      {
        name: matchedRule.name,
        scope: matchedRule.scope,
        settings: {
          foreground: color,
          fontStyle,
        },
      },
      ...theme.tokenColors.slice(ruleIndex + 1),
    ]
    startTransition(() => {
      setTheme({
        ...theme,
        tokenColors: newTokenColors,
      })
    })
  }

  return (
    <div className="relative px-2">
      <div className="absolute" style={{ top: -8, right: 8 }}>
        <button
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-full p-1"
          onClick={() => setSelection(null)}
        >
          <Cross2Icon height="1.1em" width="1.1em" />
        </button>
      </div>
      <Label className="mb-4 block">Selected Token</Label>

      <pre
        className="mb-4 text-center relative flex h-10 w-full items-center justify-center rounded-md border border-slate-300 py-2 px-3 dark:border-slate-700"
        style={{ background: colors.background }}
      >
        <span
          style={{ color, fontStyle }}
          className="truncate overflow-ellipsis"
        >
          {token.content}
        </span>
      </pre>
      {/* <Label className="mb-2 block">Edit Rule</Label> */}
      <div className="mb-4">
        <Sketch
          className="scheme-light text-black mx-auto mb-2"
          color={color}
          presetColors={palette}
          onChange={(color) => {
            editTheme(color.hexa, fontStyle)
            setColor(color.hexa)
          }}
        />
        <FontEditor
          value={fontStyle}
          onChange={(fontStyle) => {
            editTheme(color, fontStyle)
            setFontStyle(fontStyle)
          }}
        />
      </div>
      {/* <Button className="w-full" onClick={() => editTheme(color, fontStyle)}>
        Apply
      </Button> */}
    </div>
  )
}

function FontEditor({ value, onChange }) {
  // turn "bold italic" into { bold: true, italic: true } and undefined into {}
  const style = useMemo(
    () =>
      value
        ? value
            .toLowerCase()
            .split(" ")
            .reduce((acc, style) => {
              acc[style] = true
              return acc
            }, {})
        : {},
    [value]
  )

  const update = (newStyle) => {
    const newStyleString = Object.keys(newStyle)
      .filter((style) => newStyle[style])
      .join(" ")
    onChange(newStyleString || undefined)
  }

  return (
    <div className="flex gap-1 justify-center">
      <Toggle
        aria-label="Toggle bold"
        pressed={!!style.bold}
        onPressedChange={(pressed) => update({ ...style, bold: pressed })}
      >
        <FontBoldIcon className="h-6 w-6" />
      </Toggle>
      <Toggle
        aria-label="Toggle italic"
        pressed={!!style.italic}
        onPressedChange={(pressed) => update({ ...style, italic: pressed })}
      >
        <FontItalicIcon className="h-6 w-6" />
      </Toggle>
      <Toggle
        aria-label="Toggle underline"
        pressed={!!style.underline}
        onPressedChange={(pressed) =>
          update({
            ...style,
            underline: pressed,
            strikethrough: pressed ? false : style.strikethrough,
          })
        }
      >
        <UnderlineIcon className="h-6 w-6" />
      </Toggle>
      <Toggle
        aria-label="Toggle strikethrough"
        pressed={!!style.strikethrough}
        onPressedChange={(pressed) =>
          update({
            ...style,
            strikethrough: pressed,
            underline: pressed ? false : style.underline,
          })
        }
      >
        <StrikethroughIcon className="h-6 w-6" />
      </Toggle>
    </div>
  )
}
