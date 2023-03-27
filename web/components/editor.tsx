"use client";

import {
  setSelection,
  setTheme,
  useResult,
  useSelection,
  useTheme,
} from "./store";
import { Cross2Icon, StrikethroughIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { getBestMatchRule } from "./theme-matcher";
import Sketch from "@uiw/react-color-sketch";
import { getPalette } from "./theme-utils";
import { Toggle } from "@/components/ui/toggle";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExportDialog } from "./export-dialog";
import { BaseThemePicker } from "./theme-form.base";
import { fixTheme } from "./theme-utils";

export function Editor({ sponsor }) {
  const selection = useSelection() || {
    type: "color",
    key: "editor.background",
  };
  const result = useResult();
  const theme = useTheme();

  return (
    <div>
      <BaseThemePicker
        onBaseChange={(theme) => setTheme(fixTheme(theme))}
        sponsor={sponsor}
      />

      <Separator className="mb-4 mt-4" />
      {!theme ? null : selection.type === "token" ? (
        <TokenEditor
          token={selection}
          result={result}
          key={selection.scopes.toString() + selection.content}
        />
      ) : (
        <ColorsEditor colorKey={selection.key} key={selection.key} />
      )}
      <Separator className="mb-4 mt-4" />
      <div className="px-2">
        <ExportDialog />
      </div>
    </div>
  );
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
];
function ColorsEditor({ colorKey }) {
  const theme = useTheme();
  const color = theme.colors[colorKey];
  const palette = useMemo(() => getPalette(theme), []);

  function editTheme(color) {
    startTransition(() => {
      setTheme({
        ...theme,
        colors: {
          ...theme.colors,
          [colorKey]: color,
        },
      });
    });
  }
  return (
    <div className="px-2">
      <Label className="mb-4 block">Theme Colors</Label>
      <Select
        value={colorKey}
        onValueChange={(e) => {
          setSelection({ type: "color", key: e });
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
          editTheme(color.hexa);
        }}
      />
    </div>
  );
}

function TokenEditor({ token, result }) {
  const [color, setColor] = useState(token.style.color);
  const [fontStyle, setFontStyle] = useState(token.style.fontStyle || "normal");
  const { colors } = result;

  const theme = useTheme() as any;
  const palette = useMemo(() => getPalette(theme), []);

  function editTheme(color, fontStyle) {
    const matchedRule = getBestMatchRule(theme, token.scopes.slice().reverse());

    const ruleIndex = theme.tokenColors.findIndex(
      (r) => r.name === matchedRule.name && r.scope === matchedRule.scope
    );
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
    ];
    startTransition(() => {
      setTheme({
        ...theme,
        tokenColors: newTokenColors,
      });
    });
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
        <span style={{ color, fontStyle }}>{token.content}</span>
      </pre>
      {/* <Label className="mb-2 block">Edit Rule</Label> */}
      <div className="mb-4">
        <Sketch
          className="scheme-light text-black mx-auto mb-2"
          color={color}
          presetColors={palette}
          onChange={(color) => {
            editTheme(color.hexa, fontStyle);
            setColor(color.hexa);
          }}
        />
        <FontEditor
          value={fontStyle}
          onChange={(fontStyle) => {
            editTheme(color, fontStyle);
            setFontStyle(fontStyle);
          }}
        />
      </div>
      {/* <Button className="w-full" onClick={() => editTheme(color, fontStyle)}>
        Apply
      </Button> */}
    </div>
  );
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
              acc[style] = true;
              return acc;
            }, {})
        : {},
    [value]
  );

  const update = (newStyle) => {
    const newStyleString = Object.keys(newStyle)
      .filter((style) => newStyle[style])
      .join(" ");
    onChange(newStyleString || undefined);
  };

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
  );
}
