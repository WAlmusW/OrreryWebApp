// Spheres.js
import * as THREE from "three";

export function createCentralSphere() {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  return new THREE.Mesh(geometry, material);
}

export function createRevolvingSphere() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xff7700 });
  return new THREE.Mesh(geometry, material);
}
