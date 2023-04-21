export function handleMouseEnter(e) {
  const target = e.currentTarget

  const hoverboard = document.getElementById("hoverboard")!

  const { top, left } = target.getBoundingClientRect()
  const height = Math.max(target.offsetHeight, 8)
  const width = Math.max(target.offsetWidth, 8)

  hoverboard.style.top = top + (target.offsetHeight - height) / 2 + "px"
  hoverboard.style.left = left + (target.offsetWidth - width) / 2 + "px"
  hoverboard.style.width = width + "px"
  hoverboard.style.height = height + "px"
  hoverboard.style.opacity = "0.5"
  e.stopPropagation()
}

export function hideHoverboard(e) {
  const hoverboard = document.getElementById("hoverboard")!
  hoverboard.style.opacity = "0"
  e.stopPropagation()
}

export function Hoverboard({ background }) {
  return (
    <div
      id="hoverboard"
      className="fixed transition-all duration-150 rounded pointer-events-none cursor-pointer"
      style={{ background, opacity: 0 }}
    ></div>
  )
}
