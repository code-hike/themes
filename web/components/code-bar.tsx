import { Pencil } from "lucide-react"

import { getColor } from "@/lib/theme-colors"

import { handleMouseEnter, hideHoverboard } from "./hoverboard"

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
        e.stopPropagation()
        setSelection({
          type: "color",
          key: "editorGroupHeader.tabsBackground",
        })
      }}
      onMouseOver={handleMouseEnter}
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
      >
        <div
          style={{
            position: "absolute",
            top: -4,
            bottom: -4,
            width: "100%",
          }}
          onMouseOver={handleMouseEnter}
          onClick={(e) => {
            e.stopPropagation()
            setSelection({
              type: "color",
              key: "editorGroupHeader.tabsBorder",
            })
          }}
        ></div>
      </div>
      <button
        onClick={() => setEditing((x) => !x)}
        className="ml-auto mr-2"
        style={{ display: editing ? "none" : "block" }}
      >
        <Pencil
          style={{
            color: getColor(theme, "icon.foreground"),
          }}
          onMouseOver={hideHoverboard}
          className="opacity-70 hover:opacity-100 w-5 h-5 "
        />
      </button>
    </div>
  )
}

function Tab({ active, theme, setSelection }) {
  const backgroundKey = active
    ? "tab.activeBackground"
    : "tab.inactiveBackground"
  const foregroundKey = active
    ? "tab.activeForeground"
    : "tab.inactiveForeground"

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
        e.stopPropagation()
        setSelection({
          type: "color",
          key: backgroundKey,
        })
      }}
      onMouseOver={handleMouseEnter}
    >
      <span
        onClick={(e) => {
          e.stopPropagation()
          setSelection({
            type: "color",
            key: foregroundKey,
          })
        }}
        onMouseOver={handleMouseEnter}
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
        >
          <div
            style={{
              position: "absolute",
              top: -4,
              bottom: -4,
              width: "100%",
            }}
            onMouseOver={handleMouseEnter}
            onClick={(e) => {
              e.stopPropagation()
              setSelection({
                type: "color",
                key: "tab.activeBorder",
              })
            }}
          />
        </div>
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
        >
          <div
            style={{
              position: "absolute",
              top: -4,
              bottom: -4,
              width: "100%",
            }}
            onMouseOver={handleMouseEnter}
            onClick={(e) => {
              e.stopPropagation()
              setSelection({
                type: "color",
                key: "tab.activeBorderTop",
              })
            }}
          />
        </div>
      )}

      <div
        style={{
          position: "absolute",
          right: -5,
          width: 9,
          top: 0,
          height: "100%",
        }}
        onMouseOver={handleMouseEnter}
        onClick={(e) => {
          e.stopPropagation()
          setSelection({
            type: "color",
            key: "tab.border",
          })
        }}
      />
    </span>
  )
}
