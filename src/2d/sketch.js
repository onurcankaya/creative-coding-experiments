const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

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
  const createGrid = () => {
    const points = []
    const count = 20
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push([u, v])
      }
    }
    return points
  }

  random.setSeed(512)
  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 200

  return ({ context, width, height }) => {
    context.fillStyle = colors.beige
    context.fillRect(0, 0, width, height)

    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)

      context.beginPath()
      // draw circle
      context.arc(x, y, 50, 0, Math.PI * 2, false)
      context.fillStyle = colors.black
      context.stroke()
    })

    context.beginPath()
    context.arc(width / 3, height / 8, 200, 0, Math.PI, false)
    context.fill()
    context.stroke()
  }
}

canvasSketch(sketch, settings)
