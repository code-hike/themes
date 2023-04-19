import { getColor } from "@/components/theme-colors";
import { PencilIcon } from "lucide-react";

export function CodeBar({ theme, editing, setEditing, setSelection }) {
  return (
    <div
      style={{
        background: getColor(theme, "editorGroupHeader.tabsBackground"),
        position: "relative",
        display: "flex",
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelection({
          type: "color",
          key: "editorGroupHeader.tabsBackground",
        });
      }}
    >
      <Tab active={false} theme={theme} setSelection={setSelection} />
      <Tab active={true} theme={theme} setSelection={setSelection} />
      <Tab active={false} theme={theme} setSelection={setSelection} />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 1,
          zIndex: 9,
          background: getColor(theme, "editorGroupHeader.tabsBorder"),
        }}
        className="hover:outline-dotted cursor-pointer"
      ></div>
      <button
        onClick={() => setEditing((x) => !x)}
        className="ml-auto mr-2"
        style={{ display: editing ? "none" : "block" }}
      >
        <PencilIcon
          style={{
            color: getColor(theme, "icon.foreground"),
          }}
          className="opacity-70 hover:opacity-100 w-5 h-5 "
        />
      </button>
    </div>
  );
}

function Tab({ active, theme, setSelection }) {
  const backgroundKey = active
    ? "tab.activeBackground"
    : "tab.inactiveBackground";
  const foregroundKey = active
    ? "tab.activeForeground"
    : "tab.inactiveForeground";

  return (
    <span
      style={{
        background: getColor(theme, backgroundKey),
        color: getColor(theme, foregroundKey),
        cursor: "pointer",
        display: "inline-block",
        padding: "0.5em 1em",
        position: "relative",
        fontSize: "13px",
        borderRight: `1px solid ${getColor(theme, "tab.border")}`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelection({
          type: "color",
          key: backgroundKey,
        });
      }}
    >
      <span
        onClick={(e) => {
          e.stopPropagation();
          setSelection({
            type: "color",
            key: foregroundKey,
          });
        }}
      >
        {active ? "Active Tab" : "Inactive Tab"}
      </span>
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 1,
            zIndex: 10,
            width: "100%",
            background: getColor(theme, "tab.activeBorder"),
          }}
        />
      )}
      {active && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 1,
            zIndex: 10,
            width: "100%",
            background: getColor(theme, "tab.activeBorderTop"),
          }}
        />
      )}
    </span>
  );
}
