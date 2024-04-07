import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";

//Scene
const scene = new THREE.Scene();

//Datgui
const gui = new dat.GUI();

//cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / window.innerWidth;
  cursor.y = e.clientX / window.innerHeight;
});

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

//Mesh
const geometry = new THREE.PlaneBufferGeometry(0.75, 0.75, 64, 64);
const material = new THREE.RawShaderMaterial({
  side: THREE.DoubleSide,
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms: {
    u_amplitude: { value: 12.0 },
    u_time: { value: 0.0 },
    u_color: { value: new THREE.Color("purple") },
    u_timecolor: { value: 0 },
    u_cursorcolor: { value: new THREE.Vector2(cursor.x, cursor.y) },
  },
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 1;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();

  //Update u_time
  material.uniforms.u_time.value = elapsedTime;

  //Update u_timeColor
  material.uniforms.u_timecolor.value = elapsedTime;

  //Update u_cursorcolor
  material.uniforms.u_cursorcolor.value.x = cursor.x;
  material.uniforms.u_cursorcolor.value.y = cursor.y;

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
