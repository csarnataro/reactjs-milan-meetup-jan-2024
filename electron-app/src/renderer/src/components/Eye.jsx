import { useEffect, useRef } from 'react'

// const DEFAULT_SIZE = 200;
// const CENTER_X = DEFAULT_SIZE / 2;
// const CENTER_Y = DEFAULT_SIZE / 2;
// const INNER_RADIUS = 50;
// const OUTER_RADIUS = 100;

const drawOuterCircle = (ctx, centerX, centerY, size) => {
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2

  ctx.beginPath()
  ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2, true)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()

  ctx.stroke()
}

// eslint-disable-next-line no-unused-vars
const drawCross = (ctx, centerX, centerY, dx, dy) => {
  ctx.strokeStyle = '#FF0000'
  ctx.lineWidth = 2

  ctx.beginPath()
  ctx.moveTo(centerX + dx - 10, centerY + dy)
  ctx.lineTo(centerX + dx + 10, centerY + dy)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(centerX + dx, centerY + dy - 10)
  ctx.lineTo(centerX + dx, centerY + dy + 10)
  ctx.stroke()
}

const drawAt = (ctx, coords, centerX, centerY, size, pupilSize) => {
  const dx = coords[0]
  const dy = coords[1]

  const angle = Math.atan2(dx, dy)

  const outerLimit = size / 2 - pupilSize
  const maybeX = Math.sin(angle) * outerLimit
  const maybeY = Math.cos(angle) * outerLimit

  const inside = dx * dx + dy * dy < outerLimit * outerLimit

  const x = inside ? dx : maybeX
  const y = inside ? dy : maybeY

  drawOuterCircle(ctx, centerX, centerY, size)
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(centerX + x, centerY + y, pupilSize, 0, Math.PI * 2, true)
  ctx.fill()

  // drawCross(ctx, centerX, centerY, dx, dy);

  ctx.fillStyle = '#FFFFFF'
  ctx.beginPath()
  ctx.arc(
    centerX + x - pupilSize * 0.65,
    centerY + y - pupilSize * 0.65,
    pupilSize * 0.2,
    0,
    Math.PI * 2,
    true
  )
  ctx.fill()
}

const Eye = (props) => {
  const canvasRef = useRef(null)

  const { size, pupilSize } = props
  const centerX = size / 2
  const centerY = size / 2

  useEffect(() => {
    let frame
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame = requestAnimationFrame(loop)
      drawAt(ctx, props.coords, centerX, centerY, size, pupilSize)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [props.coords])

  return <canvas ref={canvasRef} className="bg-transparent" width={size} height={size} />
}

export { Eye }
