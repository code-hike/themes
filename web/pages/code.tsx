import React from "react";
import darkPlus from "@/themes/dark-plus.json";
import { fixTheme } from "@/components/theme-utils";
import { CodeArea } from "@/components/code";

export default function Page() {
  return (
    <CodeArea code="const a = 1" lang="javascript" theme={fixTheme(darkPlus)} />
  );
}
