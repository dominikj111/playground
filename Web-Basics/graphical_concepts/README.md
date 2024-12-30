# Graphical Concepts Gallery

A collection of interactive graphical demonstrations and experiments built with
modern web technologies. This project showcases various graphical concepts and
implementations using TypeScript, Three.js, and other web technologies.

## Projects

### 🎴 Tarot Card Reading

An immersive 3D Tarot card reading experience that demonstrates Three.js
capabilities and interactive 3D graphics in the browser.

### ⚛️ React Counter Demo

A simple React (Preact) demonstration showcasing state management and event
handling with a clean, modern UI using Tailwind CSS.

## Technology Stack

- **Runtime**: Deno
- **Languages**: TypeScript, HTML, CSS
- **3D Graphics**: Three.js
- **UI Frameworks**: Preact
- **Styling**: Tailwind CSS
- **Development Server**: Custom Deno server with TypeScript support

## Getting Started

1. Make sure you have [Deno](https://deno.land/) installed
2. Clone this repository
3. Run the development server:
   ```bash
   deno task dev
   ```
4. Open your browser and navigate to `http://localhost:8000`

## Development

The project uses a custom Deno server that handles:

- Static file serving
- TypeScript compilation on-the-fly
- Live reloading during development

## Project Structure

- `/pages` - Individual project implementations
  - `/tarot` - 3D Tarot card reading experience
  - `/react` - Simple React counter demonstration
- `/utils` - Utility functions and helpers
- `server.ts` - Development server implementation
- `build.ts` - Build script for production deployment
- `prod_server.ts` - Production server implementation
- `deno.json` - Deno configuration and import maps
- `index.html` - Main application entry point
