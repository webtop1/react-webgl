/*
 * @Descripttion:
 * @version:
 * @Author: tinghai
 * @Date: 2022-11-26 09:09:44
 */
import * as THREE from "three";

// init

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

function animation(time: number) {
  mesh.rotation.x = time / 20000;
  mesh.rotation.y = time / 10000;
  renderer.render(scene, camera);
}

// animation(1000);
