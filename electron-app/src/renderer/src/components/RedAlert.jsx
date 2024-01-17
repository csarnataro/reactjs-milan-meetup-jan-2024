import { useEffect } from 'react'
import p5 from 'p5'
import 'p5/lib/addons/p5.sound'

let image
let x_pos = 0
let siren_lightness = 1

const RedAlert = ({
  parentId = 'sketch-container',
  lightOn,
  soundOn,
  width = 550,
  height = 505
}) => {
  const visualisation = () => {
    let alert_sound

    const s = (p5) => {
      p5.preload = () => {
        try {
          p5.soundFormats('mp3')
          alert_sound = p5.loadSound('../assets/danger')
        } catch (error) {
          console.error(error)
        }
        if (!image) {
          image = p5.loadImage('../assets/siren-on.png')
        }
      }

      p5.setup = () => {
        p5.createCanvas(width, height)
        p5.frameRate(30)
      }
      p5.draw = () => {
        // p5.stroke(0)
        // p5.fill('green')
        // p5.ellipse(5, 0, 390, width * 0.8)

        p5.translate(width / 4, 100)
        p5.scale(0.5)
        p5.background('transparent')
        p5.image(image, width / 25, 10)

        if (!soundOn && alert_sound) {
          alert_sound.stop()
        }

        if (!lightOn) {
          // p5.filter(p5.ERODE)
          p5.tint(255, 255, 255, 200)
          // p5.tint('green')
        } else {
          addClipMask(width, height)
          // drawMaskShape();

          switch (true) {
            case x_pos > width:
              siren_lightness = 0.1
              break
            case x_pos > width * 0.75:
              siren_lightness = 0.5
              break
            case x_pos > width * 0.5:
              siren_lightness = 1
              break
            case x_pos > width * 0.25:
              siren_lightness = 0.5
              break
            case x_pos > 0:
              siren_lightness = 0.2
              break
          }

          p5.noStroke()

          p5.fill('rgba(255,86,17,' + siren_lightness + ')')
          p5.ellipse(x_pos, 250, 310)

          p5.fill('rgba(255,199,17,' + siren_lightness + ')')
          p5.ellipse(x_pos, 250, 220)

          p5.fill('rgba(249,210,100,' + siren_lightness + ')')
          p5.ellipse(x_pos, 250, 140)

          removeClipMask()

          x_pos -= 45 // 30;
          if (x_pos < -100) {
            x_pos = width + 70
          }

          p5.stroke(0)
          p5.fill(0)

          if (soundOn) {
            if (!alert_sound.isPlaying()) {
              alert_sound.play()
            }
            if (p5.frameCount % 30 < 15) {
              p5.strokeWeight(30)
              p5.stroke('red')
              p5.fill('transparent')
              p5.line(20, 25, 50, 50)
              p5.line(540, 25, 510, 50)
              p5.line(135, -70, 155, -30)
              p5.line(450, -70, 430, -30)
              p5.line(290, -99, 290, -55)
            }
          }
        }

        // p5.text(distance, 250, 550)
      }
      function addClipMask(width, height) {
        p5.drawingContext.save()
        p5.fill(p5.color(0, 0))
        p5.stroke(0, 0)
        p5.strokeWeight(0)
        drawMaskShape(width, height)
        p5.drawingContext.clip()
      }

      function drawMaskShape(width, height) {
        p5.push()
        p5.translate(width / 2, height / 2 - 70)
        p5.fill('rgba(0, 0, 0, 0)')
        p5.ellipse(width * 0.025, 0, width * 0.7, 500)
        p5.stroke('red')

        p5.pop()
      }

      function removeClipMask() {
        p5.drawingContext.restore()
      }
    }

    const p5instance = new p5(s, document.getElementById(parentId))

    return {
      cleanup: p5instance.remove
    }
  }

  useEffect(() => {
    const { cleanup } = visualisation({ width, height, lightOn, soundOn, parentId })

    return cleanup // This removes the canvas when the component is rerendered.
  }, [lightOn, soundOn])

  return null
}

export { RedAlert }
