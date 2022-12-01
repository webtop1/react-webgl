"use strict";
exports.__esModule = true;
/*
 * @Descripttion:
 * @version:
 * @Author: tinghai
 * @Date: 2022-11-28 08:22:57
 */
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var dat = require("dat.gui");
var gui = new dat.GUI();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, 1, 1, 1000);
camera.position.set(150, 0, 200);
scene.add(camera);
camera.lookAt(scene.position);
var cub = new THREE.BoxGeometry(100, 100, 100);
var material = new THREE.MeshLambertMaterial({
    color: 0xffff00
});
var mesh = new THREE.Mesh(cub, material);
scene.add(mesh);
var point = new THREE.PointLight(0xff0000);
point.position.set(400, 400, 300); //点光源位置
scene.add(point); //点光源添加到场景中
var axes = new THREE.AxesHelper(110);
scene.add(axes);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var orbit = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
orbit.update();
function render() {
    // cub.rotateX(0.001);
    // cub.rotateY(0.0005);
    // cub.rotateZ(0.001);
    orbit.update();
    // console.log(scene);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
gui.add(camera.position, "x").min(-100).max(500).step(1).name("camera x");
gui.add(camera.position, "y").min(-100).max(500).step(1).name("camera y");
gui.add(camera.position, "z").min(-100).max(500).step(1).name("camera z");
render();
