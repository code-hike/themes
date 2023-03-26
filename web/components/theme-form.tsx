"use client";

import { Separator } from "@/components/ui/separator";
import { setTheme, useCode, useLang, useTheme } from "./store";
import { ExportDialog } from "./export-dialog";

import { BaseThemePicker } from "./theme-form.base";
import { fixTheme } from "./theme-utils";

export function ThemeForm() {
  const code = useCode();
  const lang = useLang();

  return (
    <div className="flex flex-col h-full">
      <BaseThemePicker onBaseChange={(theme) => setTheme(fixTheme(theme))} />
      <Separator className="mb-4" />

      <ExportDialog />
    </div>
  );
}
