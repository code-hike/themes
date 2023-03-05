import { Code } from "bright";
import myTheme from "./my-theme";

const code = `function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}
function consectetur(...adipiscing) {
  const elit = adipiscing[0];
  return sed.eiusmod(elit) ? elit : [elit];
}`;

export default function Page() {
  return (
    /* @ts-expect-error Server Component */
    <Code lang="js" theme={myTheme}>
      {code}
    </Code>
  );
}
