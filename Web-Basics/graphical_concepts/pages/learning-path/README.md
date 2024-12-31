# Learning Path Game

An interactive, board game-style learning path application built with Preact.
This application provides a visual and engaging way to progress through learning
modules, with a game-like experience.

## Features

- 🎮 **Game-Like Interface**: Visual path with connected modules resembling a
  board game
- 🔄 **Progressive Learning**: Modules unlock as you complete prerequisites
- 🎯 **Clear Progress Tracking**: Visual indicators and progress bar
- 🏆 **Achievement System**: Certificate awarded upon completion
- 💫 **Interactive UI**: Hover effects and animations for better engagement

## Technical Details

### Built With

- **Framework**: Preact 10.25.4
- **Language**: TypeScript
- **Styling**: CSS3 with animations

### Architecture

The application consists of several key components:

1. **Module System**
   - Each module has a title, description, and dependencies
   - Modules are positioned on a path using x,y coordinates
   - Dependencies control access to subsequent modules

2. **Path Layout**
   - Snake-like pattern of connected tiles
   - Visual representation of learning progression
   - Green tiles with varying shades for visual interest

3. **Interactive Elements**
   - Hover effects for module information
   - Modal system for module completion
   - Progress tracking with visual feedback

## Usage

1. Start with the first module (unlocked by default)
2. Click on a module to view its details
3. Complete the module to unlock connected modules
4. Progress through the path until all modules are complete
5. Receive a certificate upon completion

## Module Structure

```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  contentUrl: string;
  position: { x: number; y: number };
  dependencies: string[];
  completed: boolean;
}
```

## Customization

The learning path can be customized by modifying:

- `INITIAL_MODULES`: Define your own modules and their dependencies
- `PATH_TILES`: Adjust the path layout and length
- CSS styles: Modify colors, animations, and visual effects

## Future Enhancements

- Add content integration for modules
- Implement save/load progress functionality
- Add more interactive elements and animations
- Include achievement badges for module completion
