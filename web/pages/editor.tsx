import { ThemeForm } from "@/components/theme-form";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import Head from "next/head";
import { Inter as FontSans } from "@next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { Main } from "@/components/main";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      props: { sponsor: "unknown" },
    };
  }

  const sponsorsResponse = await fetch(
    "https://raw.githubusercontent.com/pomber/code-hike-site/main/data/sponsors.json"
  );
  const sponsorsData = await sponsorsResponse.json();

  const { user, orgs } = session;
  const login = user.name;
  const allAccess = [...sponsorsData.sponsors, ...sponsorsData.access];

  let isSponsor = false;
  if (allAccess.some((s) => s.login === login)) {
    isSponsor = true;
  }

  // org has access
  const userOrgs = orgs || [];
  if (allAccess.some((s) => s.isOrg && userOrgs.includes(s.login))) {
    isSponsor = true;
  }

  return {
    props: {
      sponsor: isSponsor ? "sponsor" : "not-sponsor",
    },
  };
}

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
      <RightColumn />
    </div>
  );
}

const columnClasses = "bg-slate-900 h-full px-2 py-4";

function RightColumn() {
  return (
    <div className={cn(columnClasses, "w-80 right-0")}>
      <Editor />
    </div>
  );
}
