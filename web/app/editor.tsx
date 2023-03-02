"use client";

import {
  setSelection,
  setTheme,
  useResult,
  useSelection,
  useTheme,
} from "./store";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { getBestMatchRule } from "./theme-matcher";

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
        key={selection.scopes.toString()}
      />

      <div className="">
        Scopes:
        <ul>
          {selection.scopes.map((scope) => (
            <li key={scope}>{scope}</li>
          ))}
        </ul>
      </div>
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

  function update(color) {
    editTheme(color, fontStyle);
    setColor(color);
  }

  return (
    <>
      <Label className="mb-2 block">Selected Token</Label>
      <pre className="mb-4 px-2" style={{ background: colors.background }}>
        <span style={{ color, fontStyle }}>{token.content}</span>
      </pre>

      <Separator className="mb-4" />

      <Label className="mb-2 block">Change Theme Rule</Label>
      <div className="mb-4">
        Color:{" "}
        <input
          type="color"
          value={color}
          onChange={(e) => update(e.target.value)}
        />{" "}
        <br />
        Font Style: <input type="checkbox" />
      </div>
      <Button className="w-full" onClick={() => editTheme(color, fontStyle)}>
        Apply
      </Button>
    </>
  );
}
