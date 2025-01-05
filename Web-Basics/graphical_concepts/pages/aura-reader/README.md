# Aura Reader

## Overview

An interactive web application that visualizes a person's aura based on:

1. A 20-question personality survey
2. Webcam image analysis of the person's colors and lighting
3. Optional personal photo upload for aura visualization

The application combines psychological insights from the survey with visual data
analysis to generate a multi-layered aura visualization around the person's
image.

## Technical Goals

- [ ] Create framework-agnostic core modules:
  - [ ] Camera capture and image processing module
  - [ ] Color analysis engine
  - [ ] Aura visualization renderer
  - [ ] Survey data processing and scoring system
- [ ] Implement UI components:
  - [ ] Survey interface using Preact
  - [ ] Camera/image upload controls
  - [ ] Aura visualization display
- [ ] Build adapter interfaces for core functionality to be
      framework-independent

## Dependencies

Core (Vanilla):

- Media Capture and Streams API for webcam access
- Canvas API for image processing and visualization
- File API for image uploads

UI Layer:

- Preact for survey interface
- CSS Animations for aura effects

## Development Notes

### Implementation Considerations

- Core functionality should be framework-agnostic
- Survey questions should be carefully crafted to map to specific aura
  characteristics
- Color analysis should account for ambient lighting conditions
- Aura visualization should be smooth and visually appealing

### Technical Approach

1. Develop core modules in vanilla JavaScript:
   - Camera/image processing module using navigator.mediaDevices.getUserMedia
   - Color analysis algorithms using Canvas API
   - Aura visualization engine
   - Survey data processing system
2. Create clean interfaces for core functionality
3. Implement Preact-based survey UI
4. Design layered visualization system using CSS animations
5. Implement responsive UI with progressive enhancement

### Challenges

- Accurate color analysis under varying lighting conditions
- Creating meaningful correlations between survey answers and aura
  characteristics
- Maintaining clean separation between core logic and UI components

### Resources Recommendation

- link to
  [Media Capture and Streams API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API)
- link to
  [followed color theory documentation reference](https://en.wikipedia.org/wiki/Color_theory)
- link to
  [followed research on aura interpretation and color psychology](https://en.wikipedia.org/wiki/Aura_(psychology))
