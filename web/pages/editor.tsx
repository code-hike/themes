import { Preview } from "@/components/preview";
import { ThemeForm } from "@/components/theme-form";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import Head from "next/head";
import { Inter as FontSans } from "@next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function Page() {
  return (
    <div className="flex h-full fixed w-full">
      <Head>
        <title>Theme Editor | Code Hike</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --font-sans: ${fontSans.style.fontFamily}; }`,
          }}
        />
      </Head>

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
