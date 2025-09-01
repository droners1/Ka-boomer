import Phaser from 'phaser';
import { Config } from '../../config';

export class DebugScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DebugScene' });
  }
  
  create(): void {
    console.log('=== DEBUG SCENE STARTED ===');
    
    // Test 1: Basic graphics
    console.log('Test 1: Creating basic graphics');
    const testRect = this.add.rectangle(100, 100, 50, 50, 0xFF0000);
    console.log('Red rectangle created at:', testRect.x, testRect.y);
    
    // Test 2: Check if textures exist
    console.log('Test 2: Checking textures');
    console.log('Available textures:', Object.keys(this.textures.list));
    console.log('Bomb texture exists:', this.textures.exists('bomb'));
    console.log('Player texture exists:', this.textures.exists('player'));
    
    // Test 3: Try to create a bomb sprite
    console.log('Test 3: Creating bomb sprite');
    if (this.textures.exists('bomb')) {
      const bombSprite = this.add.sprite(200, 100, 'bomb');
      console.log('Bomb sprite created at:', bombSprite.x, bombSprite.y);
      bombSprite.setDepth(100);
    } else {
      console.log('Bomb texture missing - creating fallback');
      const fallbackBomb = this.add.rectangle(200, 100, 40, 40, 0x8B0000);
      fallbackBomb.setDepth(100);
      console.log('Fallback bomb created at:', fallbackBomb.x, fallbackBomb.y);
    }
    
    // Test 4: Check scene properties
    console.log('Test 4: Scene properties');
    console.log('Scene width:', this.scale.width);
    console.log('Scene height:', this.scale.height);
    console.log('Camera scroll:', this.cameras.main.scrollX, this.cameras.main.scrollY);
    console.log('Camera bounds:', this.cameras.main.getBounds());
    
    // Test 5: Add click to go back
    this.add.text(Config.WORLD_WIDTH / 2, Config.WORLD_HEIGHT - 50, 'Click to go back to BootScene', {
      fontSize: '20px',
      color: '#000',
      backgroundColor: '#FFF',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);
    
    this.input.once('pointerdown', () => {
      this.scene.start('BootScene');
    });
    
    console.log('=== DEBUG SCENE SETUP COMPLETE ===');
  }
}
