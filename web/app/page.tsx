import { Preview } from "./preview";
import { ThemeForm } from "./theme-form";
import { cn } from "@/lib/utils";
import { Editor } from "./editor";

export default function Page() {
  return (
    <div>
      <Main />
      <LeftColumn />
      <RightColumn />
    </div>
  );
}

function Main() {
  return (
    <main className="fixed flex items-center h-full w-full justify-center mono">
      <div className="bg-slate-900 w-80 h-40">
        <Preview />
      </div>
    </main>
  );
}

const columnClasses = "fixed top-0 bg-slate-900 h-full px-2 py-4";

function LeftColumn() {
  return (
    <div className={cn(columnClasses, "w-60 left-0")}>
      <ThemeForm />
    </div>
  );
}

function RightColumn() {
  return <div className={cn(columnClasses, "w-60 right-0")}><Editor/></div>;
}
