import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import gsap from 'gsap';

type Sizes = {
  width: number,
  height: number
}

const canvas = document.querySelector('.webgl') as HTMLCanvasElement;

// Meshes
const mesh1 = getMesh('orange');
const mesh2 = getMesh('blue');
const mesh3 = getMesh('white');

// Camera
const sizes: Sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

function updateSizes() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

addEventListener('resize', updateSizes);

addEventListener('dblclick', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// Axes helper
const axesHelper = new THREE.AxesHelper();
const dev = false;

// Group
const group = new THREE.Group();
group.add(mesh1);
group.add(mesh2);
group.add(mesh3);

// Scene
const scene = new THREE.Scene();
scene.add(camera);
scene.add(group);

if (dev) scene.add(axesHelper);

// Setup mesh
mesh1.position.set(-1, 0, 0);
mesh2.position.set(0, 0, 0);
mesh3.position.set(1, 0, 0);

// Setup group
group.position.set(1, 0, 1);
group.scale.set(1.5, 0.5, 0.5);
// group.rotation.set(Math.PI * 0.25, Math.PI * 0.25, Math.PI * 0.75);

// Setup camera
camera.position.set(1, 1, 5);
// camera.lookAt(group.position);


// Renderer
if (!canvas) throw new Error('Canvas not found');

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// const clock = new THREE.Clock();
tick();

// window.addEventListener('mousemove', ({ clientX, clientY }) => {
//   camera.position.x = getPositionX(clientX);
//   camera.position.z = getPositionZ(clientX);
//   camera.position.y = getPositionY(clientY);
//   camera.lookAt(group.position);
// });

function tick() {
  // gsap.to(group.position, { duration: 1, delay: 1, x: even ? 2 : -2 });
  // const elapsedTime = clock.getElapsedTime();
  // group.rotation.y = Math.sin(elapsedTime) * Math.PI * 2;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

function getMesh(color: string): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color })
  );
}

// function getPositionX(x: number): number {
//   return Math.sin((x / sizes.width - 0.5) * Math.PI * 2) * 3;
// }

// function getPositionZ(clientX: number): number {
//   return Math.cos((clientX / sizes.width - 0.5) * Math.PI * 2) * 3;
// }

// function getPositionY(clientY: number): number {
//   return (clientY / sizes.height - 0.5) * 5
// }