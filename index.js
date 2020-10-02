const THREE = require("three");
import {
  TimelineMax,
  Expo
} from "gsap/all";
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

// SCENE
var scene = new THREE.Scene();

// CAMERA 
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
camera.rotateOnAxis = true;
var renderer = new THREE.WebGLRenderer({
  antialias: true
});

// MOUSE TRACKING
var mouseX = 0;
var mouseY = 0;
var targetX = 0;
var targetY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// GSAP
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// SPHERE
var geometry = new THREE.SphereGeometry(2, 50, 50);
var material = new THREE.MeshLambertMaterial({
  color: 0xCDCDDF
});
var mesh = new THREE.Mesh(geometry, material);

// SETS BACKGROUND, SIZE, AND ADDS CANVAS
renderer.setClearColor("#CDCDDF");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// KEEPS ASPECT RATIO ON RESIZE
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ADDS THE SPHERE
scene.add(mesh);

// // ORBIT
// var controls = new OrbitControls(camera, renderer.domElement);
// controls.update();


// LIGHTS
var light = new THREE.PointLight(0xCDCDDF, 1, 1000);
light.position.set(-10, 20, 60);
scene.add(light);


// EVENTS
document.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {

  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);

  console.log(mouseX, mouseY);


}
var animate = function () {
  requestAnimationFrame(render);
  render();
};

var render = function () {
  targetX = mouseX * .001;
  targetY = mouseY * .001;

  if (mesh) {
    mesh.rotation.y += 0.05 * (targetX - mesh.rotation.y);
    mesh.rotation.x += 0.05 * (targetY - mesh.rotation.x);
  }

  renderer.render(scene, camera);
};

animate();