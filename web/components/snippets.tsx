export const aliases = [
  "abap",
  "actionscript-3",
  "ada",
  "apache",
  "apex",
  "apl",
  "applescript",
  "asm",
  "astro",
  "awk",
  "ballerina",
  "bat",
  "batch",
  "berry",
  "be",
  "bibtex",
  "bicep",
  "blade",
  "c",
  "cadence",
  "cdc",
  "clarity",
  "clojure",
  "clj",
  "cmake",
  "cobol",
  "codeql",
  "ql",
  "coffee",
  "cpp",
  "crystal",
  "csharp",
  "c#",
  "cs",
  "css",
  "cue",
  "d",
  "dart",
  "diff",
  "docker",
  "dream-maker",
  "elixir",
  "elm",
  "erb",
  "erlang",
  "erl",
  "fish",
  "fsharp",
  "f#",
  "fs",
  "gherkin",
  "git-commit",
  "git-rebase",
  "glsl",
  "gnuplot",
  "go",
  "graphql",
  "groovy",
  "hack",
  "haml",
  "handlebars",
  "hbs",
  "haskell",
  "hs",
  "hcl",
  "hlsl",
  "html",
  "http",
  "imba",
  "ini",
  "java",
  "javascript",
  "js",
  "jinja-html",
  "json",
  "json5",
  "jsonc",
  "jsonnet",
  "jssm",
  "fsl",
  "jsx",
  "julia",
  "kotlin",
  "latex",
  "less",
  "liquid",
  "lisp",
  "logo",
  "lua",
  "make",
  "makefile",
  "markdown",
  "md",
  "marko",
  "matlab",
  "mdx",
  "mermaid",
  "nginx",
  "nim",
  "nix",
  "objective-c",
  "objc",
  "objective-cpp",
  "ocaml",
  "pascal",
  "perl",
  "php",
  "plsql",
  "postcss",
  "powershell",
  "ps",
  "ps1",
  "prisma",
  "prolog",
  "proto",
  "pug",
  "jade",
  "puppet",
  "purescript",
  "python",
  "py",
  "r",
  "raku",
  "perl6",
  "razor",
  "rel",
  "riscv",
  "rst",
  "ruby",
  "rb",
  "rust",
  "rs",
  "sas",
  "sass",
  "scala",
  "scheme",
  "scss",
  "shaderlab",
  "shader",
  "shellscript",
  "shell",
  "bash",
  "sh",
  "zsh",
  "smalltalk",
  "solidity",
  "sparql",
  "sql",
  "ssh-config",
  "stata",
  "stylus",
  "styl",
  "svelte",
  "swift",
  "system-verilog",
  "tasl",
  "tcl",
  "tex",
  "toml",
  "tsx",
  "turtle",
  "twig",
  "typescript",
  "ts",
  "v",
  "vb",
  "cmd",
  "verilog",
  "vhdl",
  "viml",
  "vim",
  "vimscript",
  "vue-html",
  "vue",
  "wasm",
  "wenyan",
  "文言",
  "xml",
  "xsl",
  "yaml",
  "yml",
  "zenscript",
];

