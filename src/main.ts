import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui';
import gsap from 'gsap';
import image from './assets/door-texture.jpg';

// INIT APP
const canvas = document.querySelector('.webgl') as HTMLCanvasElement;

// CREATE SCENE
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(image);
texture.colorSpace = THREE.SRGBColorSpace
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
const sizes = { width: window.innerWidth, height: window.innerHeight }
scene.add(mesh)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// RESIZE HANDLER
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// ANIMATIONS
const animations = {
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  }
}

// SETUP GUI
const gui = new GUI();
gui.add(animations, 'spin');
gui.add(mesh.position, `y`).min(-3).max(3).step(0.01).name(`mesh y`);
gui.add(mesh.position, `x`).min(-3).max(3).step(0.01).name(`mesh x`);
gui.add(mesh, `visible`);
gui.add(mesh.material, `wireframe`);

// CONFIG
window.addEventListener('dblclick', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});

// RENDER LOOP
function tick() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();