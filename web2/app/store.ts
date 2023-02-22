export function useResult() {
  return {
    lines: [
      [
        { content: "const", style: { color: "red" } },
        { content: " ", style: {} },
        { content: "x", style: { color: "blue" } },
      ],
      [
        { content: "console", style: { color: "purple" } },
        { content: ".", style: { color: "black" } },
        { content: "log()", style: { color: "orange" } },
      ],
    ],
  };
}
