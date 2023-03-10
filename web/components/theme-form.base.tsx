import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BuiltInThemePicker } from "./theme-form.builtin";
import { MarketplacePicker } from "./theme-form.vscode";

export function BaseThemePicker({ onBaseChange }) {
  const [selectedTab, setSelectedTab] = useState("builtin");
  return (
    <div className="mb-4">
      <Label htmlFor="theme-base" className="mb-2 block">
        Base Theme
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
        value={customTheme}
        onChange={(e) => setCustomTheme(e.target.value)}
        placeholder="Paste your theme JSON here"
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
