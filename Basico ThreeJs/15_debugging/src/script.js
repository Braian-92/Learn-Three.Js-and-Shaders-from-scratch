import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//-------------------------------------Scene-------------------------------------
const scene = new THREE.Scene();

//-----------------------------------Debugging-----------------------------------
const gui = new dat.GUI();

//------------------------------materialColor object-----------------------------
const materialColor = {
  color: 0xffffff,
};

//-------------------------------------Resizing----------------------------------
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

//-------------------------------------Mesh-------------------------------------
const geometry = new THREE.PlaneBufferGeometry(1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//----------------------------------GUI patterns--------------------------------
//1)Range
gui.add(mesh.position, "x").min(-3).max(3).step(0.1).name("X MeshOne");
//2)Boolean
gui.add(material, "wireframe");
//3)Color
gui.addColor(materialColor, "color").onChange(() => {
  material.color.set(materialColor.color);
});

//-------------------------------------Camera-------------------------------------
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
scene.add(camera);

//-------------------------------------Renderer-------------------------------------
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//----------------------------------OrbitControls------------------------------------
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//-----------------------------------Clock Class-------------------------------------
const clock = new THREE.Clock();

//-------------------------------------Animate---------------------------------------
const animate = () => {
  //--------------------------------GetElapsedTime-----------------------------------
  const elapsedTime = clock.getElapsedTime();

  //---------------------------------Update Controls---------------------------------
  orbitControls.update();

  //------------------------------------Renderer-------------------------------------
  renderer.render(scene, camera);

  //------------------------------RequestAnimationFrame------------------------------
  window.requestAnimationFrame(animate);
};
animate();
