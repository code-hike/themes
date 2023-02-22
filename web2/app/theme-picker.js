"use client";

import monokai from "../themes/monokai.json";
import dracula from "../themes/dracula.json";
import minLight from "../themes/min-light.json";
import { useState } from "react";
import { listColors } from "./palette";

const themes = [monokai, dracula, minLight];

export function ThemePicker() {
  const [baseTheme, setBaseTheme] = useState(themes[0]);
  const colors = listColors(baseTheme);
  console.log(colors);
  const changeTheme = (name) => {
    const theme = themes.find((t) => t.name === name);
    setBaseTheme(theme);
  };

  return (
    <div>
      <pre>
        <code>{JSON.stringify(baseTheme, null, 2)}</code>
      </pre>
      <SideBar changeBaseTheme={changeTheme} baseTheme={baseTheme} />
    </div>
  );
}

function SideBar({ changeBaseTheme, baseTheme }) {
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        background: "#222",
        height: "100%",
        width: "320px",
        color: "#fff",
        padding: "1rem",
      }}
    >
      <div>
        <label htmlFor="theme-name">Name</label>
        <input
          style={{ width: "100%", boxSizing: "border-box" }}
          id="theme-name"
          value="my-theme"
        />
        <label htmlFor="theme-base">Base Theme</label>
        <ThemeSelect changeBaseTheme={changeBaseTheme} value={baseTheme} />

        <label htmlFor="theme-lang">Language</label>
        <input
          style={{ width: "100%", boxSizing: "border-box" }}
          id="theme-lang"
          value="javascript"
        />
        <label htmlFor="theme-code">Preview Code</label>
        <textarea
          style={{ width: "100%", boxSizing: "border-box" }}
          id="theme-code"
          value="const a = 1;"
        />
      </div>
    </div>
  );
}

function ThemeSelect({ changeBaseTheme, value }) {
  return (
    <select
      style={{ width: "100%" }}
      id="theme-base"
      onChange={(e) => changeBaseTheme(e.target.value)}
      value={value.name}
    >
      {themes.map((theme) => (
        <option key={theme.name} value={theme.name}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
