import Link from "next/link"

export default function IndexPage() {
  return (
    <section>
      <Link href="/editor" className="underline">
        Editor
      </Link>
    </section>
  )
}
