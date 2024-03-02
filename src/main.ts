import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

function getMesh(color: string): THREE.Mesh {
  return new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color })
  );
}

// Meshes
const mesh1 = getMesh('orange');
const mesh2 = getMesh('blue');
const mesh3 = getMesh('white');

// Camera
const sizes = { width: 750, height: 750 }
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
group.rotation.set(Math.PI * 0.25, Math.PI * 0.25, Math.PI * 0.75);

// Setup camera
camera.position.set(1, 1, 5);
camera.lookAt(group.position);

// Renderer
if (!canvas) throw new Error('Canvas not found');

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();
tick();

function tick() {
  const elapsedTime = clock.getElapsedTime();
  group.rotation.y = Math.sin(elapsedTime) * Math.PI * 2;

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}

console.log(gsap);