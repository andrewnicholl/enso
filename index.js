const THREE = require("three");
import { TimelineMax, Expo } from "gsap/all";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#E5E5E5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// var geometry = new THREE.SphereGeometry(1, 50, 50);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

var light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff0000);
  }
}

render();

var tl = new TimelineMax({ paused: true });
tl.to(mesh.scale, 1, { x: 2, ease: Expo.easeOut });
tl.to(mesh.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
tl.to(mesh.position, 0.5, { x: 2, ease: Expo.easeOut });
tl.to(mesh.rotation, 0.5, { y: Math.PI * 0.5, ease: Expo.easeOut }, "=-1.5");

window.addEventListener("mousemove", onMouseMove);
