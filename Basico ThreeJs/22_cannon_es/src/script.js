import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from 'cannon-es';

console.log(CANNON);

// npm install cannon-es

//Link to Cannon.js library
//cannon-es = https://pmndrs.github.io/cannon-es/docs/index.html

//Scene
const scene = new THREE.Scene();

//Resizing
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

//Lights
const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("#FFFFFF", 0.5);
directionalLight.castShadow = true;
directionalLight.position.set(5, 5, 0);
scene.add(directionalLight);

//Meshes
//1-Sphere Mesh
const sphereGeometry = new THREE.SphereGeometry(0.3, 32);
const sphereMaterial = new THREE.MeshStandardMaterial();
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.y = 5;
sphereMesh.castShadow = true;
scene.add(sphereMesh);

//2- Plane Mesh
const planeGeometry = new THREE.PlaneGeometry(15, 15);
const planeMaterial = new THREE.MeshStandardMaterial();
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.rotation.x = -Math.PI * 0.5;

scene.add(planeMesh);

//! 3 cuadrado
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const boxMaterial = new THREE.MeshStandardMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

boxMesh.position.set(1, 2, 0);
boxMesh.castShadow = true;
scene.add(boxMesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 5;
camera.position.y = 2;
scene.add(camera);

//! mundo fisico
const world = new CANNON.World();
world.gravity.set(0, -9.81, 0);

//! materiales fisicos
const concreteMaterial = new CANNON.Material('concrete');
const plasticMaterial = new CANNON.Material('plastic');

const plasticConcreteContactMaterial = new CANNON.ContactMaterial(
  plasticMaterial,
  concreteMaterial,
  {
    friction: 0.1,
    restitution: 0.7
  }
);

world.addContactMaterial(plasticConcreteContactMaterial);

//! forma esferica en mundo fisico
const sphericalShape = new CANNON.Sphere(0.3);
const sphereBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(0, 5, 0),
  shape: sphericalShape,
  material: plasticMaterial
});
world.addBody(sphereBody);

setInterval(() => {
  sphereBody.applyLocalForce(
    new CANNON.Vec3(0, 500, 0),
    new CANNON.Vec3(-0.1, 0, 0),
  );
  console.log('aplicar fuerza');
}, 5000);


//! forma plana en mundo fisico
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
  mass: 0,
  position: new CANNON.Vec3(0, 0, 0),
  shape: planeShape,
  material: concreteMaterial
});
planeBody.quaternion.setFromAxisAngle( new CANNON.Vec3(1, 0, 0), -Math.PI * 0.5 );
world.addBody(planeBody);

//! forma cuadrada en mundo físico
const boxShape = new CANNON.Box( new CANNON.Vec3(0.25, 0.25, 0.25) );
const boxBody = new CANNON.Body({
  mass: 1,
  position: new CANNON.Vec3(1, 2, 0),
  shape: boxShape,
  material: plasticMaterial
});

world.addBody(boxBody);


//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

let previusElapsedTime = 0;

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previusElapsedTime;
  previusElapsedTime = elapsedTime;


  //Update Controls
  orbitControls.update();

  //! actualizar mundo
  world.step(Math.min(deltaTime, 0.1));

  //! actualizar posición de elementos 3d en mundo fisico
  sphereMesh.position.copy(sphereBody.position);
  boxMesh.position.copy(boxBody.position);
  boxMesh.quaternion.copy(boxBody.quaternion);

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
