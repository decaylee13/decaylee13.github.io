import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('brain-canvas');
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(0, 0.6, 5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
keyLight.position.set(4, 4, 6);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x9bb2ff, 0.6);
rimLight.position.set(-6, 3, -4);
scene.add(rimLight);

const brainGroup = new THREE.Group();
scene.add(brainGroup);

const sections = [
  { id: 'home', color: '#8f7bff', position: [-0.7, 0.25, 0], scale: [1.05, 0.95, 1.05], copy: 'Welcome to the portfolio. Move around the brain and tap any lobe to jump into a section.' },
  { id: 'resume', color: '#ffafcc', position: [0.5, 0.35, -0.3], scale: [0.9, 1.05, 0.9], copy: 'Review my experience, highlights, and the impact I deliver on teams.' },
  { id: 'about', color: '#7dd6f7', position: [-0.25, -0.1, 0.6], scale: [0.95, 0.9, 1.1], copy: 'Learn more about my approach to building human-centered products.' },
  { id: 'projects', color: '#ffa761', position: [0.8, -0.15, 0.15], scale: [0.9, 0.95, 1.05], copy: 'Explore interactive and product work, from data viz to polished UI.' },
  { id: 'academics', color: '#90f7b1', position: [0.2, -0.45, -0.5], scale: [0.95, 0.8, 1], copy: 'See the research interests and academic foundations behind my work.' },
];

const colorMap = Object.fromEntries(sections.map((section) => [section.id, section.color]));

const baseMaterial = new THREE.MeshStandardMaterial({
  color: '#e5e8f3',
  roughness: 0.5,
  metalness: 0.15,
  transparent: true,
  opacity: 0.14,
  flatShading: true,
});

const baseGeometry = new THREE.SphereGeometry(1.35, 80, 80);
const brainShell = new THREE.Mesh(baseGeometry, baseMaterial);
brainShell.scale.set(1.05, 1.05, 1.05);
brainGroup.add(brainShell);

const lobes = sections.map((section) => {
  const lobeGeometry = new THREE.SphereGeometry(1.25, 80, 80);
  const material = new THREE.MeshStandardMaterial({
    color: section.color,
    roughness: 0.45,
    metalness: 0.25,
    emissive: section.color,
    emissiveIntensity: 0.25,
  });

  const mesh = new THREE.Mesh(lobeGeometry, material);
  mesh.position.set(...section.position);
  mesh.scale.set(...section.scale);
  mesh.userData.section = section;
  brainGroup.add(mesh);
  return mesh;
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2.2;
controls.maxDistance = 6;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.8;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;
let activeSection = sections[0];

function updateCanvasSize() {
  const { clientWidth, clientHeight } = canvas.parentElement;
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setSize(clientWidth, clientHeight, false);
  renderer.setPixelRatio(pixelRatio);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
}

updateCanvasSize();
window.addEventListener('resize', updateCanvasSize);

function setActive(section) {
  activeSection = section;
  document.querySelectorAll('.legend__item').forEach((item) => {
    const match = item.getAttribute('data-section') === section.id;
    item.classList.toggle('is-active', match);
    const swatch = item.querySelector('.swatch');
    if (swatch) swatch.style.background = colorMap[item.getAttribute('data-section')] ?? 'var(--accent)';
  });

  document.querySelectorAll('[data-section]').forEach((element) => {
    const match = element.getAttribute('data-section') === section.id;
    element.style.outline = match ? `2px solid ${section.color}` : 'none';
    element.style.boxShadow = match ? '0 10px 40px rgba(0,0,0,0.35)' : '';
  });

  const infoCard = document.getElementById('info-card');
  infoCard.querySelector('.info-card__title').textContent = section.id.charAt(0).toUpperCase() + section.id.slice(1);
  infoCard.querySelector('.info-card__body').textContent = section.copy;
  infoCard.querySelector('.info-card__link').setAttribute('href', `#${section.id}`);
}

setActive(activeSection);

function resetMaterials() {
  lobes.forEach((mesh) => {
    const isActive = mesh.userData.section.id === activeSection.id;
    mesh.material.emissiveIntensity = isActive ? 0.6 : 0.25;
    mesh.material.opacity = isActive ? 0.95 : 0.8;
    mesh.scale.z = mesh.userData.section.scale[2];
  });
}

function onPointerMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(lobes);

  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    if (hovered !== mesh) {
      if (hovered && hovered !== activeSection.mesh) hovered.material.emissiveIntensity = 0.25;
      hovered = mesh;
      mesh.material.emissiveIntensity = 0.8;
    }
  } else if (hovered) {
    hovered.material.emissiveIntensity = hovered.userData.section.id === activeSection.id ? 0.6 : 0.25;
    hovered = null;
  }
}

function onClick(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(lobes);
  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    activeSection = mesh.userData.section;
    setActive(activeSection);
    resetMaterials();
    document.getElementById(activeSection.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

renderer.domElement.addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('click', onClick);

function animate() {
  requestAnimationFrame(animate);
  brainGroup.rotation.y += 0.0025;
  brainGroup.rotation.z = Math.sin(Date.now() * 0.0002) * 0.05;
  controls.update();
  renderer.render(scene, camera);
}

resetMaterials();
animate();
