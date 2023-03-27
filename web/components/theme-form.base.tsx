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
import { SponsorsDialog } from "./sponsors-dialog";

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
      <PopoverContent className="w-80"></PopoverContent>
    </Popover>
  );
}

export function BaseThemePicker({ onBaseChange, sponsor }) {
  const [selectedTab, setSelectedTab] = useState("builtin");
  const isSponsor = sponsor === "sponsor";
  return (
    <div className="mb-4 px-2">
      <Label
        htmlFor="theme-base"
        className="mb-2 flex justify-between items-center"
      >
        Base Theme{" "}
        <span className="text-slate-400">
          <SponsorsDialog />
        </span>
      </Label>
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="builtin">Built In</TabsTrigger>
          <TabsTrigger value="vscode">VS Code</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className={selectedTab != "builtin" ? "hidden" : ""}>
        <BuiltInThemePicker onBaseChange={onBaseChange} isSponsor={isSponsor} />
      </div>
      <div className={selectedTab !== "vscode" ? "hidden" : ""}>
        <MarketplacePicker onBaseChange={onBaseChange} isSponsor={isSponsor} />
      </div>
      <div className={selectedTab !== "custom" ? "hidden" : ""}>
        <CustomThemePicker onBaseChange={onBaseChange} isSponsor={isSponsor} />
      </div>
    </div>
  );
}

function CustomThemePicker({ onBaseChange, isSponsor }) {
  const [customTheme, setCustomTheme] = useState("");

  return (
    <div>
      <Textarea
        className="mb-4"
        rows={8}
        disabled={!isSponsor}
        value={customTheme}
        onChange={(e) => setCustomTheme(e.target.value)}
        placeholder="Paste your theme JSON here"
      />
      <Button
        variant="outline"
        className="w-full"
        disabled={!isSponsor}
        onClick={() => {
          if (!isSponsor) return;
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
