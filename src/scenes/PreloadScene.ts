import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  public constructor() {
    super('PreloadScene');
  }

  public preload(): void {
    const width = this.scale.width;
    const height = this.scale.height;

    const progressBox = this.add.rectangle(width / 2, height / 2, 420, 30, 0x1f2330);
    const progressBar = this.add.rectangle(width / 2 - 200, height / 2, 4, 22, 0x6c9cff).setOrigin(0, 0.5);

    this.load.on('progress', (value: number) => {
      progressBar.width = 4 + value * 400;
    });

    this.load.setPath('assets');
    // Example assets (placeholders). Replace with real ones in /assets.
    this.load.image('logo', 'logo.png');
  }

  public create(): void {
    this.scene.start('GameScene');
  }
}


