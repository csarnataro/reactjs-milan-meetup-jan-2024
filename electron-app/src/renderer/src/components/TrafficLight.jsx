import { useEffect } from 'react'
import P5 from 'p5'

const redLight = '#d8504d'
const orangeLight = '#ff8b00'
const greenLight = 'lightgreen'

const TrafficLight = ({
  size = 300,
  parentId = 'sketch-container',
  greenLightOn,
  orangeLightOn,
  redLightOn
}) => {
  const visualisation = ({ size }) => {
    const s = (p5) => {
      p5.setup = () => {
        p5.createCanvas(size, size * (252 / 162))
        p5.scale(size / 162)
        p5.strokeWeight(6)
        p5.stroke('teal')
        p5.fill('transparent')
        p5.rect(40, 40, 80, 180, 18)
        p5.line(70, 220, 70, 340)
        p5.line(90, 220, 90, 340)

        p5.noFill()

        p5.arc(80, 37, 20, 20, p5.PI, 0)

        p5.arc(15, 80, 50, 50, p5.PI + 2 * p5.QUARTER_PI, 0)
        p5.arc(145, 80, 50, 50, p5.PI, p5.PI + 2 * p5.QUARTER_PI)

        p5.arc(15, 130, 50, 50, p5.PI + 2 * p5.QUARTER_PI, 0)
        p5.arc(145, 130, 50, 50, p5.PI, p5.PI + 2 * p5.QUARTER_PI)

        p5.arc(15, 180, 50, 50, p5.PI + 2 * p5.QUARTER_PI, 0)
        p5.arc(145, 180, 50, 50, p5.PI, p5.PI + 2 * p5.QUARTER_PI)
      }
      p5.draw = () => {
        p5.scale(size / 162)

        // background(220);
        // p5.rectMode(p5.CENTER)
        // fill(100);

        p5.fill(redLightOn ? redLight : 'transparent')
        p5.ellipse(80, 80, 40)

        p5.fill(orangeLightOn ? orangeLight : 'transparent')
        p5.ellipse(80, 130, 40)

        p5.fill(greenLightOn ? greenLight : 'transparent')
        p5.ellipse(80, 180, 40)
      }
    }

    const p5 = new P5(s, document.getElementById(parentId))

    return {
      cleanup: p5.remove
    }
  }

  useEffect(() => {
    const { cleanup } = visualisation({
      size,
      greenLightOn,
      orangeLightOn,
      redLightOn
    })

    return cleanup // This removes the canvas when the component is rerendered.
  }, [greenLightOn, orangeLightOn, redLightOn])

  return null
}

export { TrafficLight }
