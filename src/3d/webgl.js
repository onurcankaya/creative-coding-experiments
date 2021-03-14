global.THREE = require('three')
require('three/examples/js/controls/OrbitControls')

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes')
const eases = require('eases')

const settings = {
  dimensions: [1024, 1024],
  fps: 24,
  duration: 20,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: 'webgl',
  // Turn on MSAA
  attributes: { antialias: true },
}

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  })

  // WebGL background color
  renderer.setClearColor('hsl(0, 0%, 95%)', 1)

  // Setup a camera
  const camera = new THREE.OrthographicCamera()
  camera.position.set(2, 2, 2)
  camera.lookAt(new THREE.Vector3())

  // Setup your scene
  const scene = new THREE.Scene()
  let mesh
  const palette = random.pick(palettes)

  for (let i = 0; i < 30; i++) {
    // Setup a geometry
    const geometry = new THREE.BoxGeometry(Math.random(), Math.random(), Math.random())
    // Setup a material
    const material = new THREE.MeshStandardMaterial({
      color: random.pick(palette),
    })
    // Setup a mesh with geometry + material
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(random.range(-1, 1), random.range(-1, 1), random.range(-1, 1))
    mesh.scale.set(random.range(-1, 1), random.range(-1, 1), random.range(-1, 1))
    mesh.scale.multiplyScalar(1)
    scene.add(mesh)
  }

  scene.add(new THREE.AmbientLight('blue'))
  const light = new THREE.DirectionalLight('white', 1)
  light.position.set(2, 2, 4)
  scene.add(light)

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio)
      renderer.setSize(viewportWidth, viewportHeight, false)
      camera.aspect = viewportWidth / viewportHeight

      const aspect = viewportWidth / viewportHeight

      // Ortho zoom
      const zoom = 2.0

      // Bounds
      camera.left = -zoom * aspect
      camera.right = zoom * aspect
      camera.top = zoom
      camera.bottom = -zoom

      // Near/Far
      camera.near = -100
      camera.far = 100

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom)
      camera.lookAt(new THREE.Vector3())

      // Update the camera
      camera.updateProjectionMatrix()
    },
    // Update & render your scene here
    render({ playhead }) {
      const rotation = playhead * Math.PI * 2
      scene.rotation.y = rotation
      renderer.render(scene, camera)
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose()
    },
  }
}

canvasSketch(sketch, settings)
