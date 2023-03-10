"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  setCode,
  setLang,
  setTheme,
  useCode,
  useLang,
  useTheme,
} from "./store";
import { ExportDialog } from "./export-dialog";

import { LanguagePicker } from "./theme-form.languague";
import { snippets } from "./snippets";
import { BaseThemePicker } from "./theme-form.base";
import { fixTheme } from "./theme-utils";

export function ThemeForm() {
  const code = useCode();
  const lang = useLang();

  return (
    <div className="flex flex-col h-full">
      <BaseThemePicker onBaseChange={(theme) => setTheme(fixTheme(theme))} />
      <Separator className="mb-4" />
      <div className="mb-4">
        <Label htmlFor="preview-lang" className="mb-2 block ">
          Preview Language
        </Label>
        <LanguagePicker
          id="preview-lang"
          value={lang}
          onChange={(e) => {
            setLang(e);
            setCode(snippets[e]);
          }}
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
