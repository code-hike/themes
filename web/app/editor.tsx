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

export function Editor() {
  const selection = useSelection();
  const result = useResult();
  const colors = result.colors;

  return selection ? (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <button
          className="bg-slate-700 hover:bg-slate-600 text-white rounded-full p-1"
          onClick={() => setSelection(null)}
        >
          <Cross2Icon height="1.1em" width="1.1em" />
        </button>
      </div>
      <div className="h-4" />
      <TokenEditor
        token={selection}
        result={result}
        key={selection.scopes.toString() + selection.content}
      />

      {/* <div className="">
        Scopes:
        <ul>
          {selection.scopes.map((scope) => (
            <li key={scope}>{scope}</li>
          ))}
        </ul>
      </div> */}
    </div>
  ) : (
    <div>empty</div>
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
    <>
      <Label className="mb-2 block">Selected Token</Label>
      <pre
        className="mb-4 px-2 text-center"
        style={{ background: colors.background }}
      >
        <span style={{ color, fontStyle }}>{token.content}</span>
      </pre>

      <Separator className="mb-4" />

      {/* <Label className="mb-2 block">Edit Rule</Label> */}
      <div className="mb-4">
        <Sketch
          className="scheme-light text-black mx-auto mb-2"
          color={color}
          presetColors={palette}
          onChange={(color) => {
            editTheme(color, fontStyle);
            setColor(color);
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
    </>
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
