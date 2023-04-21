import { Code } from "bright"

import theme from "./theme"

const code = `
// to edit the code click the pencil icon ☝️
// click anywhere else to edit the colors
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}

function consectetur(...adipiscing) {
  const elit = adipiscing[0];
  return sed.eiusmod(elit) ? elit : [elit];
}
`.trim()

Code.theme = theme

export default function Page() {
  return (
    <main className="p-32">
      Test
      <Code lang="js">{code}</Code>
    </main>
  )
}
export const dynamic = "force-static"
