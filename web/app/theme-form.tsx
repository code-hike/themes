"use client";

import dracula from "../themes/dracula.json";
import minLight from "../themes/min-light.json";
import monokai from "../themes/monokai.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  setCode,
  setLang,
  setTheme,
  useCode,
  useLang,
  useTheme,
} from "./store";
import { fixTheme } from "./theme-utils";
import { ExportDialog } from "./export-dialog";

const themes = [monokai, dracula, minLight];

export function ThemeForm() {
  const [themeName, setThemeName] = useState("my-theme");
  const [baseThemeName, setBaseThemeName] = useState("dracula");

  const code = useCode();
  const lang = useLang();

  function changeBaseTheme(name: string) {
    const theme = themes.find((t) => t.name === name);
    setBaseThemeName(theme.name);

    const fixedTheme = fixTheme(theme);

    setTheme(fixedTheme);
  }

  useEffect(() => {
    changeBaseTheme(baseThemeName);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Label htmlFor="theme-name" className="mb-2 block">
          Theme Name
        </Label>
        <Input
          id="theme-name"
          value={themeName}
          onChange={(e) => {
            setThemeName(e.target.value);
          }}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="theme-base" className="mb-2 block">
          Base Theme
        </Label>
        <Select
          value={baseThemeName}
          onValueChange={(e) => {
            changeBaseTheme(e);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {themes.map((theme) => (
                <SelectItem key={theme.name} value={theme.name}>
                  <SelectLabel>{theme.name}</SelectLabel>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="mb-4" />
      <div className="mb-4">
        <Label htmlFor="preview-lang" className="mb-2 block">
          Preview Language
        </Label>
        <Input
          id="preview-lang"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="preview-code" className="mb-2 block">
          Preview Code
        </Label>
        <Textarea
          id="preview-code"
          className="mono"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <Separator className="mb-4" />
      <ExportDialog />
    </div>
  );
}
