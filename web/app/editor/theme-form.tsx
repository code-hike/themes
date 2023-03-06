"use client";

import dracula from "../../themes/dracula.json";
import minLight from "../../themes/min-light.json";
import monokai from "../../themes/monokai.json";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const themes = [dracula];

const builtInThemes = [
  "dark-plus",
  "dracula-soft",
  "dracula",
  "github-dark",
  "github-dark-dimmed",
  "github-light",
  "light-plus",
  "material-darker",
  "material-default",
  "material-lighter",
  "material-ocean",
  "material-palenight",
  "min-dark",
  "min-light",
  "monokai",
  "nord",
  "one-dark-pro",
  "poimandres",
  "slack-dark",
  "slack-ochin",
  "solarized-dark",
  "solarized-light",
];

export function ThemeForm() {
  const code = useCode();
  const lang = useLang();

  return (
    <div className="flex flex-col h-full">
      <BaseThemePicker />
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
          rows={7}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <Separator className="mb-4" />
      <ExportDialog />
    </div>
  );
}

function BaseThemePicker() {
  return (
    <div className="mb-4">
      <Label htmlFor="theme-base" className="mb-2 block">
        Base Theme
      </Label>
      <Tabs defaultValue="builtin">
        <TabsList>
          <TabsTrigger value="builtin">Built In</TabsTrigger>
          <TabsTrigger value="vscode">VS Code</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        <TabsContent value="builtin">
          <BuiltInThemePicker />
        </TabsContent>
        <TabsContent value="vscode"></TabsContent>
        <TabsContent value="custom">
          <CustomThemePicker />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CustomThemePicker() {
  const [customTheme, setCustomTheme] = useState("");

  return (
    <div>
      <Textarea
        className="mb-4"
        rows={8}
        value={customTheme}
        onChange={(e) => setCustomTheme(e.target.value)}
      />
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          try {
            const theme = JSON.parse(customTheme);
            setTheme(fixTheme(theme));
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Load JSON
      </Button>
    </div>
  );
}

function BuiltInThemePicker() {
  const [baseThemeName, setBaseThemeName] = useState("dracula");
  function changeBaseTheme(name: string) {
    const theme = themes.find((t) => t.name === name);
    setBaseThemeName(theme.name);

    const fixedTheme = fixTheme(theme);

    setTheme(fixedTheme);
  }

  function fetchBaseTheme(name: string) {
    fetch(`https://lighter.codehike.org/api/theme?name=${name}&v=0.5.1`)
      .then((res) => res.json())
      .then((theme) => {
        const fixedTheme = fixTheme(theme);

        setTheme(fixedTheme);
      });
  }
  useEffect(() => {
    changeBaseTheme(baseThemeName);
  }, []);
  return (
    <Select
      value={baseThemeName}
      onValueChange={(e) => {
        setBaseThemeName(e);
        fetchBaseTheme(e);
      }}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {builtInThemes.map((themeName) => (
            <SelectItem key={themeName} value={themeName}>
              <SelectLabel>{themeName}</SelectLabel>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
