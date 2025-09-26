import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { PreloadScene } from './scenes/PreloadScene';
import { GameScene } from './scenes/GameScene';

const parentElementId = 'app';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: parentElementId,
  width: 960,
  height: 540,
  backgroundColor: '#1a1b1e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, PreloadScene, GameScene]
};

// eslint-disable-next-line no-new
new Phaser.Game(config);


