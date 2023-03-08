import { parse } from "jsonc-parser/lib/esm/main.js";
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { unzip } from "unzipit";
import { BuiltInThemePicker } from "./theme-form.builtin";

export function BaseThemePicker({ onBaseChange }) {
  const [selectedTab, setSelectedTab] = useState("builtin");
  return (
    <div className="mb-4">
      <Label htmlFor="theme-base" className="mb-2 block">
        Base Theme
      </Label>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-2">
          <TabsTrigger value="builtin">Built In</TabsTrigger>
          <TabsTrigger value="vscode">VS Code</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className={selectedTab != "builtin" ? "hidden" : ""}>
        <BuiltInThemePicker onBaseChange={onBaseChange} />
      </div>
      <div className={selectedTab !== "vscode" ? "hidden" : ""}>
        <MarketplacePicker onBaseChange={onBaseChange} />
      </div>
      <div className={selectedTab !== "custom" ? "hidden" : ""}>
        <CustomThemePicker onBaseChange={onBaseChange} />
      </div>
    </div>
  );
}

function MarketplacePicker({ onBaseChange }) {
  const [url, setUrl] = useState("");
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  return (
    <div>
      <Label htmlFor="marketplace-url" className="mb-2 block">
        URL
      </Label>
      <Input
        id="marketplace-url"
        className="mb-4"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          fetchFromMarketplace(e.target.value).then((themes) => {
            setThemes(themes);
            setSelectedTheme(themes[0]);
            if (themes[0]) {
              onBaseChange(themes[0]?.theme);
            }
          });
        }}
        placeholder="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl"
      />
      <Label htmlFor="marketplace-theme" className="mb-2 block">
        Themes
      </Label>
      <Select
        value={selectedTheme?.label}
        onValueChange={(e) => {
          const selection = themes.find(({ label }) => label === e);
          setSelectedTheme(selection);
          onBaseChange(selection.theme);
        }}
      >
        <SelectTrigger id="marketplace-theme">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {themes.map(({ label }) => (
              <SelectItem key={label} value={label}>
                <SelectLabel>{label}</SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
async function fetchFromMarketplace(url: string) {
  const itemName = url.split("itemName=")[1];
  const [publisher, extId] = itemName.split(".");
  const downloadUrl =
    `https://${publisher}.gallery.vsassets.io` +
    `/_apis/public/gallery/publisher/${publisher}` +
    `/extension/${extId}/latest` +
    `/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`;

  const { entries } = await unzip(downloadUrl);
  const packagejson = await entries["extension/package.json"].json();

  return await Promise.all(
    packagejson.contributes.themes.map(async ({ label, path }) => {
      const fullPath =
        "extension/" + (path.startsWith("./") ? path.slice(2) : path);
      const themeFile = entries[fullPath];
      const rawTheme = await themeFile.text();
      const errors = [];
      const theme = parse(rawTheme, errors, {
        allowTrailingComma: true,
      });
      return {
        label,
        theme,
      };
    })
  );
}

function CustomThemePicker({ onBaseChange }) {
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
            onBaseChange(theme);
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
