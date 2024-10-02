// Events.js
import * as THREE from "three";

export function setupEventListeners(
  raycaster,
  mouse,
  camera,
  revolvingSphere,
  switchToTrackballControls,
  showDescription
) {
  window.addEventListener("click", (event) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1 for both components)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check if the revolving sphere is clicked
    const intersects = raycaster.intersectObject(revolvingSphere);
    if (intersects.length > 0) {
      // Switch to TrackballControls
      switchToTrackballControls();
      showDescription(
        "Revolving Sphere",
        "This is a sphere orbiting around the central object.",
        true
      );
    }
  });
}
