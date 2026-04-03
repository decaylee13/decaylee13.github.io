import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

// ── Section definitions ────────────────────────────────────────────────────
const MESH_META = [
  { match: /left_hemisphere/i,      key: 'research',   category: 'Research',   hexColor: '#6366f1', color: new THREE.Color(0x6366f1) },
  { match: /right_hemisphere/i,     key: 'experience', category: 'Experience', hexColor: '#f59e0b', color: new THREE.Color(0xf59e0b) },
  { match: /brain_stem|brainstem/i, key: 'art',        category: 'Art',        hexColor: '#ec4899', color: new THREE.Color(0xec4899) },
  { match: /cerebellum/i,           key: 'music',      category: 'Music',      hexColor: '#10b981', color: new THREE.Color(0x10b981) },
  { match: /olfactory/i,            key: 'photos',     category: 'Photos',     hexColor: '#06b6d4', color: new THREE.Color(0x06b6d4) },
  { match: /stria/i,                key: 'projects',   category: 'Projects',   hexColor: '#8b5cf6', color: new THREE.Color(0x8b5cf6) },
]

// ── PBR texture sets ───────────────────────────────────────────────────────
const T = '/adult-brain/textures/'

const PARTS = [
  {
    match: /left_hemisphere/i,
    build: (tl) => new THREE.MeshStandardMaterial({
      map:          tl('/adult-brain/textures/Brain_brain_stem_Brain_left_hemisphere_M_B.png', true),
      normalMap:    tl('/adult-brain/textures/Brain_brain_stem_Brain_left_hemisphere_M_N.png'),
      roughnessMap: tl('/adult-brain/textures/Brain_brain_stem_Brain_left_hemisphere_M_R.png'),
      metalnessMap: tl('/adult-brain/textures/Brain_brain_stem_Brain_left_hemisphere_M_M.png'),
      roughness: 1, metalness: 1,
    }),
  },
  {
    match: /right_hemisphere/i,
    build: (tl) => {
      function tlFlipped(path, srgb = false) {
        const t = tl(path, srgb)
        t.wrapS = THREE.RepeatWrapping
        t.repeat.set(-1, 1)
        t.offset.set(1, 0)
        return t
      }
      return new THREE.MeshStandardMaterial({
        map:          tlFlipped('/adult-brain/textures/Brain_brain_stem_Brain_left_hemisphere_M_B.png', true),
        normalMap:    tlFlipped('/adult-brain/textures/Brain_brain_stem_Brain_left_hemisphere_M_N.png'),
        roughnessMap: tlFlipped('/adult-brain/textures/Brain_brain_stem_Brain_left_hemisphere_M_R.png'),
        metalnessMap: tlFlipped('/adult-brain/textures/Brain_brain_stem_Brain_left_hemisphere_M_M.png'),
        roughness: 1, metalness: 1,
      })
    },
  },
  {
    match: /brain_stem|brainstem/i,
    build: (tl) => new THREE.MeshStandardMaterial({
      map:          tl(`${T}Brain_brain_stem_Brain_stem_M_BaseColor.png`, true),
      normalMap:    tl(`${T}Brain_brain_stem_Brain_stem_M_Normal.png`),
      roughnessMap: tl(`${T}Brain_brain_stem_Brain_stem_M_Roughness.png`),
      metalnessMap: tl(`${T}Brain_brain_stem_Brain_stem_M_Metallic.png`),
      roughness: 1, metalness: 1,
    }),
  },
  {
    match: /cerebellum/i,
    build: (tl) => new THREE.MeshStandardMaterial({
      map:          tl(`${T}Brain_brain_stem_Cerebellum_M_BaseColor.png`, true),
      normalMap:    tl(`${T}Brain_brain_stem_Cerebellum_M_Normal.png`),
      roughnessMap: tl(`${T}Brain_brain_stem_Cerebellum_M_Roughness.png`),
      metalnessMap: tl(`${T}Brain_brain_stem_Cerebellum_M_Metallic.png`),
      roughness: 1, metalness: 1,
    }),
  },
  {
    match: /olfactory/i,
    build: (tl) => new THREE.MeshStandardMaterial({
      map:          tl(`${T}Brain_brain_stem_Olfactory_nerve_M_BaseCol.png`, true),
      normalMap:    tl(`${T}Brain_brain_stem_Olfactory_nerve_M_Normal.png`),
      roughnessMap: tl(`${T}Brain_brain_stem_Olfactory_nerve_M_Roughne.png`),
      metalnessMap: tl(`${T}Brain_brain_stem_Olfactory_nerve_M_Metalli.png`),
      roughness: 1, metalness: 1,
    }),
  },
  {
    match: /stria/i,
    build: (tl) => new THREE.MeshStandardMaterial({
      map:          tl(`${T}Brain_brain_stem_Stria_medullari_M_BaseCol.png`, true),
      normalMap:    tl(`${T}Brain_brain_stem_Stria_medullari_M_Normal.png`),
      roughnessMap: tl(`${T}Brain_brain_stem_Stria_medullari_M_Roughne.png`),
      metalnessMap: tl(`${T}Brain_brain_stem_Stria_medullari_M_Metalli.png`),
      roughness: 1, metalness: 1,
    }),
  },
]

