export const Config = {
  // Physics constants
  GRAVITY_Y: 1100,
  THRUST_Y: 1400,
  MAX_RISE_SPEED: 420,
  MAX_FALL_SPEED: 560,
  
  // Movement and positioning
  SCROLL_SPEED_X: 240,
  PLAYER_X: 140,
  
  // World dimensions
  WORLD_WIDTH: 1280,
  WORLD_HEIGHT: 720,
  
  // Game mechanics
  INVULN_MS_AFTER_HIT: 800,
  
  // Spawning rules
  SAFE_START_SECONDS: 6,
  MIN_BOMB_SPACING: 420,
  MAX_BOMB_SPACING: 560,
  MIN_VERTICAL_GAP: 160,
  BOMB_EDGE_MARGIN: 100,
  
  // Coin and shield rules
  COIN_BOMB_MIN_DISTANCE: 120,
  SHIELD_SPAWN_CHANCE: 0.05,
  SHIELD_MIN_TIME_SECONDS: 20,
  SHIELD_BOMB_MIN_DISTANCE: 200,
  
  // Scoring
  POINTS_PER_METER: 1,
  POINTS_PER_COIN: 10,
  
  // Player
  PLAYER_LIVES: 3,
  
  // Audio
  AUDIO_VOLUME: 0.7,
} as const;
