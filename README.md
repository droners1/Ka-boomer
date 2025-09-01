# Jetpack Runner

An endless runner game built with Phaser 3, TypeScript, and Vite. Control a jetpack-equipped character and dodge obstacles while collecting coins in this side-scrolling adventure.

## 🎮 Game Features

- **Jetpack Physics**: Hold SPACE to rise, release to fall with smooth, floaty controls
- **Endless Runner**: Continuously scrolling world with procedurally generated obstacles
- **Fair Spawning**: Intelligent obstacle placement ensures the game is always beatable
- **Collectibles**: Gather coins for points and power-ups for protection
- **Responsive Design**: Scales smoothly across different screen sizes

## 🚀 Tech Stack

- **Phaser 3**: Game framework for 2D games
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Fast build tool and dev server
- **Arcade Physics**: Simple 2D physics system

## 📁 Project Structure

```
src/
├── main.ts                 # Game entry point
├── config.ts               # Game configuration and constants
├── game/
│   ├── scenes/            # Game scenes (Boot, Menu, Game, etc.)
│   ├── objects/           # Game objects (Player, Bomb, Coin, etc.)
│   ├── systems/           # Game systems (Spawner, Score, etc.)
│   └── art/               # Sprite generation and art assets
└── public/                 # Static assets
```

## 🎯 Game Mechanics

### Controls
- **SPACE**: Hold to thrust upward, release to fall
- **Touch/Mouse**: Click and hold for mobile/touch devices

### Physics
- Custom gravity and thrust system for smooth movement
- Velocity clamping for consistent feel
- Collision detection with obstacles and collectibles

### Spawning Rules
- First 6 seconds are safe (no obstacles)
- Three-lane system for organized obstacle placement
- Minimum spacing between obstacle clusters
- Fair vertical gaps ensure passable paths

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/droners1/Ka-boomer.git
cd Ka-boomer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Configuration
All game constants are centralized in `src/config.ts`:
- Physics values (gravity, thrust, speed limits)
- Spawning rules and timing
- Game mechanics (lives, scoring, etc.)

## 🎨 Art Style

- **Code-generated SVG sprites** for lightweight assets
- **Parallax backgrounds** with multiple layers
- **Particle effects** for jetpack exhaust and trails
- **Clean, readable design** optimized for Chromebooks

## 🔧 Performance

- **Object pooling** for efficient memory management
- **60 FPS target** on mid-range devices
- **Optimized rendering** with proper depth layering
- **Efficient collision detection**

## 📱 Platform Support

- **Web browsers** (Chrome, Firefox, Safari, Edge)
- **Chromebooks** (primary target platform)
- **Mobile devices** (touch controls included)
- **Responsive scaling** for different screen sizes

## 🚧 Development Phases

This project is being developed in phases:

1. ✅ **Phase 0**: Project scaffolding and basic setup
2. ✅ **Phase 1**: Core player controller and physics
3. ✅ **Phase 2**: Obstacles and fair spawning
4. 🔄 **Phase 3**: Coins and shield power-ups
5. ⏳ **Phase 4**: Scoring, lives, and game over
6. ⏳ **Phase 5**: UI polish and persistence
7. ⏳ **Phase 6**: Art pass and parallax
8. ⏳ **Phase 7**: Audio implementation
9. ⏳ **Phase 8**: Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Play the Game

Visit the deployed version or run locally with `npm run dev` to start playing!

---

**Built with ❤️ using Phaser 3 and TypeScript**
