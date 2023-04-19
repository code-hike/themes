// import { parse } from "jsonc-parser/lib/esm/main.js";
import { parse } from "jsonc-parser";
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
import { useEffect, useState } from "react";

import { unzip } from "unzipit";

export function MarketplacePicker({ onBaseChange, isSponsor }) {
  const [url, setUrl] = useState("");
  const [themes, setThemes] = useState<any[]>([]);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  function onUrlChange(newUrl) {
    setUrl(newUrl);
    fetchFromMarketplace(newUrl).then((themes) => {
      setThemes(themes);
      setSelectedTheme(themes[0]);
      if (themes[0]) {
        onBaseChange(themes[0]?.theme);
      }
    });
  }

  return (
    <div>
      <Label htmlFor="marketplace-url" className="mb-2 block">
        Extension URL
      </Label>
      <Input
        id="marketplace-url"
        className="mb-4"
        value={url}
        disabled={!isSponsor}
        onChange={(e) => {
          if (!isSponsor) return;
          onUrlChange(e.target.value);
        }}
        placeholder="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl"
      />
      {themes.length > 0 && (
        <>
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
        </>
      )}
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
