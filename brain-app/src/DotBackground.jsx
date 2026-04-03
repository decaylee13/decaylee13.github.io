import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const COLS   = 28
const ROWS   = 18
const LAYERS = 4
const SPREAD_X = 260
const SPREAD_Y = 160
const SPREAD_Z = 120

export default function DotBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x07080f, 1)
    el.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.z = 160

    // ── Build dot positions ───────────────────────────────────────────────
    const totalDots = COLS * ROWS * LAYERS
    const positions = new Float32Array(totalDots * 3)
    const sizes     = new Float32Array(totalDots)
    const alphas    = new Float32Array(totalDots)

    let i = 0
    for (let l = 0; l < LAYERS; l++) {
      const zDepth = THREE.MathUtils.lerp(-SPREAD_Z, SPREAD_Z, l / (LAYERS - 1))
      const depthFactor = 1 - (l / LAYERS) * 0.5  // farther = smaller/dimmer

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          positions[i * 3]     = THREE.MathUtils.lerp(-SPREAD_X, SPREAD_X, c / (COLS - 1))
          positions[i * 3 + 1] = THREE.MathUtils.lerp(-SPREAD_Y, SPREAD_Y, r / (ROWS - 1))
          positions[i * 3 + 2] = zDepth
          sizes[i]  = depthFactor * (1.8 + Math.random() * 1.2)
          alphas[i] = depthFactor * (0.15 + Math.random() * 0.25)
          i++
        }
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSize',    new THREE.BufferAttribute(sizes,     1))
    geometry.setAttribute('aAlpha',   new THREE.BufferAttribute(alphas,    1))

    // ── Shader material ───────────────────────────────────────────────────
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: /* glsl */`
        attribute float aSize;
        attribute float aAlpha;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vAlpha;

        void main() {
          vAlpha = aAlpha;

          // Subtle per-dot float
          vec3 pos = position;
          pos.y += sin(uTime * 0.4 + position.x * 0.05) * 1.2;
          pos.x += cos(uTime * 0.3 + position.z * 0.04) * 0.8;

          // Parallax: deeper dots shift more with mouse
          float depth = (position.z + 120.0) / 240.0; // 0..1
          pos.x += uMouse.x * 18.0 * depth;
          pos.y += uMouse.y * 12.0 * depth;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = aSize * (280.0 / -mvPos.z);
        }
      `,
      fragmentShader: /* glsl */`
        varying float vAlpha;

        void main() {
          // Circular dot with soft edge
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float alpha = (1.0 - smoothstep(0.6, 1.0, d)) * vAlpha;
          gl_FragColor = vec4(0.72, 0.73, 0.85, alpha);
        }
      `,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // ── Mouse tracking ────────────────────────────────────────────────────
    const target = new THREE.Vector2(0, 0)
    const current = new THREE.Vector2(0, 0)

    function onMouseMove(e) {
      target.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      target.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Render loop ───────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let rafId

    function animate() {
      rafId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Smooth mouse lerp
      current.lerp(target, 0.04)
      material.uniforms.uTime.value  = elapsed
      material.uniforms.uMouse.value = current

      // Slow whole-scene drift
      points.rotation.x =  current.y * 0.08
      points.rotation.y = -current.x * 0.08

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize ────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    })
    ro.observe(el)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}
