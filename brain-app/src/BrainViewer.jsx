import { useEffect, useRef } from 'react'
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
  { match: /right_hemisphere/i,     key: 'art',        category: 'Art',        hexColor: '#ec4899', color: new THREE.Color(0xec4899) },
  { match: /brain_stem|brainstem/i, key: 'experience', category: 'Experience', hexColor: '#f59e0b', color: new THREE.Color(0xf59e0b) },
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
      // Mirror the left hemisphere textures (flip U) — the two hemispheres are
      // anatomically symmetric. The only right-hemisphere file is grayscale
      // (a channel map, not a BaseColor), so we reuse left-side albedo + maps.
      function tlFlipped(path, srgb = false) {
        const t = tl(path, srgb)
        t.wrapS = THREE.RepeatWrapping
        t.repeat.set(-1, 1)   // flip U axis
        t.offset.set(1, 0)    // shift back into [0,1] range
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

const EXPAND_DIST = 10 // world units
const LERP_SPEED  = 8  // 1/s — higher = snappier

export default function BrainViewer({ onProgress, onReady, onHover }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
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

    // ── Post-processing ───────────────────────────────────────────────────
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(el.clientWidth, el.clientHeight),
      0,    // strength (animated)
      0.5,  // radius
      0.8   // threshold
    )
    composer.addPass(bloomPass)
    composer.addPass(new OutputPass())

    // ── Controls ──────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping  = true
    controls.dampingFactor  = 0.06
    controls.enablePan      = false
    controls.minDistance    = 40
    controls.maxDistance    = 400
    controls.autoRotate     = true
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

    // ── Texture / material helpers ────────────────────────────────────────
    const texLoader  = new THREE.TextureLoader()
    const matCache   = {}

    function tl(path, srgb = false) {
      const t = texLoader.load(path)
      t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.LinearSRGBColorSpace
      return t
    }

    function getMaterial(meshName) {
      for (const part of PARTS) {
        if (part.match.test(meshName)) {
          const cacheKey = part.match.source
          if (!matCache[cacheKey]) matCache[cacheKey] = part.build(tl)
          // Return a CLONE so each mesh has independent material state
          return matCache[cacheKey].clone()
        }
      }
      return null
    }

    // ── Interaction state ─────────────────────────────────────────────────
    // meshInfoMap: uuid → { mesh, centroidWorld, expandDir, basePosition, hoverT, meta }
    const meshInfoMap = new Map()
    let   hoveredInfo = null // current hovered entry or null

    // Mouse NDC — updated on mousemove, consumed in rAF loop
    const mouse    = new THREE.Vector2(9999, 9999)
    const raycaster = new THREE.Raycaster()

    // Pre-allocated scratch vectors to avoid per-frame GC pressure
    const _wTarget  = new THREE.Vector3()
    const _wRest    = new THREE.Vector3()
    const _lTarget  = new THREE.Vector3()
    const _lRest    = new THREE.Vector3()
    const _black    = new THREE.Color(0x000000)

    // ── Mouse listeners ───────────────────────────────────────────────────
    function onMouseMove(e) {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
    }
    function onMouseLeave() { mouse.set(9999, 9999) }

    renderer.domElement.addEventListener('mousemove',  onMouseMove)
    renderer.domElement.addEventListener('mouseleave', onMouseLeave)

    // ── FBX Loader ────────────────────────────────────────────────────────
    const loader = new FBXLoader()
    loader.load(
      '/adult-brain/source/Brain_brain_stem.fbx',
      (fbx) => {
        // Center & scale
        const box = new THREE.Box3().setFromObject(fbx)
        fbx.position.sub(box.getCenter(new THREE.Vector3()))
        const size = box.getSize(new THREE.Vector3()).length()
        fbx.scale.setScalar(100 / size)

        scene.add(fbx)

        // Force world matrices before we read centroids
        fbx.updateMatrixWorld(true)

        fbx.traverse((child) => {
          if (!child.isMesh) return
          child.castShadow = true
          child.receiveShadow = true

          // Assign (cloned) PBR material
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

          // Compute world-space centroid of this mesh's geometry
          child.geometry.computeBoundingBox()
          const localCenter = new THREE.Vector3()
          child.geometry.boundingBox.getCenter(localCenter)
          const centroidWorld = localCenter.clone()
          child.localToWorld(centroidWorld)     // mutates to world space

          // Expand direction = unit vector from brain centre (world origin) to centroid
          const expandDir = centroidWorld.clone().normalize()

          const meta = MESH_META.find(m => m.match.test(child.name)) ?? null

          meshInfoMap.set(child.uuid, {
            mesh:          child,
            centroidWorld: centroidWorld.clone(),
            expandDir,
            basePosition:  child.position.clone(), // local pos at rest
            hoverT:        0,
            meta,
          })
        })

        // Fit camera
        const nb   = new THREE.Box3().setFromObject(fbx)
        const ns   = nb.getSize(new THREE.Vector3()).length()
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

      // 1. Raycast (uses matrices from previous frame — 1-frame lag, imperceptible)
      raycaster.setFromCamera(mouse, camera)
      const meshList = [...meshInfoMap.values()].map(i => i.mesh)
      const hits = raycaster.intersectObjects(meshList, false)
      const newHovered = hits.length > 0
        ? meshInfoMap.get(hits[0].object.uuid) ?? null
        : null

      if (newHovered !== hoveredInfo) {
        hoveredInfo = newHovered
        controls.autoRotate = hoveredInfo === null
        onHover?.(hoveredInfo
          ? { key: hoveredInfo.meta?.key, category: hoveredInfo.meta?.category, color: hoveredInfo.meta?.hexColor }
          : null
        )
      }

      // 2. Update each mesh: hoverT → position + material
      const lerpFactor = Math.min(1, LERP_SPEED * delta)
      let maxHoverT = 0

      for (const info of meshInfoMap.values()) {
        const { mesh, centroidWorld, expandDir, basePosition, meta } = info
        const isHovered = info === hoveredInfo
        const anyHovered = hoveredInfo !== null

        // Lerp hoverT
        info.hoverT += ((isHovered ? 1 : 0) - info.hoverT) * lerpFactor
        const t = info.hoverT
        if (t > maxHoverT) maxHoverT = t

        // ── Position: expand along expandDir ────────────────────────────
        // Compute target world position of the centroid (expanded)
        _wTarget.copy(centroidWorld).addScaledVector(expandDir, EXPAND_DIST * t)
        // Rest world position (t=0)
        _wRest.copy(centroidWorld)

        if (mesh.parent) {
          // Convert both to parent-local space (worldToLocal mutates in place)
          mesh.parent.worldToLocal(_lTarget.copy(_wTarget))
          mesh.parent.worldToLocal(_lRest.copy(_wRest))
        } else {
          _lTarget.copy(_wTarget)
          _lRest.copy(_wRest)
        }

        // delta in local space
        _lTarget.sub(_lRest)
        mesh.position.copy(basePosition).add(_lTarget)

        // ── Material: emissive glow + colour dim ────────────────────────
        const mat = mesh.material
        if (!mat) continue

        if (anyHovered) {
          if (isHovered) {
            // Glow: lerp emissive from black → section colour
            mat.emissive.lerpColors(_black, meta?.color ?? _black, t)
            mat.emissiveIntensity = THREE.MathUtils.lerp(0, 1.4, t)
            mat.color.setScalar(1)
          } else {
            // Dim: darken via colour multiplier (no opacity change → no transparency sort issues)
            mat.emissive.set(0x000000)
            mat.emissiveIntensity = 0
            const dim = THREE.MathUtils.lerp(1, 0.22, hoveredInfo.hoverT)
            mat.color.setScalar(dim)
          }
        } else {
          // No hover — restore all
          mat.emissive.set(0x000000)
          mat.emissiveIntensity = 0
          const restored = THREE.MathUtils.lerp(mat.color.r, 1, lerpFactor)
          mat.color.setScalar(restored)
        }
      }

      // 3. Drive bloom strength from max hoverT
      bloomPass.strength = THREE.MathUtils.lerp(0, 1.6, maxHoverT)

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
      controls.dispose()
      composer.dispose()
      renderer.dispose()
      meshInfoMap.clear()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
