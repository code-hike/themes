import { Preview } from "./preview";
import { ThemeForm } from "./theme-form";
import { cn } from "@/lib/utils";
import { Editor } from "./editor";

export default function Page() {
  return (
    <div className="flex h-full fixed w-full">
      <LeftColumn />
      <Main />
      <RightColumn />
    </div>
  );
}

function Main() {
  return (
    <main className="flex items-center h-full w-full justify-center mono flex-1">
      <Preview />
    </main>
  );
}

const columnClasses = "bg-slate-900 h-full px-2 py-4";

function LeftColumn() {
  return (
    <div className={cn(columnClasses, "w-60 left-0")}>
      <ThemeForm />
    </div>
  );
}

function RightColumn() {
  return (
    <div className={cn(columnClasses, "w-80 right-0")}>
      <Editor />
    </div>
  );
}
