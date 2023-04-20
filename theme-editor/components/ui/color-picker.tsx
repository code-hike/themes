import Sketch from "@uiw/react-color-sketch"

export function ColorPicker({ color, onChange, palette }) {
  return (
    <Sketch
      style={{ width: "100%" }}
      className="scheme-light text-black mx-auto mb-2"
      color={color}
      presetColors={palette}
      onChange={(color) => {
        onChange(color.hexa)
      }}
    />
  )
}
