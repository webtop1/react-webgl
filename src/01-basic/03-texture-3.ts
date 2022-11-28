import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 目标：标准网格材质(MeshStandardMaterial)

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
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAoTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
//导入置换贴图
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
// 材质
// https://threejs.org/docs/index.html?q=MeshStandardMaterial#api/zh/materials/MeshStandardMaterial
//一种基于物理的标准材质，使用Metallic-Roughness工作流程。
// 基于物理的渲染（PBR）最近已成为许多3D应用程序的标准，例如Unity， Unreal和 3D Studio Max。
// 这种方法与旧方法的不同之处在于，不使用近似值来表示光与表面的相互作用，而是使用物理上正确的模型。 我们的想法是，不是在特定照明下调整材质以使其看起来很好，而是可以创建一种材质，能够“正确”地应对所有光照场景。
// 在实践中，该材质提供了比MeshLambertMaterial 或MeshPhongMaterial 更精确和逼真的结果，代价是计算成本更高。MeshStandardMaterial uses per-fragment shading。
// 请注意，为获得最佳效果，您在使用此材质时应始终指定environment map。
const material = new THREE.MeshStandardMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  transparent: true,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  displacementMap: doorHeightTexture,
  displacementScale: 0.1,
  //   opacity: 0.3,
  //   side: THREE.DoubleSide,
});
material.side = THREE.DoubleSide;
const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);
// 给cube添加第二组uv
cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

// 添加平面
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(1.5, 0, 0);

scene.add(plane);
// console.log(plane);
// 给平面设置第二组uv
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(light);
//直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();
