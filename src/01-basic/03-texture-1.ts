/*
 * @Descripttion:
 * @version:
 * @Author: tinghai
 * @Date: 2022-11-26 10:43:52
 */
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 目标：基础材质与纹理

// 1、创建场景
const scene = new THREE.Scene();
// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 导入纹理
const textureLoader = new THREE.TextureLoader();
//注意图片需要放在public下面，需要能访问的地址，放在assets不行
//这个是异步的
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");

console.log(doorColorTexture);
// 设置纹理偏移
// doorColorTexture.offset.x = -0.2;
// doorColorTexture.offset.y = 0.5;
// doorColorTexture.offset.set(0.5, 0.5);
// 纹理旋转
// 设置旋转的原点
// doorColorTexture.center.set(0.5, 0.5);
// // 旋转45deg
// doorColorTexture.rotation = Math.PI / 4;
// 设置纹理的重复
// doorColorTexture.repeat.set(2, 3);
// // 设置纹理重复的模式
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
// doorColorTexture.wrapT = THREE.RepeatWrapping;

// texture纹理显示设置
// doorColorTexture.minFilter = THREE.NearestFilter;
// doorColorTexture.magFilter = THREE.NearestFilter;
//当一个纹素覆盖小于一个像素时，贴图将如何采样
doorColorTexture.minFilter = THREE.LinearFilter;
//当一个纹素覆盖大于一个像素时，贴图将如何采样
doorColorTexture.magFilter = THREE.LinearFilter;

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  // transparent: true,
  // opacity: 0.3,
  // side: THREE.DoubleSide,
  // wireframe: true,
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
// // 使用渲染器，通过相机将场景渲染进来
setTimeout(() => {
  renderer.render(scene, camera);
}, 2000);

document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

function render() {
  controls.update();
  cube.rotateX(0.01);
  cube.rotateY(0.01);
  renderer.render(scene, camera);
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
