"use strict";
exports.__esModule = true;
/*
 * @Descripttion:
 * @version:
 * @Author: tinghai
 * @Date: 2022-12-10 20:52:55
 */
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
// 片元着色器
var fragement_glsl_1 = require("./fragement.glsl");
var scene = new THREE.Scene();
var geometry = new THREE.PlaneGeometry(2, 2);
// 创建透视相机
var camera = new THREE.PerspectiveCamera(90, window.innerHeight / window.innerHeight, 0.1, 1000);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(0, 0, 2);
// 更新摄像头
camera.aspect = window.innerWidth / window.innerHeight;
//   更新摄像机的投影矩阵
camera.updateProjectionMatrix();
scene.add(camera);
var uniforms = {
    u_time: {
        type: "f",
        value: 1.0
    },
    u_resolution: {
        type: "v2",
        value: new THREE.Vector2()
    },
    u_mouse: {
        type: "v2",
        value: new THREE.Vector2()
    }
};
var rawShaderMaterial = new THREE.ShaderMaterial({
    fragmentShader: fragement_glsl_1["default"],
    // wireframe: true,
    side: THREE.DoubleSide,
    uniforms: uniforms
});
document.onmousemove = function (e) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
};
// 创建平面
var floor = new THREE.Mesh(geometry, rawShaderMaterial);
scene.add(floor);
// 初始化渲染器
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
// 设置渲染尺寸大小
onWindowResize();
window.addEventListener("resize", onWindowResize, false);
// 将渲染器添加到body
document.body.appendChild(renderer.domElement);
// 初始化控制器
var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转
var clock = new THREE.Clock();
function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}
function animate() {
    var elapsedTime = clock.getElapsedTime();
    rawShaderMaterial.uniforms.u_time.value = elapsedTime;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
