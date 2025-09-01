import Phaser from 'phaser';

export class SpriteMaker {
  static createPlayerSprite(scene: Phaser.Scene): void {
    // Create player sprite as a simple colored rectangle with jetpack
    const graphics = scene.add.graphics();
    
    // Player body (rounded rectangle)
    graphics.fillStyle(0x4A90E2);
    graphics.fillRoundedRect(0, 0, 30, 40, 8);
    
    // Jetpack
    graphics.fillStyle(0x2C3E50);
    graphics.fillRoundedRect(-15, 5, 20, 30, 5);
    
    // Jetpack straps
    graphics.fillStyle(0x34495E);
    graphics.fillRect(0, 10, 5, 20);
    graphics.fillRect(0, 35, 5, 5);
    
    // Generate texture from graphics
    graphics.generateTexture('player', 50, 50);
    graphics.destroy();
  }
  
  static createExhaustFlameSprite(scene: Phaser.Scene): void {
    const graphics = scene.add.graphics();
    
    // Exhaust flame (orange to yellow gradient effect)
    graphics.fillStyle(0xFF6B35);
    graphics.fillEllipse(0, 0, 20, 15);
    graphics.fillStyle(0xFFD700);
    graphics.fillEllipse(0, 0, 12, 8);
    
    graphics.generateTexture('exhaustFlame', 30, 30);
    graphics.destroy();
  }
  
  static createParticleSprite(scene: Phaser.Scene): void {
    const graphics = scene.add.graphics();
    
    // Simple particle
    graphics.fillStyle(0x00FFFF);
    graphics.fillCircle(0, 0, 3);
    
    graphics.generateTexture('particle', 10, 10);
    graphics.destroy();
  }
  
  static createBombSprite(scene: Phaser.Scene): void {
    const graphics = scene.add.graphics();
    
    // Bomb body (dark sphere)
    graphics.fillStyle(0x2C3E50);
    graphics.fillCircle(0, 0, 15);
    
    // Bomb rim highlight
    graphics.lineStyle(2, 0x34495E);
    graphics.strokeCircle(0, 0, 15);
    
    // Small highlight
    graphics.fillStyle(0x5D6D7E);
    graphics.fillCircle(-5, -5, 3);
    
    graphics.generateTexture('bomb', 40, 40);
    graphics.destroy();
  }
  
  static createFuseLightSprite(scene: Phaser.Scene): void {
    const graphics = scene.add.graphics();
    
    // Blinking fuse light (red)
    graphics.fillStyle(0xFF0000);
    graphics.fillCircle(0, 0, 4);
    
    // Add glow effect
    graphics.lineStyle(1, 0xFF6666);
    graphics.strokeCircle(0, 0, 6);
    
    graphics.generateTexture('fuseLight', 20, 20);
    graphics.destroy();
  }
  
  static createBackgroundSprites(scene: Phaser.Scene): void {
    // Far background (sky gradient)
    const farGraphics = scene.add.graphics();
    farGraphics.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE0F6FF, 0xE0F6FF, 1);
    farGraphics.fillRect(0, 0, 100, 100);
    farGraphics.generateTexture('farBackground', 100, 100);
    farGraphics.destroy();
    
    // Mid background (hills)
    const midGraphics = scene.add.graphics();
    midGraphics.fillStyle(0x2E8B57);
    midGraphics.fillRect(0, 0, 100, 100);
    // Add some hill shapes
    midGraphics.fillStyle(0x228B22);
    midGraphics.fillEllipse(50, 100, 80, 40);
    midGraphics.generateTexture('midBackground', 100, 100);
    midGraphics.destroy();
    
    // Near background (track)
    const nearGraphics = scene.add.graphics();
    nearGraphics.fillStyle(0x696969);
    nearGraphics.fillRect(0, 0, 100, 100);
    // Add track lines
    nearGraphics.fillStyle(0xFFFFFF);
    nearGraphics.fillRect(0, 40, 100, 2);
    nearGraphics.fillRect(0, 60, 100, 2);
    nearGraphics.generateTexture('nearBackground', 100, 100);
    nearGraphics.destroy();
  }
  
  static createAllSprites(scene: Phaser.Scene): void {
    this.createPlayerSprite(scene);
    this.createExhaustFlameSprite(scene);
    this.createParticleSprite(scene);
    this.createBombSprite(scene);
    this.createFuseLightSprite(scene);
    this.createBackgroundSprites(scene);
  }
}
