import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  public constructor() {
    super('BootScene');
  }

  public preload(): void {
    // Load minimal assets needed for the loading screen here if any
  }

  public create(): void {
    this.scene.start('PreloadScene');
  }
}


