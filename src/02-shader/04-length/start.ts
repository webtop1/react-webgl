/*
 * @Descripttion:
 * @version:
 * @Author: tinghai
 * @Date: 2022-12-10 20:52:55
 */
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 片元着色器
import fragmentShader from "./fragement.glsl";
import vertexShader from "./vertex.glsl";

const scene = new THREE.Scene();

var geometry = new THREE.PlaneGeometry(15, 15);

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerHeight / window.innerHeight,
  0.1,
  1000
);
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
    value: 1.0,
  },
  u_resolution: {
    type: "v2",
    value: new THREE.Vector2(),
  },
  u_mouse: {
    type: "v2",
    value: new THREE.Vector2(),
  },
};

debugger;

const rawShaderMaterial = new THREE.ShaderMaterial({
  fragmentShader: fragmentShader,
  vertexShader,
  wireframe: true,
  side: THREE.DoubleSide,
  uniforms,
});

document.onmousemove = function (e) {
  uniforms.u_mouse.value.x = e.pageX;
  uniforms.u_mouse.value.y = e.pageY;
};

// 创建平面
const floor = new THREE.Mesh(geometry, rawShaderMaterial);
scene.add(floor);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

// 设置渲染尺寸大小
onWindowResize();
window.addEventListener("resize", onWindowResize, false);

// 将渲染器添加到body
document.body.appendChild(renderer.domElement);

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转

const clock = new THREE.Clock();

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  const elapsedTime = clock.getElapsedTime();
  rawShaderMaterial.uniforms.u_time.value = elapsedTime;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
