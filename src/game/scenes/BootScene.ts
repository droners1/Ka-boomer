import Phaser from 'phaser';
import { Config } from '../../config';
import { SpriteMaker } from '../art/makeSprites';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    console.log('BootScene: Game initialized successfully');
    
    // Set up camera and world bounds
    this.cameras.main.setBackgroundColor('#87CEEB');
    this.physics.world.setBounds(0, 0, Config.WORLD_WIDTH, Config.WORLD_HEIGHT);
    
    // Create all game sprites
    SpriteMaker.createAllSprites(this);
    
    // Add a simple text to confirm the scene is working
    this.add.text(Config.WORLD_WIDTH / 2, Config.WORLD_HEIGHT / 2, 'Jetpack Runner - Boot Complete!', {
      fontSize: '32px',
      color: '#000',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    
    // Add resolution info
    this.add.text(Config.WORLD_WIDTH / 2, Config.WORLD_HEIGHT / 2 + 50, 
      `Resolution: ${Config.WORLD_WIDTH}x${Config.WORLD_HEIGHT}`, {
      fontSize: '16px',
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    
    // Add scale info
    this.add.text(Config.WORLD_WIDTH / 2, Config.WORLD_HEIGHT / 2 + 80, 
      `Scale Mode: FIT`, {
      fontSize: '16px',
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5);
    
    // Add click to start instruction
    this.add.text(Config.WORLD_WIDTH / 2, Config.WORLD_HEIGHT / 2 + 120, 
      'Click anywhere to start the game', {
      fontSize: '20px',
      color: '#0066CC',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#FFF',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5);
    
    // Add debug button
    this.add.text(Config.WORLD_WIDTH / 2, Config.WORLD_HEIGHT / 2 + 160, 
      'Or click here for DEBUG', {
      fontSize: '16px',
      color: '#FF0000',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#FFF',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    
    // Set up click to start
    this.input.once('pointerdown', () => {
      this.scene.start('GameScene');
    });
    
    // Set up debug button
    this.input.once('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.y > Config.WORLD_HEIGHT / 2 + 140) {
        this.scene.start('DebugScene');
      } else {
        this.scene.start('GameScene');
      }
    });
    
    // Log successful initialization
    console.log(`BootScene: Canvas size: ${this.game.canvas.width}x${this.game.canvas.height}`);
    console.log(`BootScene: World size: ${Config.WORLD_WIDTH}x${Config.WORLD_HEIGHT}`);
    console.log(`BootScene: Scale mode: ${this.scale.scaleMode}`);
  }
}
