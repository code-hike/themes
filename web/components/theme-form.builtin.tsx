import darkPlus from "../themes/dark-plus.json";
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

const spinner = (
  <svg
    className="animate-spin -mr-1 h-8 w-8 text-white"
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

export function BuiltInThemePicker({ onBaseChange }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function fetchTheme(name: string) {
    dispatch({ type: "loading", themeName: name });
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
      // open={true}
    >
      <SelectTrigger icon={state.themes[state.selected].loading && spinner}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {names.map((themeName) => {
            const theme = state.themes[themeName];
            return (
              <SelectItem
                key={themeName}
                value={themeName}
                icon={theme.loading ? spinner : null}
              >
                <SelectLabel>{themeName}</SelectLabel>
              </SelectItem>
            );
          })}
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

const names = Object.keys(initialState.themes);
