const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048],
  pixelPerInch: 500,
}

const colors = {
  egg: '#faf7f0',
  beige: '#f5f1e6',
  light: '#f7f7f7',
  black: '#171717',
}

const sketch = () => {
  const colorCount = random.rangeFloor(1, 5)
  const palette = random.pick(palettes).slice(0, colorCount)

  const createGrid = () => {
    const points = []
    const count = 16
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push({
          color: random.pick(palette),
          radius: Math.abs(0.001 + random.gaussian() * 0.03),
          position: [u, v],
        })
      }
    }
    return points
  }

  random.setSeed(512)
  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 300

  return ({ context, width, height }) => {
    context.fillStyle = colors.egg
    context.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const { position, radius, color } = data
      const [u, v] = position
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      // draw circle
      context.arc(x, y, radius * width, 0, Math.PI * 2, false)
      context.fillStyle = color
      context.lineWidth = 3
      context.fill()
    })

    context.beginPath()
    context.arc(width / 3, height / 8, 150, 0, Math.PI * 2, false)
    // context.fill()
  }
}

canvasSketch(sketch, settings)
