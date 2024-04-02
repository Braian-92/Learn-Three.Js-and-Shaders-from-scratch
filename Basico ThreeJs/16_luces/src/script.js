import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//-------------------------------------------Scene------------------------------------------
const scene = new THREE.Scene();

//-----------------------------------------Debugging----------------------------------------
const gui = new dat.GUI();

//------------------------------------------Lights------------------------------------------
//---------------------------------------1)AmbientLight-------------------------------------
// const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
// scene.add(ambientLight);
// gui
//   .add(ambientLight, "intensity")
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .name("Intensity One");

//-------------------------------------2)DirectionalLight-------------------------------------
// const directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
// directionalLight.position.set(0, 2, 0);
// scene.add(directionalLight);
// gui
//   .add(directionalLight, "intensity")
//   .min(0)
//   .max(1)
//   .step(0.01)
//   .name("Intensity Two");
// gui.add(directionalLight.position, "x").min(-3).max(3).step(0.01).name("X Dir");
// gui.add(directionalLight.position, "y").min(-3).max(3).step(0.01).name("Y Dir");

//-------------------------------------DirectionalLightHelper------------------------------------
// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);

//-------------------------------------3)HemisphereLight-----------------------------------------
// const hemisphereLight = new THREE.HemisphereLight("blue","yellow",1);
// scene.add(hemisphereLight)

//-------------------------------------HemisphereLightHelper-------------------------------------
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
// scene.add(hemisphereLightHelper);

//-------------------------------------4)PointLight----------------------------------------------
// const pointLight = new THREE.PointLight("red", 0.8, 3);
// gui.add(pointLight.position, "x").min(-3).max(3).step(0.01).name("X Point");
// gui.add(pointLight.position, "y").min(-3).max(3).step(0.01).name("Y Point");
// gui.add(pointLight.position, "z").min(-3).max(3).step(0.01).name("Z Point");
// scene.add(pointLight);

//-------------------------------------PointLightHelper-------------------------------------------
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);

//-------------------------------------5)RectAreaLight---------------------------------------------
// const rectAreaLight = new THREE.RectAreaLight("#5D3FD3", 3, 2, 2);
// rectAreaLight.position.z = 0.5;
// scene.add(rectAreaLight);
// gui.add(rectAreaLight, "width").min(0).max(7).step(0.01).name("width");
// gui.add(rectAreaLight, "height").min(0).max(7).step(0.01).name("height");

//---------------------------------------6)SpotLight-----------------------------------------------
// const spotLight = new THREE.SpotLight(0xffffff, 1, 8, Math.PI * 0.25, 0.1, 1);
// gui.add(spotLight.position, "z").min(-3).max(3).step(0.01).name("Z Spot");
// gui.add(spotLight, "angle").min(0).max(3).step(0.01).name("Spot Angle");
// gui.add(spotLight, "penumbra").min(0).max(1).step(0.01).name("Spot Penumbra");
// spotLight.position.z = 2;
// scene.add(spotLight);
//----------------------------------------SpotLightHelper------------------------------------------
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);
//-------------------------------------------Resizing----------------------------------------------
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

//----------------------------------------------Mesh----------------------------------------------
// const geometry = new THREE.TorusBufferGeometry(0.3, 0.2, 64, 64);
// const material = new THREE.MeshStandardMaterial();
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

//--------------------------------RectAreaLight and SpotLight Mesh--------------------------------
const geometry = new THREE.PlaneBufferGeometry(10, 10, 64, 64);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//----------------------------------------------Camera--------------------------------------------
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
camera.position.z = 9; // camera position when we used RectAreaLight and SpotLight Mesh
scene.add(camera);

//----------------------------------------------Renderer-------------------------------------------
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//--------------------------------------------OrbitControls----------------------------------------
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//--------------------------------------------Clock Class-------------------------------------------
const clock = new THREE.Clock();
//----------------------------------------------Animate---------------------------------------------
const animate = () => {
  //-----------------------------------------GetElapsedTime-----------------------------------------
  const elapsedTime = clock.getElapsedTime();

  //-----------------------------------------Update Controls----------------------------------------
  orbitControls.update();

  //--------------------------------------------Renderer--------------------------------------------
  renderer.render(scene, camera);

  //---------------------------------------RequestAnimationFrame------------------------------------
  window.requestAnimationFrame(animate);
};
animate();
