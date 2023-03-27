import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { getSponsor } from "@/lib/get-sponsor";

export const getServerSideProps = getSponsor;

export default function Page({ sponsor }) {
  return (
    <div className="p-12">
      nothing here, go to{" "}
      <Link href="/editor" className="underline text-blue-300">
        editor
      </Link>
      <pre>{JSON.stringify(sponsor)}</pre>
      <br />
      <button
        onClick={() => signIn("github", { redirect: false })}
        className="underline text-blue-300"
      >
        Log in
      </button>
      <br />
      <button onClick={() => signOut()} className="underline text-blue-300">
        Log out
      </button>
    </div>
  );
}
