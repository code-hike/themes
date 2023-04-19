"use client";

import * as React from "react";

import { highlight } from "./highlighter";
import { useTheme } from "./store";
import { LanguagePickerUI } from "./language-picker.ui";

export function LanguagePicker({ onChange }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const theme = useTheme();

  const handleSelect = (value) => {
    dispatch({ type: "select", langName: value });
    if (state.langs[value].loaded) {
      onChange(value);
    } else if (!state.langs[value].loading) {
      loadLang(value);
    }
  };

  const loadLang = (name: string) => {
    dispatch({ type: "loading", langName: name });
    highlight("", name, theme).promise.then(() => {
      dispatch({ type: "loaded", langName: name });
      onChange(name);
    });
  };

  const value = state.selected;
  const languages = Object.keys(state.langs).map((key) => ({
    alias: key,
    ...state.langs[key],
  }));
  const current = languages.find((lang) => lang.alias === value);

  const all = languages.map((lang) => ({
    name: lang.alias as string,
    state: lang.loading
      ? ("loading" as const)
      : lang.loaded
      ? ("loaded" as const)
      : undefined,
  }));

  const selected = {
    name: current.alias as string,
    state: current.loading
      ? ("loading" as const)
      : current.loaded
      ? ("loaded" as const)
      : undefined,
  };

  return (
    <LanguagePickerUI
      langs={all}
      popular={[]}
      used={[]}
      selected={selected}
      onSelected={(item) => {
        handleSelect(item.name);
      }}
    />
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "select":
      return {
        ...state,
        selected: action.langName,
      };
    case "loading":
      return {
        ...state,
        langs: { ...state.langs, [action.langName]: { loading: true } },
      };
    case "loaded":
      return {
        ...state,
        langs: {
          ...state.langs,
          [action.langName]: { loaded: true },
        },
      };
    default:
      throw new Error();
  }
}

const aliases = [
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

const initialState = {
  selected: "javascript",
  langs: aliases.reduce((acc, alias) => {
    acc[alias] = {};
    return acc;
  }, {}),
};
