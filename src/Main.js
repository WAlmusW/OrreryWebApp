// Main.js
import { createScene } from "./Scene";
import { createCamera } from "./Camera";
import { createRenderer } from "./Renderer";
import { addLights } from "./Lights";
import { createCentralSphere, createRevolvingSphere } from "./Spheres";
import { createOrbitControls, createTrackballControls } from "./Controls";
import { setupGUI } from "./GUI";
import { setupEventListeners } from "./Events";
import * as THREE from "three";

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

addLights(scene);

const centralSphere = createCentralSphere();
scene.add(centralSphere);

const revolvingSphere = createRevolvingSphere();
scene.add(revolvingSphere);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let controls = createOrbitControls(camera, renderer);
let trackballControls = null;

// Parameters for animation
const params = {
  radius: 3,
  speed: 0.01,
  centralColor: "#0077ff",
  revolvingColor: "#ff7700",
};

setupGUI(params, centralSphere, revolvingSphere);

setupEventListeners(
  raycaster,
  mouse,
  camera,
  revolvingSphere,
  switchToTrackballControls,
  showDescription
);

// Orbit points (for the revolving sphere's path)
const orbitPoints = [];
const numSegments = 100;
for (let i = 0; i <= numSegments; i++) {
  const theta = (i / numSegments) * Math.PI * 2;
  orbitPoints.push(
    new THREE.Vector3(
      params.radius * Math.cos(theta),
      0,
      params.radius * Math.sin(theta)
    )
  );
}
const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
scene.add(orbitLine);

// Animation loop
let angle = 0;
let isFollowingRevolvingSphere = false;

function animate() {
  requestAnimationFrame(animate);

  // Update the revolving sphere's position
  angle += params.speed;
  revolvingSphere.position.x = params.radius * Math.cos(angle);
  revolvingSphere.position.z = params.radius * Math.sin(angle);

  // Update camera controls
  if (isFollowingRevolvingSphere && trackballControls) {
    const offset = 2;
    const direction = new THREE.Vector3(2, 0, 0).normalize();
    const spherePosition = revolvingSphere.position.clone();
    const newCameraPosition = spherePosition.addScaledVector(direction, offset);
    camera.position.lerp(newCameraPosition, 0.1);

    trackballControls.target.copy(revolvingSphere.position);
    trackballControls.update();
  } else {
    controls.update();
  }

  renderer.render(scene, camera);
}

animate();

// Helper functions for camera control and description

function switchToTrackballControls() {
  controls.enabled = false;
  if (!trackballControls) {
    trackballControls = createTrackballControls(camera, renderer);
  }
  trackballControls.target.copy(revolvingSphere.position);
  isFollowingRevolvingSphere = true;
}

function showDescription(title, description, showCloseButton = false) {
  const descriptionDiv = document.getElementById("description");
  descriptionDiv.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
  if (showCloseButton) {
    descriptionDiv.innerHTML += '<button id="closeButton">Close</button>';
    document
      .getElementById("closeButton")
      .addEventListener("click", closeDescription);
  }
  descriptionDiv.style.display = "block";
}

function closeDescription() {
  const descriptionDiv = document.getElementById("description");
  descriptionDiv.style.display = "none";
  returnCameraToCentralSphere();
}

function returnCameraToCentralSphere() {
  isFollowingRevolvingSphere = false;
  if (trackballControls) {
    trackballControls.dispose();
    trackballControls = null;
  }
  controls.enabled = true;
  controls.target.copy(centralSphere.position);
}
