# Copilot Instructions for MyOffice Portfolio

This is a React + Three.js interactive 3D portfolio application using Vite as the build system.

## Architecture Overview

### Entry Point & Loading Pattern
- `src/index.jsx` is the main entry point that sets up the Canvas and preloads assets
- **Critical pattern**: Uses `useGLTF.preload()` and `useTexture.preload()` to start downloading 3D models before components mount
- Loading screen (`LoadingScreen.jsx`) shows terminal-style boot sequence with ASCII art while assets load
- Main app renders `<Canvas>` with `Experience` component after loading completes

### Core Components
- **Experience.jsx**: Main 3D scene orchestrator that combines all systems
- **Camera/Camera.js**: Custom hook `useCameraLogic()` handles interactive camera states (default view, desk view, zoomed states)
- **Render/Renderer.js**: Custom hook `useRenderer()` applies materials and textures to 3D scene objects
- **hooks/useAudioManager.js**: Web Audio API implementation with spatial audio effects and 'P' key toggle

### 3D Scene Architecture
- Uses baked lighting with texture file `BakedTexture(StickyNote).jpg`
- Model file: `MyOffice(StickyNote).glb` contains office scene with named objects
- **Key objects**: `Monitor_Glass_right`, `PC_Glass`, `Disc`, LED lights (`PC006`, `PC008`)
- Embedded iframe shows external portfolio site positioned in 3D space using `<Html>` from drei

### State Management Patterns
- Camera states: `isDeskView`, `isZoomedIn`, `isHovered` control view transitions
- Quality settings passed down from root App component
- Audio state managed through custom hook with global keyboard controls

## Code Change Explanations

**IMPORTANT**: When making any code changes, always explain:
- What specific changes you're making and why
- How the change fits into the existing architecture
- What patterns or concepts are being used
- Any potential side effects or considerations
- How the change improves the functionality or fixes the issue

This helps the developer learn and understand the codebase better.

## Development Workflows

### Build Commands
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build (outputs to `../dist` due to Vite config)
- `npm run deploy` - Builds and deploys to GitHub Pages

### Asset Management
- All assets in `public/assets/` - referenced with `./assets/` in code
- 3D models use `.glb` format, textures are `.jpg`
- Vite config sets `publicDir: "../public/"` and `base: "/MyOffice/"`

### Development Tips
- Use browser dev tools to inspect Three.js scene objects by name
- Camera positions logged to console during development
- Stats component shows FPS and render info
- Quality settings affect render performance

## Project-Specific Patterns

### Custom Hooks Pattern
- `useCameraLogic(scene)` - Pass scene object to enable object-based camera targeting
- `useRenderer(scene)` - Materials applied via scene traversal, memoized for performance
- `useAudioManager(audioUrl)` - Returns `{isPlaying, setIsPlaying}` state

### Scene Interaction
- Click anywhere (except quality panel) toggles between default and desk view
- Hover on monitor triggers zoom effect when in desk view
- Press 'P' key to play/pause ambient audio

### Animation System
- `DiscAnimation.jsx` rotates vinyl record based on audio playing state
- Uses `useFrame()` for smooth transitions with gradual acceleration/deceleration
- Scene objects accessed by name: `scene.getObjectByName('Disc')`

### Styling Conventions
- Terminal/retro aesthetic with green text on black background
- CSS uses `'Courier New'` and `'Monaco'` monospace fonts
- Loading screen implements typing effect for boot messages

## Key Files for Understanding
- `src/Experience.jsx` - Main scene composition and component integration
- `src/Camera/Camera.js` - Camera behavior and view state logic  
- `src/index.jsx` - Asset preloading and app structure
- `vite.config.js` - Build configuration with custom paths