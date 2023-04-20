import { LANG_NAMES } from "@code-hike/lighter"

const codes = {
  javascript: `
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
`.trim(),
  abap: "WRITE 'Hello, World!'.",
  "actionscript-3": "trace('Hello, World!');",
  ada: "Put_Line('Hello, World!');",
  apache: "RewriteRule ^(.*)$ http://example.com/$1 [R=301,L]",
  apex: "System.debug('Hello, World!');",
  apl: "'Hello, World!' ⎕ ←",
  applescript: 'display dialog "Hello, World!"',
  ara: "const MY_CONST = 1;",
  asm: "mov ah, 09h",
  astro: "<h1>Hello, World!</h1>",
  awk: 'BEGIN { print "Hello, World!" }',
  ballerina: 'io:println("Hello, World!");',
  bat: "@echo Hello, World!",
  batch: "@echo off\n echo Hello, World!",
  berry: 'print("Hello, World!")',
  be: "Hello world",
  bibtex: "@article{example, title={Hello, World!}}",
  bicep: 'output example string = "Hello, World!"',
  blade: '@{{ "Hello, World!" }}',
  c: 'printf("Hello, World!");',
  cadence: "pub contract HelloWorld { }",
  cdc: "Hello world",
  clarity: `(print "Hello, World!")`,
  clojure: '(println "Hello, World!")',
  clj: '(println "Hello, World!")',
  cmake: 'message(STATUS "Hello, World!")',
  cobol: 'DISPLAY "Hello, World!"',
  codeql: "private module Hello { }",
  ql: "Hello world",
  coffee: 'console.log "Hello, World!"',
  cpp: 'std::cout << "Hello, World!";',
  crystal: 'puts "Hello, World!"',
  csharp: 'Console.WriteLine("Hello, World!");',
  "c#": 'Console.WriteLine("Hello, World!");',
  cs: 'Console.WriteLine("Hello, World!");',
  css: 'body::before { content: "Hello, World!"; }',
  cue: 'example: "Hello, World!"',
  d: 'writeln("Hello, World!");',
  dart: 'print("Hello, World!");',
  dax: 'EVALUATE ROW("Message", "Hello, World!")',
  diff: "--- a/hello.txt\n+++ b/hello.txt\n+Hello, World!",
  docker: "FROM hello-world",
  dockerfile: "FROM hello-world",
  "dream-maker": "Hello world",
  elixir: 'IO.puts("Hello, World!")',
  elm: 'text "Hello, World!"',
  erb: '<%= "Hello, World!" %>',
  erlang: 'io:format("Hello, World!~n", []).',
  erl: 'io:format("Hello, World!~n", []).',
  fish: 'echo "Hello, World!"',
  fsharp: 'printfn "Hello, World!"',
  "f#": 'printfn "Hello, World!"',
  fs: 'printfn "Hello, World!"',
  gdresource: "[gd_scene load_steps=7 format=2]",
  gdscript: 'print("Hello, World!")',
  gdshader: "void fn() { }",
  gherkin: 'Given a greeting "Hello, World!"',
  "git-commit": "Hello world",
  "git-rebase": "Hello world",
  glsl: "const float hello = 20.0;",
  gnuplot: 'set label "Hello, World!" at screen 0.5,0.5',
  go: 'fmt.Println("Hello, World!")',
  graphql: "{ helloWorld }",
  groovy: 'println "Hello, World!"',
  hack: 'echo "Hello, World!";',
  haml: "%p Hello, World!",
  handlebars: '{{{ "Hello, World!" }}}',
  hbs: '{{{ "Hello, World!" }}}',
  haskell: 'putStrLn "Hello, World!"',
  hs: 'putStrLn "Hello, World!"',
  hcl: 'variable "message" { default = "Hello, World!" }',
  hlsl: "Hello world",
  html: "<h1>Hello, World!</h1>",
  http: "GET /hello/world HTTP/1.1",
  imba: 'tag hello\n def render <self> <h1> "Hello, World!"',
  ini: 'greeting = "Hello, World!"',
  properties: "greeting = Hello, World!",
  java: 'System.out.println("Hello, World!");',
  js: 'console.log("Hello, World!");',
  "jinja-html": '{{ "Hello, World!" }}',
  jison: "%lex",
  json: '{ "message": "Hello, World!" }',
  json5: '{ message: "Hello, World!" }',
  jsonc: '{ "message": "Hello, World!" }',
  jsonnet: '{ message: "Hello, World!" }',
  jssm: "state HELLO_WORLD;",
  fsl: `machine_name      : "TCP/IP";`,
  jsx: "<h1>Hello, World!</h1>",
  julia: 'println("Hello, World!")',
  kotlin: 'println("Hello, World!")',
  kusto: "let dt = datetime(2017-01-29 09:00:05);",
  kql: "Hello world",
  latex: "\\textbf{Hello, World!}",
  less: 'body { &:before { content: "Hello, World!"; } }',
  liquid: '{{ "Hello, World!" }}',
  lisp: '(princ "Hello, World!")',
  logo: "PRINT [Hello, World!]",
  lua: 'print("Hello, World!")',
  make: 'hello: ; @echo "Hello, World!"',
  makefile: 'hello: ; @echo "Hello, World!"',
  markdown: "# Hello, World!",
  md: "# Hello, World!",
  marko: "<h1>Hello, World!</h1>",
  matlab: 'disp("Hello, World!");',
  mdx: "# Hello, World!",
  mermaid: `
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
`.trim(),
  nginx: 'location /hello/world { return 200 "Hello, World!"; }',
  nim: 'echo "Hello, World!"',
  nix: 'builtins.trace "Hello, World!"',
  "objective-c": 'NSLog(@"Hello, World!");',
  objc: 'NSLog(@"Hello, World!");',
  "objective-cpp": "Hello world",
  ocaml: 'print_endline "Hello, World!";',
  pascal: 'WriteLn("Hello, World!");',
  perl: 'print "Hello, World!\n";',
  php: 'echo "Hello, World!";',
  plsql: 'dbms_output.put_line("Hello, World!");',
  postcss: `body::before { content: "Hello, World!"; }`,
  powerquery: 'Text.From("Hello, World!")',
  powershell: 'Write-Host "Hello, World!"',
  ps: 'Write-Host "Hello, World!"',
  ps1: 'Write-Host "Hello, World!"',
  prisma: `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`.trim(),
  prolog: 'write("Hello, World!"), nl.',
  proto: "message HelloWorld { string greeting = 1; }",
  pug: "p Hello, World!",
  jade: "p Hello, World!",
  puppet: 'notify { "Hello, World!": }',
  purescript: 'main = log "Hello, World!"',
  python: 'print("Hello, World!")',
  py: 'print("Hello, World!")',
  r: 'cat("Hello, World!\n")',
  raku: 'say "Hello, World!";',
  perl6: 'say "Hello, World!";',
  razor: '@("Hello, World!")',
  reg: 'REGEDIT4\n\n[HKEY_CURRENT_USERHello]\n"World"="Hello, World!"',
  rel: "def cg = CompleteGraph[range[1 ,5, 1]]",
  riscv: "Hello world",
  rst: "Hello, World!\n============",
  ruby: 'puts "Hello, World!"',
  rb: 'puts "Hello, World!"',
  rust: 'println!("Hello, World!");',
  rs: 'println!("Hello, World!");',
  sas: 'data null; put "Hello, World!"; run;',
  sass: 'body\n &:before\n content: "Hello, World!"',
  scala: 'println("Hello, World!")',
  scheme: '(display "Hello, World!")',
  scss: 'body { &:before { content: "Hello, World!"; } }',
  shaderlab: "Hello world",
  shader: "Hello world",
  shellscript: 'echo "Hello, World!"',
  bash: 'echo "Hello, World!"',
  console: 'echo "Hello, World!"',
  sh: 'echo "Hello, World!"',
  shell: 'echo "Hello, World!"',
  zsh: 'echo "Hello, World!"',
  smalltalk: `Transcript show: ''Hello, World!''; cr.`,
  solidity:
    'pragma solidity ^0.8.0;\ncontract HelloWorld { string public message = "Hello, World!"; }',
  sparql: 'SELECT ?greeting WHERE { ?greeting a "Hello, World!" }',
  sql: 'SELECT "Hello, World!" AS Greeting;',
  "ssh-config": "Host hello\n HostName world",
  stata: 'display "Hello, World!"',
  stylus: 'body\n &:before\n content "Hello, World!"',
  styl: 'body\n &:before\n content "Hello, World!"',
  svelte: "<h1>Hello, World!</h1>",
  swift: 'print("Hello, World!")',
  "system-verilog": "Hello world",
  tasl: "class s:Person :: { }",
  tcl: 'puts "Hello, World!"',
  tex: "\textbf{Hello, World!}",
  toml: 'message = "Hello, World!"',
  tsx: "<h1>Hello, World!</h1>",
  turtle:
    '@prefix : http://example.org/ .\n:subject :predicate "Hello, World!" .',
  twig: '{{ "Hello, World!" }}',
  typescript: 'console.log("Hello, World!");',
  ts: 'console.log("Hello, World!");',
  v: 'println("Hello, World!")',
  vb: 'Console.WriteLine("Hello, World!")',
  cmd: "echo Hello, World!",
  verilog: 'initial begin $display("Hello, World!"); end',
  vhdl: 'assert false report "Hello, World!" severity note;',
  viml: 'echom "Hello, World!"',
  vim: 'echom "Hello, World!"',
  vimscript: 'echom "Hello, World!"',
  "vue-html": "<template><h1>Hello, World!</h1></template>",
  vue: "<template><h1>Hello, World!</h1></template>",
  wasm: '(module (func $hello (export "hello") (result i32) (i32.const 42)))',
  wenyan: "吾有一言。曰「「世界，你好！」」。書之。",
  文言: "吾有一言。曰「「世界，你好！」」。書之。",
  wgsl: "fn main() -> void { return; }",
  xml: "<greeting>Hello, World!</greeting>",
  xsl: "xsl:textHello, World!</xsl:text>",
  yaml: "greeting: Hello, World!",
  yml: "greeting: Hello, World!",
  zenscript: 'print("Hello, World!");',
}

LANG_NAMES.forEach((lang) => {
  if (!codes[lang]) {
    codes[lang] = "Hello world"
    console.warn(`Missing code for ${lang}`)
  }
})

export default codes
