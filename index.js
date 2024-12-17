import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');

const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({ map: woodTexture });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-2, 1, 0);
scene.add(cube);

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 1, 0);
scene.add(sphere);

const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(0, 0, -2);
scene.add(cylinder);

const pointLight = new THREE.PointLight(0xffffff, 50, 50);
pointLight.position.set(1, 1, 1);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 5, 10);
controls.update();

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();
    pointLight.position.x = 5 * Math.sin(time);
    pointLight.position.z = 5 * Math.cos(time);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.y += 0.02;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.z += 0.01;

    controls.update();
    renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});