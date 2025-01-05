import { h, render } from "https://esm.sh/preact@10.25.4";
import { jsx } from "https://esm.sh/preact@10.25.4/jsx-runtime";
import { CameraManager } from "./core/camera.js";
import { ColorAnalyzer } from "./core/colorAnalysis.js";
import { AuraVisualizer } from "./core/aura.js";

// Initialize core components
const cameraManager = new CameraManager();
const colorAnalyzer = new ColorAnalyzer();
const auraVisualizer = new AuraVisualizer();

// Basic Survey Component in Preact
function Survey() {
  return jsx("div", {
    class: "survey",
    children: [
      jsx("h2", { children: "Personality Survey" }),
      jsx("p", { children: "Coming soon: 20 questions to analyze your aura..." })
    ]
  });
}

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  // Setup camera controls
  const startButton = document.getElementById("start-camera");
  const captureButton = document.getElementById("capture-image");
  const fileInput = document.getElementById("image-upload");
  const statusDiv = document.createElement("div");
  statusDiv.style.textAlign = "center";
  statusDiv.style.margin = "10px";
  document.querySelector(".controls").appendChild(statusDiv);

  const updateStatus = (message) => {
    statusDiv.textContent = message;
    setTimeout(() => {
      statusDiv.textContent = "";
    }, 3000);
  };

  const updateButtonState = () => {
    if (cameraManager.isRunning()) {
      startButton.textContent = "Stop Camera";
      captureButton.disabled = false;
    } else {
      startButton.textContent = "Start Camera";
      captureButton.disabled = !cameraManager.hasImage();
    }
  };

  const processImage = (canvas) => {
    if (canvas) {
      const colors = colorAnalyzer.analyzeImage(canvas);
      const auraColor = colorAnalyzer.mapToAuraColors(colors);
      auraVisualizer.drawAura(auraColor);
      updateStatus(`Aura captured: ${auraColor}`);
      updateButtonState();
    }
  };

  startButton.addEventListener("click", async () => {
    try {
      const started = await cameraManager.startCamera();
      updateButtonState();
      updateStatus(started ? "Camera started" : "Camera stopped");
    } catch (err) {
      console.error("Failed to start camera:", err);
      updateStatus("Failed to start camera");
    }
  });

  captureButton.addEventListener("click", () => {
    const frame = cameraManager.captureFrame();
    processImage(frame);
  });

  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const canvas = await cameraManager.handleFileUpload(file);
        processImage(canvas);
        updateStatus("Image uploaded successfully");
      } catch (err) {
        console.error("Failed to process image:", err);
        updateStatus("Failed to process image");
      }
    }
  });

  // Initial button state
  updateButtonState();

  // Render Preact survey component
  const surveyContainer = document.getElementById("survey-container");
  if (surveyContainer) {
    render(jsx(Survey, {}), surveyContainer);
  }
});
