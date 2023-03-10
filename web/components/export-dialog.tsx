import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "./store";
import { useMemo, useState } from "react";

export function ExportDialog() {
  const theme = useTheme();
  const [format, setFormat] = useState<string>("js");
  const output = useOutput(theme, format);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          Export...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Theme</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup
            value={format}
            className="justify-around"
            onValueChange={(e) => setFormat(e)}
          >
            <div className="flex items-center space-x-2 w-16">
              <RadioGroupItem value="js" id="r1" />
              <Label htmlFor="r1">JS</Label>
            </div>
            <div className="flex items-center space-x-2 w-16">
              <RadioGroupItem value="json" id="r2" />
              <Label htmlFor="r2">JSON</Label>
            </div>
            <div className="flex items-center space-x-2 w-16">
              <RadioGroupItem value="esm" id="r3" />
              <Label htmlFor="r3">ESM</Label>
            </div>
            <div className="flex items-center space-x-2 w-16">
              <RadioGroupItem value="cjs" id="r4" />
              <Label htmlFor="r4">CJS</Label>
            </div>
          </RadioGroup>
          <Textarea value={output} readOnly rows={10} />
        </div>

        <DialogFooter>
          <Button onClick={() => copyToClipboard(output)}>Copy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function useOutput(theme: any, format: string) {
  return useMemo(() => {
    const themeString = JSON.stringify(theme, null, 2);
    switch (format) {
      case "js":
        return `const myTheme = ${themeString};`;
      case "json":
        return themeString;
      case "esm":
        return `export default ${themeString};`;
      case "cjs":
        return `module.exports = ${themeString};`;
    }
  }, [format, theme]);
}

function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}
