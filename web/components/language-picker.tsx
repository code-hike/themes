"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { highlight } from "./highlighter";
import { useTheme } from "./store";

const spinner = (
  <svg
    className="animate-spin  h-4 w-4 mr-2 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export function LanguagePicker({ id, onChange }) {
  const [open, setOpen] = React.useState(false);
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between  w-64"
        >
          {current.loading ? spinner : <Check className={cn("mr-2 h-4 w-4")} />}
          {value}
          <span className="flex-1" />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {languages.map(({ alias, loaded, loading }) => (
              <CommandItem
                key={alias}
                onSelect={(currentValue) => {
                  if (currentValue !== value) {
                    handleSelect(currentValue);
                  }
                  setOpen(false);
                }}
              >
                {loading ? (
                  spinner
                ) : (
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === alias ? "opacity-100" : "opacity-0"
                    )}
                  />
                )}

                <span className={loaded ? "text-white" : "text-gray-400"}>
                  {alias}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
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
