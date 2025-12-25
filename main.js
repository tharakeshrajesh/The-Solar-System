import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(45);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeTexture = new THREE.TextureLoader().load('sun.png');
const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const donutGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const donuttexture = new THREE.TextureLoader().load('earth.png');
const donutMaterial = new THREE.MeshBasicMaterial({ map: donuttexture });
const donut = new THREE.Mesh(donutGeometry, donutMaterial);
scene.add(donut);

let prevt = 1;

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  if (t > prevt && prevt !== 1) {
    cube.rotation.y -= 0.01;
    cube.rotation.z -= 0.01;
  } else {
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
  }

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  prevt = t;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  donut.rotation.x += 0.01;
  donut.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
