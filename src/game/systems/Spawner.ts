import Phaser from 'phaser';
import { Bomb } from '../objects/Bomb';
import { Config } from '../../config';

interface SpawnPoint {
  x: number;
  y: number;
  timestamp: number;
}

export class Spawner {
  private scene: Phaser.Scene;
  private bombs: Phaser.Physics.Arcade.Group;
  private lastBombSpawn: number = 0;
  private gameStartTime: number = 0;
  private spawnPoints: SpawnPoint[] = [];
  
  // Three vertical lanes for organized spawning
  private readonly LANE_LEFT = Config.WORLD_HEIGHT * 0.3;
  private readonly LANE_CENTER = Config.WORLD_HEIGHT * 0.5;
  private readonly LANE_RIGHT = Config.WORLD_HEIGHT * 0.7;
  private readonly LANES = [this.LANE_LEFT, this.LANE_CENTER, this.LANE_RIGHT];
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.bombs = scene.physics.add.group({
      classType: Bomb,
      runChildUpdate: true
    });
    
    this.gameStartTime = scene.time.now;
  }
  
  update(): void {
    const currentTime = this.scene.time.now;
    const gameTime = (currentTime - this.gameStartTime) / 1000;
    
    // Debug logging
    if (Math.floor(gameTime) % 5 === 0 && Math.floor(gameTime) > 0) {
      console.log(`Spawner: Game time: ${gameTime.toFixed(1)}s, Bombs active: ${this.bombs.getLength()}`);
    }
    
    // Don't spawn bombs in the first safe seconds
    if (gameTime < Config.SAFE_START_SECONDS) {
      return;
    }
    
    // Check if enough time has passed since last bomb spawn
    const timeSinceLastSpawn = currentTime - this.lastBombSpawn;
    const minSpawnDelay = (Config.MIN_BOMB_SPACING / Config.SCROLL_SPEED_X) * 1000;
    
    if (timeSinceLastSpawn >= minSpawnDelay) {
      console.log(`Spawner: Spawning bomb cluster at time ${gameTime.toFixed(1)}s`);
      this.spawnBombCluster();
      this.lastBombSpawn = currentTime;
    }
    
    // Clean up old spawn points
    this.cleanupSpawnPoints(currentTime);
  }
  
  private spawnBombCluster(): void {
    const clusterSize = Phaser.Math.Between(1, 3); // 1-3 bombs per cluster
    const clusterX = Config.WORLD_WIDTH + 100; // Spawn off-screen to the right
    
    // Choose random lanes for this cluster
    const availableLanes = [...this.LANES];
    const selectedLanes: number[] = [];
    
    for (let i = 0; i < clusterSize && availableLanes.length > 0; i++) {
      const randomIndex = Phaser.Math.Between(0, availableLanes.length - 1);
      selectedLanes.push(availableLanes[randomIndex]);
      availableLanes.splice(randomIndex, 1);
    }
    
    // Spawn bombs in selected lanes
    selectedLanes.forEach(laneY => {
      // Add some randomness to Y position within the lane
      const randomY = laneY + Phaser.Math.Between(-20, 20);
      
      // Ensure bomb is within safe margins
      const safeY = Phaser.Math.Clamp(
        randomY, 
        Config.BOMB_EDGE_MARGIN, 
        Config.WORLD_HEIGHT - Config.BOMB_EDGE_MARGIN
      );
      
      const bomb = new Bomb(this.scene, clusterX, safeY);
      this.bombs.add(bomb);
      console.log(`Spawner: Created bomb at (${clusterX}, ${safeY})`);
      
      // Record spawn point for fairness checking
      this.spawnPoints.push({
        x: clusterX,
        y: safeY,
        timestamp: this.scene.time.now
      });
    });
  }
  
  private cleanupSpawnPoints(currentTime: number): void {
    // Remove spawn points older than 10 seconds
    const cutoffTime = currentTime - 10000;
    this.spawnPoints = this.spawnPoints.filter(point => point.timestamp > cutoffTime);
  }
  
  getBombs(): Phaser.Physics.Arcade.Group {
    return this.bombs;
  }
  
  // Check if a position is safe from bombs (for future coin/shield spawning)
  isPositionSafe(x: number, y: number, minDistance: number = 100): boolean {
    return !this.spawnPoints.some(point => {
      const distance = Phaser.Math.Distance.Between(x, y, point.x, point.y);
      return distance < minDistance;
    });
  }
  
  destroy(): void {
    this.bombs.clear(true, true);
    this.spawnPoints = [];
  }
}
