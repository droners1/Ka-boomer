import Phaser from 'phaser';
import { Config } from '../../config';

export class Bomb extends Phaser.Physics.Arcade.Sprite {
  private fuseLight: Phaser.GameObjects.Sprite;
  private fuseTimer: Phaser.Time.TimerEvent;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bomb');
    
    console.log(`Bomb: Created at (${x}, ${y})`);
    
    // Set up physics body
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(false);
    
    // Debug: Check physics body
    console.log('Bomb: Physics body created:', this.body);
    console.log('Bomb: Physics body enabled:', this.body?.enable);
    console.log('Bomb: Physics body width/height:', this.body?.width, this.body?.height);
    
    // Set depth to ensure bombs are above background
    this.setDepth(10);
    
    // Create blinking fuse light
    this.fuseLight = scene.add.sprite(x, y - 15, 'fuseLight');
    this.fuseLight.setScale(0.6);
    this.fuseLight.setDepth(11); // Above the bomb
    
    // Set up blinking fuse effect
    this.fuseTimer = scene.time.addEvent({
      delay: 200,
      callback: () => {
        this.fuseLight.setVisible(!this.fuseLight.visible);
      },
      loop: true
    });
    
    // Don't set velocity - we'll handle movement in update
    this.setVelocityX(0);
    
    // Set size for collision detection
    this.setSize(20, 20);
    
    // Make sure the bomb is visible and not transparent
    this.setAlpha(1);
    this.setVisible(true);
    
    // Add a fallback colored rectangle to ensure visibility
    const debugRect = scene.add.rectangle(x, y, 30, 30, 0xFF0000);
    debugRect.setDepth(12);
    debugRect.setStrokeStyle(2, 0xFFFFFF);
    
    // Store reference to debug rect so we can move it
    (this as any).debugRect = debugRect;
    
    console.log(`Bomb: Depth set to ${this.depth}, Alpha: ${this.alpha}, Visible: ${this.visible}`);
    console.log(`Bomb: Added debug rectangle at (${x}, ${y})`);
  }
  
  update(): void {
    // Debug: Log position updates
    if (Math.floor(this.scene.time.now / 1000) % 2 === 0) {
      console.log(`Bomb: Position update - X: ${this.x.toFixed(1)}, Y: ${this.y.toFixed(1)}`);
    }
    
    // Move bomb left at scroll speed
    const deltaTime = this.scene.game.loop.delta / 1000;
    const moveDistance = Config.SCROLL_SPEED_X * deltaTime;
    this.setX(this.x - moveDistance);
    
    console.log(`Bomb: Moved left by ${moveDistance.toFixed(1)} pixels, new X: ${this.x.toFixed(1)}`);
    
    // Update fuse light position
    this.fuseLight.setPosition(this.x, this.y - 15);
    
    // Update debug rectangle position
    if ((this as any).debugRect) {
      (this as any).debugRect.setPosition(this.x, this.y);
    }
    
    // Destroy if off screen to the left
    if (this.x < -50) {
      console.log('Bomb: Destroying - went off screen');
      if ((this as any).debugRect) {
        (this as any).debugRect.destroy();
      }
      this.destroy();
    }
  }
  
  destroy(): void {
    if (this.fuseTimer) {
      this.fuseTimer.destroy();
    }
    if (this.fuseLight) {
      this.fuseLight.destroy();
    }
    super.destroy();
  }
}