export const snippets = {
  abap: `form factorial using iv_val type i.
  data: lv_res type i value 1.
  do iv_val times.
    multiply lv_res by sy-index.
  enddo.

  iv_val = lv_res.
endform.`,
  "actionscript-3": `public static function factorial(n:int):int
{
    if (n < 0)
        return 0;

    var fact:int = 1;
    for (var i:int = 1; i <= n; i++)
        fact *= i;

    return fact;
}`,
  ada: `function Factorial (N : Positive) return Positive is
  Result : Positive := N;
  Counter : Natural := N - 1;
begin
  for I in reverse 1..Counter loop
     Result := Result * I;
  end loop;
  return Result;
end Factorial;`,
  apache: ``,
  apex: `public static long fact(final Integer n) {
    if (n < 0) {
        System.debug('No negative numbers');
        return 0;
    }
    long ans = 1;
    for (Integer i = 1; i <= n; i++) {
        ans *= i;
    }
    return ans;
}`,
  apl: `⍝ Factorial function
fact←{⍵=0:1⋄⍵×fact ⍵-1}`,
  applescript: `on factorial(x)
  if x < 0 then return 0
  set R to 1
  repeat while x > 1
      set {R, x} to {R * x, x - 1}
  end repeat
  return R
end factorial`,
  asm: ``,
  astro: `---
const items = ["Dog", "Cat", "Platypus"];
---
<ul>
  {items.map((item) => (
    <>
      <li>Red {item}</li>
      <li>Blue {item}</li>
      <li>Green {item}</li>
    </>
  ))}
</ul>`,
  awk: ``,
  ballerina: ``,
  bat: ``,
  batch: ``,
  berry: ``,
  be: ``,
  bibtex: ``,
  bicep: ``,
  blade: ``,
  c: ``,
  cadence: ``,
  cdc: ``,
  clarity: ``,
  clojure: ``,
  clj: ``,
  cmake: ``,
  cobol: ``,
  codeql: ``,
  ql: ``,
  coffee: ``,
  cpp: ``,
  crystal: ``,
  csharp: ``,
  "c#": ``,
  cs: ``,
  css: `audio:not([controls]) {
  display: none;
}
html {
  font-size: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
a:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}`,
  cue: ``,
  d: ``,
  dart: ``,
  diff: ``,
  docker: ``,
  "dream-maker": ``,
  elixir: ``,
  elm: ``,
  erb: ``,
  erlang: ``,
  erl: ``,
  fish: ``,
  fsharp: ``,
  "f#": ``,
  fs: ``,
  gherkin: ``,
  "git-commit": ``,
  "git-rebase": ``,
  glsl: ``,
  gnuplot: ``,
  go: ``,
  graphql: ``,
  groovy: ``,
  hack: ``,
  haml: ``,
  handlebars: ``,
  hbs: ``,
  haskell: ``,
  hs: ``,
  hcl: ``,
  hlsl: ``,
  html: `<html>
  <head>
    <title>lorem</title>
  </head>
  <body>
    <h1>ipsum</h1>
    <p>dolor sit amet</p>
  </body>
</html>`,
  http: ``,
  imba: ``,
  ini: ``,
  java: ``,
  javascript: `// to edit the code click the pencil icon ☝️
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}

function consectetur(...adipiscing) {
  const elit = adipiscing[0];
  return sed.eiusmod(elit) ? elit : [elit];
}`,
  js: `function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return dolor;
}

function consectetur(...adipiscing) {
  const elit = adipiscing[0];
  return sed.eiusmod(elit) ? elit : [elit];
}`,
  "jinja-html": ``,
  json: `{ 
  "lorem": "ipsum", 
  "dolor": 12, 
  "sit": false 
}`,
  json5: `{
  // comments
  unquoted: 'and you can quote me on that',
  singleQuotes: 'I can use "double quotes" here',
  lineBreaks: "Look, Mom! \
No \\n's!",
  hexadecimal: 0xdecaf,
  leadingDecimalPoint: .8675309, andTrailing: 8675309.,
  positiveSign: +1,
  trailingComma: 'in objects', andIn: ['arrays',],
  "backwardsCompatible": "with JSON",
}`,
  jsonc: `{
  // Lorem ipsum dolor sit amet
  "lorem": "ipsum",
  "dolor": 12,
  "sit": false
}`,
  jsonnet: ``,
  jssm: ``,
  fsl: ``,
  jsx: `export default function Page() {
  return (
    <div className="flex" style={{height: 6}}>
      <Main />
      <footer>Footer</footer>
    </div>
  );
}`,
  julia: ``,
  kotlin: ``,
  latex: ``,
  less: ``,
  liquid: ``,
  lisp: ``,
  logo: ``,
  lua: ``,
  make: ``,
  makefile: ``,
  markdown: `# Heading 1

[Link text](https://example.com) lorem *italic text*

## Heading 2

- Unordered list item 1
- Unordered list item 2
`,
  md: `# Heading 1

[Link text](https://example.com) lorem *italic text*

## Heading 2

- Unordered list item 1
- Unordered list item 2
`,
  marko: ``,
  matlab: ``,
  mdx: `import {Chart} from './snowfall.js'
export const year = 2018

# Last year’s snowfall

In {year}, the snowfall was above average.
It was followed by a warm spring which caused
flood conditions in many of the nearby rivers.

<Chart year={year} color="#fcb32c" />`,
  mermaid: ``,
  nginx: ``,
  nim: ``,
  nix: ``,
  "objective-c": ``,
  objc: ``,
  "objective-cpp": ``,
  ocaml: ``,
  pascal: ``,
  perl: ``,
  php: ``,
  plsql: ``,
  postcss: `audio:not([controls]) {
  display: none;
}
html {
  font-size: 100%;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
a:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}`,
  powershell: ``,
  ps: ``,
  ps1: ``,
  prisma: ``,
  prolog: ``,
  proto: ``,
  pug: ``,
  jade: ``,
  puppet: ``,
  purescript: ``,
  python: ``,
  py: ``,
  r: ``,
  raku: ``,
  perl6: ``,
  razor: ``,
  rel: ``,
  riscv: ``,
  rst: ``,
  ruby: ``,
  rb: ``,
  rust: ``,
  rs: ``,
  sas: ``,
  sass: ``,
  scala: ``,
  scheme: ``,
  scss: ``,
  shaderlab: ``,
  shader: ``,
  shellscript: ``,
  shell: ``,
  bash: ``,
  sh: ``,
  zsh: ``,
  smalltalk: ``,
  solidity: ``,
  sparql: ``,
  sql: ``,
  "ssh-config": ``,
  stata: ``,
  stylus: ``,
  styl: ``,
  svelte: ``,
  swift: ``,
  "system-verilog": ``,
  tasl: ``,
  tcl: ``,
  tex: ``,
  toml: ``,
  tsx: ``,
  turtle: ``,
  twig: ``,
  typescript: ``,
  ts: ``,
  v: ``,
  vb: ``,
  cmd: ``,
  verilog: ``,
  vhdl: ``,
  viml: ``,
  vim: ``,
  vimscript: ``,
  "vue-html": ``,
  vue: ``,
  wasm: ``,
  wenyan: ``,
  文言: ``,
  xml: ``,
  xsl: ``,
  yaml: ``,
  yml: ``,
  zenscript: ``,
};

type LangItem = {
  name: string;
  status: "empty" | "loading" | "loaded" | "used";
  code: "";
};

export function getLangItems() {
  return Object.keys(snippets).map(
    (lang) =>
      ({
        name: lang,
        status: "empty",
        code: snippets[lang],
      } as LangItem)
  );
}