const EXPAND_DIST = 10
const LERP_SPEED  = 8

function easeInOutCubic(t) {
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

const BrainViewer = forwardRef(function BrainViewer(
  { onProgress, onReady, onHover, onEnterSection, onExitSection, interactive = true },
  ref
) {
  const mountRef   = useRef(null)
  // Expose zoomOut() to parent via ref
  const zoomOutFn  = useRef(null)

  useImperativeHandle(ref, () => ({
    zoomOut: () => zoomOutFn.current?.(),
  }))

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // ── Scene / Camera ────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 2000)
    camera.position.set(0, 20, 160)
    scene.background = new THREE.Color(0x000000)

    // ── Post-processing ───────────────────────────────────────────────────
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(el.clientWidth, el.clientHeight),
      0, 0.5, 0.8
    )
    composer.addPass(bloomPass)
    composer.addPass(new OutputPass())

    // ── Controls ──────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping   = true
    controls.dampingFactor   = 0.06
    controls.enablePan       = false
    controls.minDistance     = 40
    controls.maxDistance     = 400
    controls.autoRotate      = true
    controls.autoRotateSpeed = 0.5

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const key = new THREE.DirectionalLight(0xfff4e0, 2.8)
    key.position.set(80, 120, 100)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    Object.assign(key.shadow.camera, { near: 1, far: 500, left: -150, right: 150, top: 150, bottom: -150 })
    scene.add(key)
    const fill = new THREE.DirectionalLight(0xc8d8ff, 0.9)
    fill.position.set(-80, 40, -60)
    scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffe0c0, 1.1)
    rim.position.set(0, -80, -120)
    scene.add(rim)

    // ── Dot background ────────────────────────────────────────────────────
    const COLS = 46, ROWS = 28, LAYERS = 5
    const DOT_SPREAD_X = 900
    const DOT_SPREAD_Y = 520
    const DOT_Z_FAR  = -640
    const DOT_Z_NEAR = -140
    const dotCount = COLS * ROWS * LAYERS
    const dotPos   = new Float32Array(dotCount * 3)
    const dotSizes = new Float32Array(dotCount)
    const dotAlpha = new Float32Array(dotCount)

    let di = 0
    for (let l = 0; l < LAYERS; l++) {
      const z = THREE.MathUtils.lerp(DOT_Z_FAR, DOT_Z_NEAR, l / (LAYERS - 1))
      const depth = 1 - (l / (LAYERS - 1)) * 0.65
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const jitterX = (Math.random() - 0.5) * 24
          const jitterY = (Math.random() - 0.5) * 20
          dotPos[di * 3]     = THREE.MathUtils.lerp(-DOT_SPREAD_X, DOT_SPREAD_X, c / (COLS - 1)) + jitterX
          dotPos[di * 3 + 1] = THREE.MathUtils.lerp(-DOT_SPREAD_Y, DOT_SPREAD_Y, r / (ROWS - 1)) + jitterY
          dotPos[di * 3 + 2] = z
          dotSizes[di] = depth * (3.2 + Math.random() * 4.6)
          dotAlpha[di] = depth * (0.14 + Math.random() * 0.42)
          di++
        }
      }
    }

    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos,   3))
    dotGeo.setAttribute('aSize',    new THREE.BufferAttribute(dotSizes, 1))
    dotGeo.setAttribute('aAlpha',   new THREE.BufferAttribute(dotAlpha, 1))

    const dotMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite:  false,
      uniforms: {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: /* glsl */`
        attribute float aSize;
        attribute float aAlpha;
        uniform float uTime;
        uniform vec2  uMouse;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec3 pos = position;
          // Gentle float
          pos.y += sin(uTime * 0.35 + position.x * 0.04) * 1.4;
          pos.x += cos(uTime * 0.28 + position.z * 0.05) * 0.9;
          // Parallax — deeper layers move more with cursor
          float t = clamp((position.z + 640.0) / 500.0, 0.0, 1.0);
          pos.x += uMouse.x * 28.0 * (1.0 - t);
          pos.y += uMouse.y * 18.0 * (1.0 - t);
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position  = projectionMatrix * mv;
          gl_PointSize = aSize * (360.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */`
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float a = (1.0 - smoothstep(0.5, 1.0, d)) * vAlpha;
          gl_FragColor = vec4(1.0, 1.0, 1.0, a);
        }
      `,
    })

    const dotPoints = new THREE.Points(dotGeo, dotMat)
    scene.add(dotPoints)

    // Smooth mouse for dots
    const dotMouseTarget  = new THREE.Vector2(0, 0)
    const dotMouseCurrent = new THREE.Vector2(0, 0)

    // ── Textures / materials ──────────────────────────────────────────────
    const texLoader = new THREE.TextureLoader()
    const matCache  = {}

    function tl(path, srgb = false) {
      const t = texLoader.load(path)
      t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.LinearSRGBColorSpace
      return t
    }

    function getMaterial(meshName) {
      for (const part of PARTS) {
        if (part.match.test(meshName)) {
          const k = part.match.source
          if (!matCache[k]) matCache[k] = part.build(tl)
          return matCache[k].clone()
        }
      }
      return null
    }

    // ── Interaction state ─────────────────────────────────────────────────
    const meshInfoMap  = new Map()
    let   hoveredInfo  = null
    let   isInteractive = interactive  // shadows the prop inside the closure

    const mouse     = new THREE.Vector2(9999, 9999)
    const raycaster = new THREE.Raycaster()

    // Scratch vectors
    const _wTarget = new THREE.Vector3()
    const _wRest   = new THREE.Vector3()
    const _lTarget = new THREE.Vector3()
    const _lRest   = new THREE.Vector3()
    const _black   = new THREE.Color(0x000000)

    // ── Zoom animation state ───────────────────────────────────────────────
    // Stored camera state for returning home
    const savedCamPos    = new THREE.Vector3()
    const savedCamTarget = new THREE.Vector3()
    let   zoomAnim       = null  // null | { fromPos, toPos, fromTarget, toTarget, t, duration, ease, onComplete }

    // ── Mouse / click listeners ───────────────────────────────────────────
    function onMouseMove(e) {
      // Always update dot mouse (even during zoom)
      dotMouseTarget.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      dotMouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2

      if (!isInteractive || zoomAnim) return
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
    }
    function onMouseLeave() { mouse.set(9999, 9999) }

    function onCanvasClick() {
      if (!isInteractive || zoomAnim || !hoveredInfo?.meta) return

      const { centroidWorld, expandDir, meta } = hoveredInfo

      // Save current camera state
      savedCamPos.copy(camera.position)
      savedCamTarget.copy(controls.target)

      // Zoom destination: close to the expanded mesh centroid
      const toTarget = centroidWorld.clone().addScaledVector(expandDir, EXPAND_DIST)
      const toPos    = centroidWorld.clone().addScaledVector(expandDir, EXPAND_DIST + 42)

      controls.enabled    = false
      controls.autoRotate = false
      mouse.set(9999, 9999)  // prevent hover updates during zoom

      zoomAnim = {
        fromPos:    camera.position.clone(),
        toPos,
        fromTarget: controls.target.clone(),
        toTarget,
        t:          0,
        duration:   1.3,
        ease:       easeInOutCubic,
        onComplete: () => {
          onEnterSection?.({ key: meta.key, category: meta.category, color: meta.hexColor })
        },
      }
    }

    renderer.domElement.addEventListener('mousemove',  onMouseMove)
    renderer.domElement.addEventListener('mouseleave', onMouseLeave)
    renderer.domElement.addEventListener('click',      onCanvasClick)

    // ── Expose zoomOut via ref ────────────────────────────────────────────
    zoomOutFn.current = () => {
      if (zoomAnim) return
      zoomAnim = {
        fromPos:    camera.position.clone(),
        toPos:      savedCamPos.clone(),
        fromTarget: controls.target.clone(),
        toTarget:   savedCamTarget.clone(),
        t:          0,
        duration:   1.1,
        ease:       easeOutCubic,
        onComplete: () => {
          controls.enabled    = true
          controls.autoRotate = true
          onExitSection?.()
        },
      }
    }

    // ── FBX Loader ────────────────────────────────────────────────────────
    const loader = new FBXLoader()
    loader.load(
      '/adult-brain/source/Brain_brain_stem.fbx',
      (fbx) => {
        const box = new THREE.Box3().setFromObject(fbx)
        fbx.position.sub(box.getCenter(new THREE.Vector3()))
        const size = box.getSize(new THREE.Vector3()).length()
        fbx.scale.setScalar(100 / size)
        scene.add(fbx)
        fbx.updateMatrixWorld(true)

        fbx.traverse((child) => {
          if (!child.isMesh) return
          child.castShadow = true
          child.receiveShadow = true

          const mat = getMaterial(child.name)
          if (mat) {
            child.material = mat
          } else {
            const old = Array.isArray(child.material) ? child.material[0] : child.material
            child.material = new THREE.MeshStandardMaterial({
              color: old?.color ?? new THREE.Color(0xddbbaa),
              map:   old?.map  ?? null,
              roughness: 0.7, metalness: 0.05,
            })
          }

          child.geometry.computeBoundingBox()
          const localCenter = new THREE.Vector3()
          child.geometry.boundingBox.getCenter(localCenter)
          const centroidWorld = localCenter.clone()
          child.localToWorld(centroidWorld)

          const expandDir = centroidWorld.clone().normalize()
          const meta      = MESH_META.find(m => m.match.test(child.name)) ?? null

          meshInfoMap.set(child.uuid, {
            mesh:         child,
            centroidWorld: centroidWorld.clone(),
            expandDir,
            basePosition: child.position.clone(),
            hoverT:       0,
            meta,
          })
        })

        const nb = new THREE.Box3().setFromObject(fbx)
        const ns = nb.getSize(new THREE.Vector3()).length()
        camera.position.set(0, ns * 0.25, ns * 1.4)
        controls.minDistance = ns * 0.3
        controls.maxDistance = ns * 6
        controls.update()

        onReady?.()
      },
      (xhr) => { if (xhr.total) onProgress?.(Math.round(xhr.loaded / xhr.total * 100)) },
      (err) => { console.error('FBX load error:', err); onReady?.() }
    )

    // ── Clock ─────────────────────────────────────────────────────────────
    const clock = new THREE.Clock()

    // ── Render loop ───────────────────────────────────────────────────────
    let rafId

    function animate() {
      rafId = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      // ── Zoom animation ─────────────────────────────────────────────────
      if (zoomAnim) {
        zoomAnim.t = Math.min(1, zoomAnim.t + delta / zoomAnim.duration)
        const e = zoomAnim.ease(zoomAnim.t)
        camera.position.lerpVectors(zoomAnim.fromPos, zoomAnim.toPos, e)
        controls.target.lerpVectors(zoomAnim.fromTarget, zoomAnim.toTarget, e)
        camera.lookAt(controls.target)

        if (zoomAnim.t >= 1) {
          const cb = zoomAnim.onComplete
          zoomAnim = null
          cb?.()
        }

        controls.update()
        composer.render()
        return  // skip hover/expand logic during zoom
      }

      // ── Sync interactive flag from prop ────────────────────────────────
      isInteractive = interactive

      // ── Raycast ────────────────────────────────────────────────────────
      let newHovered = null
      if (isInteractive) {
        raycaster.setFromCamera(mouse, camera)
        const meshList = [...meshInfoMap.values()].map(i => i.mesh)
        const hits = raycaster.intersectObjects(meshList, false)
        newHovered = hits.length > 0 ? meshInfoMap.get(hits[0].object.uuid) ?? null : null
      }

      if (newHovered !== hoveredInfo) {
        hoveredInfo = newHovered
        controls.autoRotate = hoveredInfo === null
        renderer.domElement.style.cursor = hoveredInfo ? 'pointer' : 'default'
        onHover?.(hoveredInfo
          ? { key: hoveredInfo.meta?.key, category: hoveredInfo.meta?.category, color: hoveredInfo.meta?.hexColor }
          : null
        )
      }

      // ── Hover expand + material ────────────────────────────────────────
      const lerpFactor = Math.min(1, LERP_SPEED * delta)
      let maxHoverT = 0

      for (const info of meshInfoMap.values()) {
        const { mesh, centroidWorld, expandDir, basePosition, meta } = info
        const isHovered  = info === hoveredInfo
        const anyHovered = hoveredInfo !== null

        info.hoverT += ((isHovered ? 1 : 0) - info.hoverT) * lerpFactor
        const t = info.hoverT
        if (t > maxHoverT) maxHoverT = t

        // Position
        _wTarget.copy(centroidWorld).addScaledVector(expandDir, EXPAND_DIST * t)
        _wRest.copy(centroidWorld)
        if (mesh.parent) {
          mesh.parent.worldToLocal(_lTarget.copy(_wTarget))
          mesh.parent.worldToLocal(_lRest.copy(_wRest))
        } else {
          _lTarget.copy(_wTarget)
          _lRest.copy(_wRest)
        }
        mesh.position.copy(basePosition).add(_lTarget.sub(_lRest))

        // Material
        const mat = mesh.material
        if (!mat) continue
        if (anyHovered) {
          if (isHovered) {
            mat.emissive.lerpColors(_black, meta?.color ?? _black, t)
            mat.emissiveIntensity = THREE.MathUtils.lerp(0, 1.4, t)
            mat.color.setScalar(1)
          } else {
            mat.emissive.set(0x000000)
            mat.emissiveIntensity = 0
            mat.color.setScalar(THREE.MathUtils.lerp(1, 0.22, hoveredInfo.hoverT))
          }
        } else {
          mat.emissive.set(0x000000)
          mat.emissiveIntensity = 0
          mat.color.setScalar(THREE.MathUtils.lerp(mat.color.r, 1, lerpFactor))
        }
      }

      bloomPass.strength = THREE.MathUtils.lerp(0, 1.6, maxHoverT)

      // ── Dot background animation ───────────────────────────────────────
      dotMouseCurrent.lerp(dotMouseTarget, 0.04)
      dotMat.uniforms.uTime.value  = clock.getElapsedTime()
      dotMat.uniforms.uMouse.value = dotMouseCurrent
      dotPoints.rotation.x =  dotMouseCurrent.y * 0.06
      dotPoints.rotation.y = -dotMouseCurrent.x * 0.06

      controls.update()
      composer.render()
    }

    animate()

    // ── Resize ────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
      bloomPass.resolution.set(w, h)
    })
    ro.observe(el)

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.domElement.removeEventListener('mousemove',  onMouseMove)
      renderer.domElement.removeEventListener('mouseleave', onMouseLeave)
      renderer.domElement.removeEventListener('click',      onCanvasClick)
      zoomOutFn.current = null
      controls.dispose()
      composer.dispose()
      renderer.dispose()
      dotGeo.dispose()
      dotMat.dispose()
      meshInfoMap.clear()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
})

export default BrainViewer
