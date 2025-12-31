# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-12-31

### Added
- Initial release of Bouncing Balls game
- HTML5 Canvas physics engine with realistic collisions
- Modal interface for creating balls with custom parameters
- Quick-add button (⚡) with default config (size: 20, speed: 5, color: Matrix green)
- Gyroscope support for mobile devices (DeviceOrientation API)
- Gravity physics affecting all balls
- Ball-to-ball elastic collisions
- Ball-to-wall perfect elastic bounces
- Matrix-themed UI with black and green color scheme
- Fira Code monospace font
- Floating action buttons (FAB) for quick actions:
  - Add ball (+)
  - Quick-add ball with defaults (⚡)
  - Clear all balls (🗑️)
  - Enable gyroscope (📱)

### Features
- **Physics Engine**:
  - Constant velocity (no decay)
  - Gravity continuously affecting balls
  - Perfect elastic collisions (no energy loss)
  - Realistic ball-to-ball collision detection
- **Mobile Support**:
  - DeviceOrientation API for gyroscope
  - DeviceMotion fallback for compatibility
  - Touch-optimized interface
  - Responsive design
- **Customization**:
  - Ball size: 5-50px
  - Ball speed: 1-10
  - Custom colors
- **Matrix Theme**:
  - Black background with green grid pattern
  - Neon green text and borders with glow effects
  - Fira Code monospace font
  - Color-coded action buttons

### Technical
- Pure vanilla JavaScript (ES6+)
- No external dependencies
- Optimized canvas rendering
- requestAnimationFrame for smooth animations
- GitHub Pages deployment ready

### Removed
- GitHub Actions workflow (using deploy from branch instead)
