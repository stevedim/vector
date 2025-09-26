import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private logo!: Phaser.GameObjects.Image;

  public constructor() {
    super('GameScene');
  }

  public create(): void {
    const { width, height } = this.scale;
    this.add.text(width / 2, 60, 'Phaser + TypeScript + pnpm', {
      fontFamily: 'sans-serif',
      fontSize: '24px',
      color: '#e6e6e6'
    }).setOrigin(0.5, 0.5);

    this.logo = this.add.image(width / 2, height / 2, 'logo');
    this.tweens.add({
      targets: this.logo,
      y: height / 2 + 20,
      duration: 900,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
}


