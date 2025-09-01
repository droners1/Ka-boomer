import Phaser from 'phaser';
import { BootScene } from './game/scenes/BootScene';
import { GameScene } from './game/scenes/GameScene';
import { DebugScene } from './game/scenes/DebugScene';
import { Config } from './config';

// Game configuration
const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: Config.WORLD_WIDTH,
  height: Config.WORLD_HEIGHT,
  parent: 'game',
  backgroundColor: '#87CEEB', // Sky blue background
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }, // We'll handle gravity manually for better control
      debug: false
    }
  },
  scene: [BootScene, GameScene, DebugScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  render: {
    pixelArt: false,
    antialias: true
  }
};

// Create and start the game
const game = new Phaser.Game(gameConfig);

// Export for debugging
(window as any).game = game;
