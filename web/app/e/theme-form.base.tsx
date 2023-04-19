import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

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

export function BaseThemePicker({ onBaseChange, sponsor, initialState }) {
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
        <BuiltInThemePicker
          onThemeChange={onBaseChange}
          initialState={{ isSponsor, ...initialState }}
        />
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
