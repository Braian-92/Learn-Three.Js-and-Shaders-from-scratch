import "./style.css"
import * as THREE from "three"

// ! instalar dependencias
// npm install 
// ! agregar three a las dependencias 
// npm install three
// ! ejecutar servidor local
// npm run dev


//Scene Mesh Camera Renderer

//Scene
const scene = new THREE.Scene();

//Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "purple", wireframe: true});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;

scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw"); //Select the canvas
const renderer = new THREE.WebGLRenderer({ canvas }); //add WeBGL Renderer
renderer.setSize(aspect.width, aspect.height); //Renderer size

//Clock Class
const clock = new THREE.Clock();

//Animate
const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //Update Rotation On X Axis and Y axis
  mesh.rotation.x = elapsedTime;
  mesh.rotation.y = elapsedTime * Math.PI * 2; //will rotate the cube a turn per second

  //Renderer
  renderer.render(scene, camera); //draw what the camera inside the scene captured

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();

//function will get called 60 times per second on some devices 0.01 * 60 = 0.6 on x-axis
//function will get called 120 times per second on some devices 0.01 * 120 = 0.12 on x-axis
//fps stands for frame per second
