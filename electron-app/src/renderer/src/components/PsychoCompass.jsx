import { useEffect, useRef } from 'react'
import P5 from 'p5'

const degToRad = (degrees) => degrees * (Math.PI / 180)

const visualisation = ({ width, height, degrees, parentId }) => {
  const s = (p5) => {
    p5.setup = () => {
      p5.createCanvas(width, height)
    }

    p5.draw = () => {
      p5.translate(width / 2, height / 2)
      // p5.background(0) // 'rgba(10%,100%,20%,0.5)')
      p5.rectMode(p5.CENTER)
      // fill(100);
      p5.strokeWeight(0)
      p5.stroke('rgba(10%,10%,10%,0.9)')

      for (let i = 0; 2 * width - 20 * i > 0; i++) {
        p5.fill('white')
        p5.ellipse(0, 0, 2 * width - 20 * i)
        p5.fill('rgba(10%,10%,10%,0.9)')
        p5.ellipse(
          -2.2 * Math.cos(degToRad(degrees + 90)),
          -2.2 * Math.sin(degToRad(degrees + 90)),
          2 * width - 20 * i - 6
        )
      }

      p5.stroke('red')
      p5.strokeWeight(2.5)
      p5.line(
        0,
        0,
        -300 * Math.cos(degToRad(degrees + 90)),
        -300 * Math.sin(degToRad(degrees + 90))
      )

      p5.fill('rgba(0%, 100%, 10%, 0.2)')
      p5.strokeWeight(0)
      p5.ellipse(0, 0, 40)

      p5.noFill()
      p5.strokeWeight(40)

      for (let i = 0; i < 5; i++) {
        p5.stroke('rgba(0%, 100%, 10%, 0.2)')
        p5.ellipse(0, 0, ((width + p5.frameCount - i * 80) % width) * 2)
        p5.stroke('rgba(20%, 100%, 20%, 0.4)')
        p5.ellipse(0, 0, ((width + p5.frameCount - (i * 80 - 40)) % width) * 2)
      }
    }
  }

  const p5 = new P5(s, document.getElementById(parentId))

  return {
    cleanup: p5.remove
  }
}

const PsychoCompass = ({
  width = 400,
  height = 400,
  parentId = 'compass-sketch-container',
  degrees,
  className
}) => {
  const id = useRef()

  useEffect(() => {
    const { cleanup } = visualisation({
      parentId,
      width,
      height,
      degrees
    })

    return cleanup
  }, [degrees])

  return <div ref={id} className={className} />
}

export { PsychoCompass }
