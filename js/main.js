import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let container,
  camera,
  scene,
  renderer,
  sphere1,
  sphere2,
  cone,
  box,
  group,
  capsule1,
  capsule2,
  capsule3,
  controls;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  group = new THREE.Group();
  scene.add(group);

  const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32);
  const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xb7e0ff });
  cone = new THREE.Mesh(coneGeometry, coneMaterial);
  group.add(cone);
  cone.position.set(0, 0.2, 0);
  cone.rotation.x = Math.PI;

  const sphereGeometry1 = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial1 = new THREE.MeshPhongMaterial({ color: 0xfff5cd });
  sphere1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
  group.add(sphere1);
  sphere1.position.set(0, 1.5, 0);

  const sphereGeometry2 = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial2 = new THREE.MeshPhongMaterial({ color: 0xffcfb3 });
  sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
  group.add(sphere2);
  sphere2.position.set(0, 1, 0);

  const capsuleGeometry = new THREE.CapsuleGeometry(0.05, 0.02, 2, 8);
  const capsuleMaterial = new THREE.MeshPhongMaterial({ color: 0xe78f81 });

  capsule1 = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  group.add(capsule1);
  capsule1.position.set(0.2, 2, 0);

  capsule2 = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  group.add(capsule2);
  capsule2.position.set(-0.2, 2, 0);

  capsule3 = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
  group.add(capsule3);
  capsule3.position.set(0, 2, 0.2);

  const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
  const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080,
    wireframe: true,
  });
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  group.add(box);
  box.position.set(0, 1.5, 0);

  camera.position.set(4, 4, 6);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  camera.lookAt(axesHelper.position);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 100;
}

function animate() {
  group.rotation.x += 0.001;
  group.rotation.y += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener("resize", resize, false);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
