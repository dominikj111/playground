# Crystal Dreams: A Geometric Adventure

## Game Overview
Crystal Dreams is a contemplative 3D puzzle-adventure game that follows the journey of a self-evolving geometric being through a world of crystalline structures and abstract natural formations. The game emphasizes exploration, personal growth, and environmental puzzle-solving without combat elements.

## Core Mechanics

### Camera System
- Primary view: Side-scrolling perspective reminiscent of classic platformers
- Dynamic camera transitions to first-person view for specific puzzle-solving and discovery moments
- Smooth camera interpolation between perspectives

### Main Character - "The Prism"
- Begins as a simple geometric form (basic blockman)
- Evolves visually and functionally throughout the journey
- Gains abilities through collecting geometric components
- Can manipulate light and reflections as core gameplay mechanic

### World Design
- Geometric landscapes with crystal formations
- Semi-transparent structures with rainbow light refractions
- Fog effects that create dreamy, ethereal atmospheres
- Low-poly aesthetic with emphasis on light play
- Floating platforms and impossible geometries

## Level Structure

### Level 1: The Awakening
- Environment: Crystal Garden
- Theme: Basic movement and light manipulation
- Key Features:
  - Learning to harness rainbow light beams
  - Simple environmental puzzles
  - Collection of first geometric upgrades

### Level 2: The Ascension
- Environment: Floating Geometric Islands
- Theme: Advanced movement and puzzle complexity
- Key Features:
  - Light bridge creation
  - Prism splitting puzzles
  - Color-based environmental interactions

### Level 3: The Laboratory
- Environment: Abstract Research Facility
- Theme: Combining all learned skills
- Key Features:
  - Complex light reflection puzzles
  - Self-discovery narrative culmination
  - Final laboratory construction challenge

## Gameplay Features

### Time Manipulation
- Dynamic time control system (slow-motion to accelerated time)
- Particle and motion trail effects enhanced during slow-motion
- Special visual effects for time transitions
- Time manipulation UI indicator
- Specific puzzle scenarios designed around time control
- Camera effects tied to time speed changes

### Light Mechanics
- Rainbow light refraction puzzles
- Crystal prism manipulation
- Light beam redirection challenges
- Color-based activation systems

### Environmental Interactions
- Crystal growth/manipulation
- Geometric shape transformation
- Platform materialization through light
- Fog density manipulation

### Progression System
- Geometric shape collection
- Ability crystals
- Visual evolution of the character
- Laboratory component gathering

## Visual Style
- Minimalist geometric designs
- Dynamic rainbow color palette
- Volumetric fog effects
- Crystal transparency and reflections
- Inspired by projects like Tantalum for lighting effects
- Low-poly aesthetic with high-quality lighting

## Audio Design
- Ambient crystalline soundscape
- Geometric transformation sound effects
- Dynamic music that evolves with character progression
- Environmental audio cues for puzzle solving

## Technical Considerations
- Built with Bevy Engine
- Focus on shader effects for crystal and light mechanics
- Efficient geometry handling for smooth performance
- Physics system for character movement and environmental interaction
- Time-scale independent physics calculations
- Frame-rate independent time manipulation
- Smooth interpolation for time speed changes

## Unique Selling Points
1. Novel perspective-shifting camera system
2. Creative use of light and reflection mechanics
3. Non-violent, puzzle-focused gameplay
4. Evolving character progression through geometric collection
5. Dreamy, abstract aesthetic with rainbow color palette

## Target Experience
The game aims to create a meditative, engaging experience where players can:
- Explore a beautiful geometric world
- Solve creative puzzles without pressure
- Experience personal growth through collection and evolution
- Create and experiment with light and reflection
- Discover the mysteries of their own laboratory

## Future Expansion Possibilities
- Additional laboratory experiments
- New geometric forms and abilities
- Community puzzle creation tools
- Photo mode for capturing geometric arrangements
- Speed-running mode for puzzle enthusiasts

## Technical Implementation Details

### Core Dependencies
- `bevy` - Main game engine
- `bevy_rapier3d` - Physics engine for 3D collision detection and rigid body dynamics
- `bevy_atmosphere` - Atmospheric and lighting effects
- `rodio` - Minimal audio handling

### Module Structure
1. **Core Game State**
   - Game state management
   - Scene transitions
   - Save/load system

2. **Physics Module**
   - Character controller
   - Collision detection
   - Platform interactions
   - Crystal physics

3. **Rendering Module**
   - Custom shaders for crystal effects
   - Light reflection system
   - Fog effects
   - Camera system

4. **Audio Module**
   - Sound effect manager
   - Ambient sound system
   - Music player

5. **Puzzle System**
   - Puzzle state management
   - Interaction system
   - Validation system

6. **Character Module**
   - Evolution system
   - Ability management
   - Visual transformation

### Development Considerations
- Implement modular architecture for easy feature addition
- Use event system for loose coupling between modules
- Implement state machines for character and puzzle states
- Cache geometric meshes for performance
- Use instancing for repeated geometric elements
- Implement efficient light calculation system
- Consider level streaming for large environments
- Time-scale independent physics calculations
- Frame-rate independent time manipulation
- Smooth interpolation for time speed changes

## Testing Requirements

### Unit Tests
1. **Physics Tests**
   - Collision detection accuracy
   - Character movement boundaries
   - Platform stability
   - Crystal interaction physics

2. **Game Logic Tests**
   - State transitions
   - Puzzle completion validation
   - Character evolution triggers
   - Save/load functionality

3. **Rendering Tests**
   - Light reflection calculations
   - Shader performance
   - Camera transition smoothness
   - Fog effect boundaries

4. **Audio Tests**
   - Sound trigger accuracy
   - Audio mixing
   - Resource loading/unloading

### Integration Tests
- Complete level progression
- Character evolution pipeline
- Puzzle chains
- State persistence
- Performance under load

### Performance Tests
- FPS benchmarks
- Memory usage monitoring
- Asset loading times
- Physics simulation stability

### Test Automation
- Implement automated test pipeline
- Create test scenes for specific features
- Use property-based testing for physics
- Implement replay system for bug reproduction

### Quality Assurance
- Establish minimum FPS targets
- Define acceptable memory usage
- Set loading time limits
- Create visual regression tests for shaders
