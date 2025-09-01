import Phaser from 'phaser';
import { Config } from '../../config';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private isThrusting: boolean = false;
  private exhaustFlame: Phaser.GameObjects.Sprite;
  private trailParticles: Phaser.GameObjects.Particles.ParticleEmitter;
  
  // Lives and invulnerability system
  private lives: number = Config.PLAYER_LIVES;
  private isInvulnerable: boolean = false;
  private invulnerabilityTimer: Phaser.Time.TimerEvent | null = null;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    
    // Set up physics body
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setBounce(0.1);
    
    // Debug: Check physics body
    console.log('Player: Physics body created:', this.body);
    console.log('Player: Physics body enabled:', this.body?.enable);
    console.log('Player: Physics body width/height:', this.body?.width, this.body?.height);
    
    // Create exhaust flame
    this.exhaustFlame = scene.add.sprite(x - 20, y + 5, 'exhaustFlame');
    this.exhaustFlame.setScale(0.8);
    this.exhaustFlame.setVisible(false);
    
    // Create trail particles
    this.trailParticles = scene.add.particles(0, 0, 'particle', {
      x: x - 15,
      y: y + 5,
      speed: { min: 50, max: 100 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.6, end: 0 },
      lifespan: 300,
      frequency: 50,
      blendMode: 'ADD',
      tint: 0x00ffff
    });
    this.trailParticles.stop();
    
    // Set up input handling
    this.setupInput();
  }
  
  private setupInput(): void {
    // Keyboard input
    this.scene.input.keyboard?.on('keydown-SPACE', () => {
      this.startThrust();
    });
    
    this.scene.input.keyboard?.on('keyup-SPACE', () => {
      this.stopThrust();
    });
    
    // Touch input for mobile
    this.scene.input.on('pointerdown', () => {
      this.startThrust();
    });
    
    this.scene.input.on('pointerup', () => {
      this.stopThrust();
    });
  }
  
  private startThrust(): void {
    this.isThrusting = true;
    this.exhaustFlame.setVisible(true);
    this.trailParticles.start();
  }
  
  private stopThrust(): void {
    this.isThrusting = false;
    this.exhaustFlame.setVisible(false);
    this.trailParticles.stop();
  }
  
  update(): void {
    // Apply custom physics
    if (this.isThrusting) {
      // Apply upward thrust
      this.setVelocityY(this.body!.velocity.y - Config.THRUST_Y * this.scene.game.loop.delta / 1000);
    } else {
      // Apply gravity
      this.setVelocityY(this.body!.velocity.y + Config.GRAVITY_Y * this.scene.game.loop.delta / 1000);
    }
    
    // Clamp vertical velocity
    if (this.body!.velocity.y < -Config.MAX_RISE_SPEED) {
      this.setVelocityY(-Config.MAX_RISE_SPEED);
    } else if (this.body!.velocity.y > Config.MAX_FALL_SPEED) {
      this.setVelocityY(Config.MAX_FALL_SPEED);
    }
    
    // Update exhaust flame and trail position relative to player
    this.exhaustFlame.setPosition(this.x - 20, this.y + 5);
    this.trailParticles.setPosition(this.x - 15, this.y + 5);
  }
  
  // Public methods for lives and invulnerability
  getLives(): number {
    return this.lives;
  }
  
  isPlayerInvulnerable(): boolean {
    return this.isInvulnerable;
  }
  
  loseLife(): void {
    if (this.isInvulnerable) return; // Can't lose life while invulnerable
    
    this.lives--;
    console.log(`Player: Life lost! Lives remaining: ${this.lives}`);
    
    // Activate invulnerability
    this.activateInvulnerability();
  }
  
  private activateInvulnerability(): void {
    this.isInvulnerable = true;
    console.log(`Player: Invulnerability activated for ${Config.INVULN_MS_AFTER_HIT}ms`);
    
    // Start blinking effect
    this.startBlinking();
    
    // Set timer to end invulnerability
    this.invulnerabilityTimer = this.scene.time.delayedCall(Config.INVULN_MS_AFTER_HIT, () => {
      this.endInvulnerability();
    });
  }
  
  private startBlinking(): void {
    // Toggle visibility every 100ms during invulnerability
    const blinkTimer = this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        if (this.isInvulnerable) {
          this.setVisible(!this.visible);
          this.exhaustFlame.setVisible(!this.exhaustFlame.visible);
        }
      },
      loop: true
    });
    
    // Store blink timer reference for cleanup
    (this as any).blinkTimer = blinkTimer;
  }
  
  private endInvulnerability(): void {
    this.isInvulnerable = false;
    this.setVisible(true);
    this.exhaustFlame.setVisible(this.isThrusting);
    
    // Clean up blink timer
    if ((this as any).blinkTimer) {
      (this as any).blinkTimer.destroy();
      (this as any).blinkTimer = null;
    }
    
    console.log('Player: Invulnerability ended');
  }
  
  destroy(): void {
    // Clean up timers
    if (this.invulnerabilityTimer) {
      this.invulnerabilityTimer.destroy();
    }
    if ((this as any).blinkTimer) {
      (this as any).blinkTimer.destroy();
    }
    
    this.exhaustFlame.destroy();
    this.trailParticles.destroy();
    super.destroy();
  }
}
