import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BuiltInThemePicker } from "./theme-form.builtin";
import { MarketplacePicker } from "./theme-form.vscode";

function SponsorMessage() {
  return (
    <div className="px-1 pb-4text-sm">
      <p>
        Become a Code Hike sponsor for $19 a month to load more themes:
        <ul>
          <li>22 built-in themes</li>
          <li>Any theme from VS Code marketplace</li>
          <li>Your custom theme</li>
        </ul>
      </p>
      <p>If you are a sponsor: Log in with GitHub</p>
    </div>
  );
}

function SponsorsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-0 h-6 inline-block">
          <Info className="h-4 inline-block text-slate-400" />
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <p>
              Become a{" "}
              <a
                href="https://github.com/sponsors/code-hike/"
                className="underline"
              >
                Code Hike sponsor
              </a>{" "}
              for $19 a month to load more themes:
              <ul className="list-disc list-inside">
                <li>22 built-in themes</li>
                <li>Any theme from VS Code</li>
                <li>Your custom theme</li>
              </ul>
            </p>
            <Button variant="outline">Sponsor Code Hike</Button>
            <p>
              If you are a sponsor:
              <Button variant="outline">Log in with GitHub</Button>
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function BaseThemePicker({ onBaseChange }) {
  const [selectedTab, setSelectedTab] = useState("builtin");
  return (
    <div className="mb-4">
      <Label htmlFor="theme-base" className="mb-2 block">
        Base Theme{" "}
        <span className="text-slate-400">
          (Sponsors only
          <SponsorsPopover />)
        </span>
      </Label>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
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

function CustomThemePicker({ onBaseChange }) {
  const [customTheme, setCustomTheme] = useState("");

  return (
    <div>
      <Textarea
        className="mb-4"
        rows={8}
        disabled
        value={customTheme}
        onChange={(e) => setCustomTheme(e.target.value)}
        placeholder="Paste your theme JSON here"
      />
      <Button
        variant="outline"
        className="w-full"
        disabled
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
