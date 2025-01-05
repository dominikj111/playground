# Aura Reader

## Overview

An interactive web application that visualizes a person's aura based on:

1. A 3-question personality survey about emotional state, energy type, and life purpose
2. Webcam image analysis of the person's colors and lighting
3. Emoji-based mood selection
4. Optional personal photo upload for aura visualization

The application combines user input from the survey and mood selection with visual data
analysis to generate a multi-layered aura visualization around a human silhouette.

## Current Features

### Core Modules
- [x] Camera capture and image processing
  - Webcam access and control
  - Image capture functionality
  - File upload support
- [x] Color analysis engine
  - Basic color mapping
  - Color-to-aura translation
- [x] Aura visualization renderer
  - Multi-layer aura visualization
  - Human silhouette integration
  - Mood-based glow effects
- [x] Survey system
  - 3 key questions about personality
  - Emoji-based mood selection
  - Basic answer processing

### UI Components
- [x] Survey interface (Preact)
  - Question display and answer collection
  - Emoji mood selector
  - Interactive option selection
- [x] Camera controls
  - Start/stop webcam
  - Capture image
  - Upload image file
- [x] Aura visualization display
  - Real-time updates
  - Multi-layer rendering
  - Mood-based effects

## Dependencies

Core (Vanilla):
- Media Capture and Streams API for webcam access
- Canvas API for image processing and visualization
- File API for image uploads

UI Layer:
- Preact for survey interface
- SVG for human silhouette

## Technical Implementation

### Core Architecture
1. Framework-agnostic core modules:
   - `camera.js`: Handles webcam and file input
   - `colorAnalysis.js`: Processes image colors
   - `aura.js`: Manages visualization
   - `survey.tsx`: Handles user input

### Features in Development
- Expanding survey to include more questions
- Adding smooth transitions and animations
- Improving color analysis accuracy
- Enhancing visual effects

### Known Limitations
- Basic color analysis without ambient light compensation
- Limited number of survey questions
- Simple aura layer transitions

## Resources
- [Media Capture and Streams API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API)
- [Color theory documentation reference](https://en.wikipedia.org/wiki/Color_theory)
- [Aura interpretation and color psychology](https://en.wikipedia.org/wiki/Aura_(psychology))

## Future Enhancements
- Expand to 20-question personality survey
- Add ambient light compensation
- Implement smooth CSS animations
- Improve aura visualization effects
- Add comprehensive scoring system
