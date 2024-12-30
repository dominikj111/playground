# 3D Tarot Card Reading Experience

An interactive 3D Tarot card reading experience built with Three.js and
TypeScript. This application provides an immersive way to draw and view Tarot
cards in a 3D space.

## Features

- Interactive 3D environment with smooth animations
- Multiple card drawing options:
  - Draw a single card
  - Draw three cards
  - Draw five cards
- Reset functionality to clear the current reading
- Responsive design that adapts to window size
- Beautiful lighting effects with ambient and directional lights
- Anti-aliased rendering for smooth visuals

## Technical Implementation

The application is built using:

- Three.js for 3D graphics rendering
- TypeScript for type-safe code
- Deno for serving and running the application

The scene includes:

- Perspective camera setup
- Ambient and directional lighting
- Dynamic card positioning and rotation
- Smooth animations for card drawing and placement

## Usage

1. Open the page in your browser
2. Choose your desired reading type:
   - Click "Draw Single Card" for a simple reading
   - Click "Draw Three Cards" for a past-present-future spread
   - Click "Draw Five Cards" for a more detailed reading
3. Click "Reset" to clear the current reading and start over

## Development

The application uses Deno's built-in TypeScript support and serves the files
directly through a development server.
