"use strict";
exports.__esModule = true;
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var dat = require("dat.gui");
// 顶点着色器
var vertex_glsl_1 = require("./vertex.glsl");
// 片元着色器
var fragment_glsl_1 = require("./fragment.glsl");
// 目标：认识shader
//创建gui对象
var gui = new dat.GUI();
// console.log(THREE);
// 初始化场景
var scene = new THREE.Scene();
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
// 加入辅助轴，帮助我们查看3维坐标轴
var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 加载纹理
// 创建纹理加载器对象
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load("./texture/ca.jpeg");
var params = {
    uFrequency: 10,
    uScale: 0.1
};
// const material = new THREE.MeshBasicMaterial({ color: "#00ff00" });
// 创建原始着色器材质
debugger;
var rawShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertex_glsl_1["default"],
    fragmentShader: fragment_glsl_1["default"],
    // wireframe: true,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: {
            value: 0
        },
        uTexture: {
            value: texture
        }
    }
});
// 创建平面
var floor = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), rawShaderMaterial);
console.log(floor);
scene.add(floor);
// 初始化渲染器
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.VSMShadowMap;
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 监听屏幕大小改变的变化，设置渲染的尺寸
window.addEventListener("resize", function () {
    //   console.log("resize");
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比例
    renderer.setPixelRatio(window.devicePixelRatio);
});
// 将渲染器添加到body
document.body.appendChild(renderer.domElement);
// 初始化控制器
var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转
// controls.autoRotate = true;
var clock = new THREE.Clock();
function animate(t) {
    var elapsedTime = clock.getElapsedTime();
    //   console.log(elapsedTime);
    rawShaderMaterial.uniforms.uTime.value = elapsedTime;
    requestAnimationFrame(animate);
    // 使用渲染器渲染相机看这个场景的内容渲染出来
    renderer.render(scene, camera);
}
animate(1000);
