import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//--------------------------------------------Scene--------------------------------------------
const scene = new THREE.Scene();

//--------------------------------------------Lights-------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

//--------------------------------------------FBXLoader-----------------------------------------
const fbxloader = new FBXLoader();

//------------------------------------------Loading Model---------------------------------------
const animations = [];
let animationMixer = null;
// //model
// fbxloader.load("models/model.fbx", (fbx) => {
//   animationMixer = new THREE.AnimationMixer(fbx);
//   // const clipAction = animationMixer.clipAction(animations[1].animations[0]);
//   // clipAction.play();
//   fbx.scale.set(0.01, 0.01, 0.01);
//   fbx.position.y = -0.8;
//   scene.add(fbx);
// });

// //first animation
// fbxloader.load("models/1.fbx", (fbx) => {
//   console.log(fbx);
//   animations.push(fbx);
// });

// //second animation
// fbxloader.load("models/2.fbx", (fbx) => {
//   console.log(fbx);
//   animations.push(fbx);
// });

// window.addEventListener("keydown", (e) => {
//   if (e.key === "1") {
//     animationMixer.stopAllAction();
//     const clipAction = animationMixer.clipAction(animations[0].animations[0]);
//     clipAction.play();
//   }
//   if (e.key === "2") {
//     animationMixer.stopAllAction();
//     const clipAction = animationMixer.clipAction(animations[1].animations[0]);
//     clipAction.play();
//   }
// });

const gltfLoader = new GLTFLoader();
gltfLoader.load("models/Tpose.glb", (glb) => {
  glb.scene.traverse((child) => {
    if (child.isMesh && child.name === "Hair") {
      child.material = new THREE.MeshBasicMaterial({ color: "red" });
      child.position.x = 1;
    }
  });
  glb.scene.position.y = -0.8;
  scene.add(glb.scene);
});

//--------------------------------------------Resizing--------------------------------------------
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//---------------------------------------------Camera---------------------------------------------
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
scene.add(camera);

//--------------------------------------------Renderer--------------------------------------------
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(aspect.width, aspect.height);

//------------------------------------------OrbitControls------------------------------------------
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//------------------------------------------Clock Class--------------------------------------------
const clock = new THREE.Clock();
let previousTime = 0;
const animate = () => {
  //---------------------------------------GetElapsedTime------------------------------------------
  const elapsedTime = clock.getElapsedTime();
  const frameTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  //------------------------------------Update animationMixer--------------------------------------
  if (animationMixer) {
    animationMixer.update(frameTime);
  }

  //---------------------------------------Update Controls-----------------------------------------
  orbitControls.update();

  //-----------------------------------------Renderer----------------------------------------------
  renderer.render(scene, camera);

  //-----------------------------------RequestAnimationFrame---------------------------------------
  window.requestAnimationFrame(animate);
};
animate();
