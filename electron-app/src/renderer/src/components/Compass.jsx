import { useEffect, useRef } from 'react'
import { RadialGauge } from 'canvas-gauges'

let compass

const Compass = ({ degrees, className }) => {
  let imageCanvas = useRef()

  useEffect(() => {
    if (compass) {
      compass.value = degrees
      compass.draw()
    }
  }, [degrees])

  useEffect(() => {
    compass = new RadialGauge({
      renderTo: imageCanvas.current,
      useMinPath: true,
      height: 400,
      minValue: 0,
      maxValue: 360,
      majorTicks: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
      minorTicks: 22,
      ticksAngle: 360,
      startAngle: 180,
      strokeTicks: false,
      highlights: false,
      colorPlate: '#3a3',
      colorPlateEnd: 'green',
      colorMajorTicks: '#f5f5f5',
      colorMinorTicks: '#ddd',
      colorNumbers: '#ccc',
      colorNeedle: 'rgba(240, 128, 128, 1)',
      colorNeedleEnd: 'rgba(255, 160, 122, .9)',
      valueBox: false,
      valueTextShadow: false,
      colorCircleInner: '#fff',
      colorNeedleCircleOuter: '#ccc',
      needleCircleSize: 15,
      needleCircleOuter: false,
      animationRule: 'linear',
      needleType: 'line',
      needleStart: 75,
      needleEnd: 99,
      needleWidth: 3,
      borders: true,
      borderInnerWidth: 0,
      borderMiddleWidth: 0,
      borderOuterWidth: 10,
      colorBorderOuter: '#ccc',
      colorBorderOuterEnd: '#ccc',
      colorNeedleShadowDown: '#222',
      borderShadowWidth: 0,
      animationTarget: 'plate',
      animationDuration: 800,
      animateOnInit: true
    }).draw()
  }, [])

  return (
    <div className={`flex flex-col ${className || ''}`}>
      <canvas id="canvas-id" ref={imageCanvas}></canvas>
    </div>
  )
}

export { Compass }
