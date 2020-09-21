const THREE = require('three');
import { TimelineMax, Expo } from 'gsap/all'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor('#E5E5E5');
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

// var geometry = new THREE.SphereGeometry(1, 50, 50);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
var mesh = new THREE.Mesh(geometry, material);


scene.add(mesh);

var light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);


var render = function() {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
}

render();

var tl = new TimelineMax().delay(.3);
tl.to(mesh.scale, 1, {x: 2, ease: Expo.easeOut})
tl.to(mesh.scale, .5, {x: .5, ease: Expo.easeOut})
tl.to(mesh.position, .5, {x: 2, ease: Expo.easeOut})
tl.to(mesh.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")