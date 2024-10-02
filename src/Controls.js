// Controls.js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

export function createOrbitControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  return controls;
}

export function createTrackballControls(camera, renderer) {
  return new TrackballControls(camera, renderer.domElement);
}
