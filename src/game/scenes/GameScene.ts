import Phaser from 'phaser';
import { Player } from '../objects/Player';
import { Bomb } from '../objects/Bomb';
import { Spawner } from '../systems/Spawner';
import { Config } from '../../config';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private spawner!: Spawner;
  private worldScrollX: number = 0;
  private backgroundLayers: Phaser.GameObjects.TileSprite[] = [];
  private livesText!: Phaser.GameObjects.Text; // Store reference to lives text
  
  constructor() {
    super({ key: 'GameScene' });
  }
  
  create(): void {
    console.log('GameScene: Creating game world');
    
    // Create background layers for parallax effect
    this.createBackgroundLayers();
    
    // Create player at fixed X position
    this.player = new Player(this, Config.PLAYER_X, Config.WORLD_HEIGHT / 2);
    this.add.existing(this.player);
    this.player.setDepth(5); // Above background layers
    
    // Create spawner for obstacles
    this.spawner = new Spawner(this);
    
    // Debug: Check if bomb texture exists
    console.log('GameScene: Available textures:', this.textures.list);
    console.log('GameScene: Bomb texture exists:', this.textures.exists('bomb'));
    
    // Don't follow player - we'll handle camera manually for scrolling
    this.cameras.main.setScroll(0, 0);
    
    // Set up collision detection
    this.physics.add.collider(this.player, this.spawner.getBombs(), this.onPlayerHitBomb, undefined, this);
    
    // Debug: Create a test bomb to verify sprites work
    const testBomb = new Bomb(this, Config.WORLD_WIDTH - 100, Config.WORLD_HEIGHT / 2);
    this.add.existing(testBomb);
    console.log('GameScene: Created test bomb at', testBomb.x, testBomb.y);
    
    // Also add collision with the test bomb
    this.physics.add.collider(this.player, testBomb, this.onPlayerHitBomb, undefined, this);
    console.log('GameScene: Added collision detection with test bomb');
    
    // Add some ground reference lines for testing
    this.add.line(0, Config.WORLD_HEIGHT - 50, 0, 0, Config.WORLD_WIDTH, 0, 0x666666)
      .setOrigin(0, 0);
    
    // Add instructions text
    this.add.text(Config.PLAYER_X + 100, 50, 'Hold SPACE to rise, release to fall', {
      fontSize: '16px',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 }
    });
    
    // Add game time display
    this.add.text(Config.PLAYER_X + 100, 80, 'First 6 seconds are safe!', {
      fontSize: '14px',
      color: '#FFD700',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 }
    });
    
    // Add lives display - store reference for updating
    this.livesText = this.add.text(50, 50, `Lives: ${this.player.getLives()}`, {
      fontSize: '20px',
      color: '#FF0000',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 }
    }).setOrigin(0, 0);
    
    console.log('GameScene: Player created at', this.player.x, this.player.y);
  }
  
  private createBackgroundLayers(): void {
    // Far background (sky gradient)
    const farBg = this.add.tileSprite(0, 0, Config.WORLD_WIDTH, Config.WORLD_HEIGHT, 'farBackground');
    farBg.setOrigin(0, 0);
    farBg.setScrollFactor(0.1);
    farBg.setDepth(1); // Lowest depth
    this.backgroundLayers.push(farBg);
    
    // Mid background (hills/city silhouettes)
    const midBg = this.add.tileSprite(0, Config.WORLD_HEIGHT - 200, Config.WORLD_WIDTH, 200, 'midBackground');
    midBg.setOrigin(0, 0);
    midBg.setScrollFactor(0.3);
    midBg.setDepth(2); // Above far background
    this.backgroundLayers.push(midBg);
    
    // Near background (track accents)
    const nearBg = this.add.tileSprite(0, Config.WORLD_HEIGHT - 100, Config.WORLD_WIDTH, 100, 'nearBackground');
    nearBg.setOrigin(0, 0);
    nearBg.setScrollFactor(0.6);
    nearBg.setDepth(3); // Above mid background
    this.backgroundLayers.push(nearBg);
  }
  
  update(_time: number, delta: number): void {
    // Update player
    this.player.update();
    
    // Update spawner
    this.spawner.update();
    
    // Update world scroll
    this.worldScrollX += Config.SCROLL_SPEED_X * delta / 1000;
    
    // Keep player at fixed screen position (don't move with world scroll)
    this.player.setX(Config.PLAYER_X);
    
    // Update background parallax
    this.backgroundLayers.forEach((layer) => {
      const scrollFactor = layer.scrollFactorX;
      layer.tilePositionX = -this.worldScrollX * scrollFactor;
    });
    
    // Don't scroll the camera - let the world move instead
    // this.cameras.main.scrollX = this.worldScrollX;
  }
  
  private onPlayerHitBomb(_player: any, bomb: any): void {
    console.log('=== COLLISION DETECTED ===');
    console.log('Player hit bomb!');
    console.log('Bomb position:', bomb.x, bomb.y);
    console.log('Player position:', this.player.x, this.player.y);
    console.log('Player lives before:', this.player.getLives());
    
    // Use the new lives system
    this.player.loseLife();
    
    // Update the lives display
    this.livesText.setText(`Lives: ${this.player.getLives()}`);
    
    // Remove bomb from spawner group before destroying
    if (this.spawner.getBombs().contains(bomb)) {
      this.spawner.getBombs().remove(bomb);
      console.log('Bomb removed from spawner group');
    }
    
    // Destroy the bomb
    console.log('Attempting to destroy bomb...');
    bomb.destroy();
    console.log('Bomb destroy() called');
    
    console.log('Player lives after:', this.player.getLives());
    console.log('=== END COLLISION ===');
  }
}
