import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

//------------------------------------------Scene------------------------------------------
const scene = new THREE.Scene();

//------------------------------------------Lights------------------------------------------
const ambientLight = new THREE.AmbientLight("#ffffff", 0.35);
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.7);
directionalLight.castShadow = true;
directionalLight.position.set(0, 2, 0);
scene.add(ambientLight, directionalLight);
// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper)

//--------------------------------------Optimize ShadowMap Size------------------------------
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

//-------------------------------------------Resizing----------------------------------------
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

//-------------------------------------------boxMesh-----------------------------------------
// const boxGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
// const boxMaterial = new THREE.MeshStandardMaterial();
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// boxMesh.castShadow = true;
// boxMesh.position.y = 0.7;
// scene.add(boxMesh);

//----------------------------TorusKnot Mesh for testing shadow map types---------------------
const torusKnotGeometry = new THREE.TorusKnotBufferGeometry(0.2, 0.05);
const torusKnotMaterial = new THREE.MeshStandardMaterial();
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.castShadow = true;
torusKnotMesh.position.y = 0.7;
scene.add(torusKnotMesh);

//----------------------------------------planeMesh-------------------------------------------
const planeGeometry = new THREE.PlaneBufferGeometry(2.75, 2.75);
const planeMaterial = new THREE.MeshStandardMaterial();
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.rotation.x = -Math.PI * 0.5;
scene.add(planeMesh);

//------------------------------------------Camera--------------------------------------------
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
// camera.position.z = 0; // camera position when we want to optimize the shadow map
camera.position.z = 2; // camera position when we used TorusKnotGeometry
camera.position.y = 1;
scene.add(camera);

//------------------------------------------Renderer------------------------------------------
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
renderer.setSize(aspect.width, aspect.height);
//---------------------------------------ShadowMap Types-------------------------------------
// renderer.shadowMap.type = THREE.BasicShadowMap
// renderer.shadowMap.type = THREE.PCFShadowMap
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.shadowMap.type = THREE.VSMShadowMap;

//-----------------------------------------OrbitControls-------------------------------------
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//------------------------------------------Clock Class--------------------------------------
const clock = new THREE.Clock();

//--------------------------------------------Animate-----------------------------------------
const animate = () => {
  //--------------------------------------GetElapsedTime--------------------------------------
  const elapsedTime = clock.getElapsedTime();

  //-----------------------------------Moving Box on the x-axis-------------------------------
  // boxMesh.position.x = Math.sin(elapsedTime)

  //--------------------------------Rotating TorusKnot on the x-axis--------------------------
  torusKnotMesh.rotation.x = Math.sin(elapsedTime);

  //-----------------------------------Update Controls-----------------------------------------
  orbitControls.update();

  //--------------------------------------Renderer---------------------------------------------
  renderer.render(scene, camera);

  //----------------------------------RequestAnimationFrame------------------------------------
  window.requestAnimationFrame(animate);
};
animate();
