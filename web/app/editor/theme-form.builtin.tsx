import darkPlus from "../../themes/dark-plus.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useReducer, useState } from "react";

export function BuiltInThemePicker({ onBaseChange }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchTheme(name: string) {
    dispatch({ type: "loading", themeName: name });
    console.log("fetching ", name);
    fetch(`https://lighter.codehike.org/api/theme?name=${name}&v=0.5.1`)
      .then((res) => res.json())
      .then((theme) => {
        dispatch({ type: "loaded", themeName: name, theme });
      });
  }

  useEffect(() => {
    onBaseChange(state.theme);
  }, [state.theme]);

  return (
    <Select
      value={state.selected}
      onValueChange={(e) => {
        dispatch({ type: "select", themeName: e });
        if (state.themes[e].theme != null) {
          onBaseChange(state.themes[e].theme);
        } else if (!state.themes[e].loading) {
          fetchTheme(e);
        }
      }}
    >
      <SelectTrigger>
        <SelectValue />
        {state.themes[state.selected].loading ? "loading..." : ""}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {builtInThemes.map((themeName) => (
            <SelectItem key={themeName} value={themeName}>
              <SelectLabel>{themeName}</SelectLabel>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "select":
      if (state.themes[action.themeName].theme != null) {
        return {
          ...state,
          selected: action.themeName,
          theme: state.themes[action.themeName].theme,
        };
      } else {
        return {
          ...state,
          selected: action.themeName,
        };
      }
    case "loading":
      return {
        ...state,
        themes: { ...state.themes, [action.themeName]: { loading: true } },
      };
    case "loaded":
      if (action.themeName !== state.selected) {
        return {
          ...state,
          themes: {
            ...state.themes,
            [action.themeName]: { theme: action.theme },
          },
        };
      } else {
        return {
          ...state,
          themes: {
            ...state.themes,
            [action.themeName]: { theme: action.theme },
          },
          theme: action.theme,
        };
      }
    default:
      throw new Error();
  }
}
const initialState = {
  selected: "dark-plus",
  theme: darkPlus,
  themes: {
    "dark-plus": { theme: darkPlus },
    "dracula-soft": {},
    dracula: {},
    "github-dark": {},
    "github-dark-dimmed": {},
    "github-light": {},
    "light-plus": {},
    "material-darker": {},
    "material-default": {},
    "material-lighter": {},
    "material-ocean": {},
    "material-palenight": {},
    "min-dark": {},
    "min-light": {},
    monokai: {},
    nord: {},
    "one-dark-pro": {},
    poimandres: {},
    "slack-dark": {},
    "slack-ochin": {},
    "solarized-dark": {},
    "solarized-light": {},
  },
};

const builtInThemes = [
  "dark-plus",
  "dracula-soft",
  "dracula",
  "github-dark",
  "github-dark-dimmed",
  "github-light",
  "light-plus",
  "material-darker",
  "material-default",
  "material-lighter",
  "material-ocean",
  "material-palenight",
  "min-dark",
  "min-light",
  "monokai",
  "nord",
  "one-dark-pro",
  "poimandres",
  "slack-dark",
  "slack-ochin",
  "solarized-dark",
  "solarized-light",
];
