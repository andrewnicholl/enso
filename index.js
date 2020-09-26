const THREE = require("three");
import {
  TimelineMax,
  Expo
} from "gsap/all";
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor("#CDCDDF");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Sphere
var geometry = new THREE.SphereGeometry(2, 50, 50);
var material = new THREE.MeshLambertMaterial({
  color: 0xCDCDDF
});
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Orbit Controls
var controls = new OrbitControls(camera, renderer.domElement);
controls.update();


// Light Source
var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(-10, 20, 60);
scene.add(light);


var render = function () {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
};

render();