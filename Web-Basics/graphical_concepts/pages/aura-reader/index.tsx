import { h, render } from "https://esm.sh/preact@10.25.4";
import { useState } from "https://esm.sh/preact@10.25.4/hooks";
import { jsx } from "https://esm.sh/preact@10.25.4/jsx-runtime";
import { CameraManager } from "./core/camera.js";
import { ColorAnalyzer } from "./core/colorAnalysis.js";
import { AuraVisualizer } from "./core/aura.js";

// Initialize core components
const cameraManager = new CameraManager();
const colorAnalyzer = new ColorAnalyzer();
const auraVisualizer = new AuraVisualizer();

// Survey questions
const surveyQuestions = [
  {
    id: "emotional",
    text: "How would you describe your emotional state most of the time?",
    options: [
      { value: "calm", text: "Calm and peaceful", color: "blue" },
      { value: "passionate", text: "Passionate and energetic", color: "red" },
      { value: "balanced", text: "Balanced and centered", color: "green" },
      { value: "spiritual", text: "Spiritual and connected", color: "purple" }
    ]
  },
  {
    id: "energy",
    text: "What type of energy do you feel most connected to?",
    options: [
      { value: "earth", text: "Grounding Earth", color: "green" },
      { value: "fire", text: "Dynamic Fire", color: "red" },
      { value: "water", text: "Flowing Water", color: "blue" },
      { value: "air", text: "Free Air", color: "white" }
    ]
  },
  {
    id: "purpose",
    text: "What drives you most in life?",
    options: [
      { value: "creativity", text: "Creative Expression", color: "purple" },
      { value: "growth", text: "Personal Growth", color: "green" },
      { value: "connection", text: "Human Connection", color: "blue" },
      { value: "achievement", text: "Achievement", color: "yellow" }
    ]
  }
];

// Basic Survey Component in Preact
function Survey({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (questionId, value, color) => {
    const newAnswers = {
      ...answers,
      [questionId]: { value, color }
    };
    setAnswers(newAnswers);
    
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const colors = Object.values(newAnswers).map(a => a.color);
      onComplete(colors);
    }
  };

  const question = surveyQuestions[currentQuestion];

  return jsx("div", {
    className: "survey",
    children: [
      jsx("div", {
        className: "question-panel",
        children: [
          jsx("h3", { children: question.text }),
          jsx("div", {
            className: "options",
            children: question.options.map(option => 
              jsx("button", {
                key: option.value,
                className: `option-button ${answers[question.id]?.value === option.value ? 'selected' : ''}`,
                onClick: () => handleAnswer(question.id, option.value, option.color),
                children: option.text
              })
            )
          })
        ]
      }),
      jsx("div", {
        className: "progress",
        children: `Question ${currentQuestion + 1} of ${surveyQuestions.length}`
      })
    ]
  });
}

// Emoji Mood Component
function EmojiMood({ onMoodSelect }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
  };

  const moods = [
    { mood: "happy", emoji: "😊" },
    { mood: "calm", emoji: "😌" },
    { mood: "excited", emoji: "🤩" },
    { mood: "sad", emoji: "😢" },
    { mood: "angry", emoji: "😠" },
    { mood: "neutral", emoji: "😐" }
  ];

  return jsx("div", {
    className: "emoji-section",
    children: [
      jsx("h3", { children: "How are you feeling right now?" }),
      jsx("div", {
        className: "emoji-grid",
        children: moods.map(({ mood, emoji }) =>
          jsx("button", {
            key: mood,
            className: `emoji-button ${selectedMood === mood ? 'selected' : ''}`,
            onClick: () => handleMoodSelect(mood),
            children: emoji
          })
        )
      })
    ]
  });
}

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  let currentMood = null;
  let surveyColors = [];
  let capturedImageColors = null;

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

  const updateAura = () => {
    let colors = [];
    
    // Add survey colors
    if (surveyColors.length > 0) {
      colors = colors.concat(surveyColors);
    }
    
    // Add captured image colors
    if (capturedImageColors) {
      colors.push(capturedImageColors);
    }
    
    // If we have any colors, update the visualization
    if (colors.length > 0) {
      const mainColor = colors[0];
      auraVisualizer.drawAura(mainColor, colors.slice(1), currentMood);
    }
  };

  const handleSurveyComplete = (colors) => {
    surveyColors = colors;
    updateStatus("Survey results added to aura");
    updateAura();
  };

  const handleMoodSelect = (mood) => {
    currentMood = mood;
    updateStatus(`Mood updated: ${mood}`);
    updateAura();
  };

  const processImage = (canvas) => {
    if (canvas) {
      const colors = colorAnalyzer.analyzeImage(canvas);
      capturedImageColors = colorAnalyzer.mapToAuraColors(colors);
      updateStatus("Image colors added to aura");
      updateAura();
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

  // Render Preact components
  const surveyContainer = document.getElementById("survey-container");
  const emojiContainer = document.getElementById("emoji-container");
  
  if (surveyContainer) {
    render(jsx(Survey, { onComplete: handleSurveyComplete }), surveyContainer);
  }
  
  if (emojiContainer) {
    render(jsx(EmojiMood, { onMoodSelect: handleMoodSelect }), emojiContainer);
  }
});
