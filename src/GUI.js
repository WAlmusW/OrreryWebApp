// GUI.js
import { GUI } from "dat.gui";

export function setupGUI(params, centralSphere, revolvingSphere) {
  const gui = new GUI();
  gui.add(params, "radius", 1, 10).name("Orbit Radius");
  gui.add(params, "speed", 0.001, 0.05).name("Orbit Speed");
  gui
    .addColor(params, "centralColor")
    .name("Central Color")
    .onChange(() => {
      centralSphere.material.color.set(params.centralColor);
    });
  gui
    .addColor(params, "revolvingColor")
    .name("Revolving Color")
    .onChange(() => {
      revolvingSphere.material.color.set(params.revolvingColor);
    });
}
