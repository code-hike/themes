import Link from "next/link";

export default function Page() {
  return (
    <div>
      nothing here, go to{" "}
      <Link href="/editor" className="underline text-blue-300">
        editor
      </Link>
    </div>
  );
}
