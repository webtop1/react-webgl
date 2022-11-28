/*
 * @Descripttion:
 * @version:
 * @Author: tinghai
 * @Date: 2022-11-28 08:22:57
 */
import * as THREE from "three";

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(90, 1, 0.1, 1000);
camera.position.set(300, 200, 150);
scene.add(camera);
camera.lookAt(scene.position);

// var ambient = new THREE.AmbientLight(0x444444);
// scene.add(ambient);

var cub = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  // wireframe: true,
});
var mesh = new THREE.Mesh(cub, material);
scene.add(mesh);

var pointLight = new THREE.PointLight(0xffffff, 1, 200);
pointLight.position.set(400, 200, 300);
scene.add(pointLight);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);
