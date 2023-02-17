/*
 * @Descripttion:
 * @version:
 * @Author: tinghai
 * @Date: 2022-12-06 16:58:30
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(400, 0, 200);
camera.lookAt(scene.position);
scene.add(camera);

var cub = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
  // wireframe: true,
});

var mesh = new THREE.Mesh(cub, material);
scene.add(mesh);

var light = new THREE.PointLight(0xffffff);
light.position.set(800, 400, 300);
scene.add(light);

var light1 = new THREE.AmbientLight(0x000040);
scene.add(light1);

var renderer = new THREE.WebGLRenderer();
// renderer.clearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var orbit = new OrbitControls(camera, renderer.domElement);

function render() {
  orbit.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
