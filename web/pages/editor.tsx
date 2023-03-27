import { Editor } from "@/components/editor";
import Head from "next/head";
import { Inter as FontSans } from "@next/font/google";
import { Main } from "@/components/main";
import { getSponsor } from "@/lib/get-sponsor";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const getServerSideProps = getSponsor;

export default function Page({ sponsor }) {
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

      <Main />
      <RightColumn sponsor={sponsor} />
    </div>
  );
}

function RightColumn({ sponsor }) {
  return (
    <div className={" bg-slate-900 h-full py-4 w-80 right-0"}>
      <Editor sponsor={sponsor} />
    </div>
  );
}
