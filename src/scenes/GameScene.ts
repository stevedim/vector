import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
  private logo!: Phaser.GameObjects.Image;

  public constructor() {
    super('GameScene');
  }

  public create(): void {
    const { width, height } = this.scale;
    
    // Get players from registry
    const players = this.registry.get('players') || [];
    
    // Title
    this.add.text(width / 2, 60, 'Game Started!', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0.5);

    // Display players
    if (players.length > 0) {
      this.add.text(width / 2, 120, 'Players in Game:', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#ffffff'
      }).setOrigin(0.5, 0.5);

      players.forEach((player: any, index: number) => {
        const y = 160 + index * 30;
        this.add.text(width / 2, y, `${player.name} - ${player.character} in ${player.location}`, {
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          color: '#e6e6e6'
        }).setOrigin(0.5, 0.5);
      });
    }

    // Logo with animation
    this.logo = this.add.image(width / 2, height / 2 + 50, 'logo');
    this.tweens.add({
      targets: this.logo,
      y: height / 2 + 70,
      duration: 900,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1
    });

    // Back to welcome button
    const backButton = this.add.rectangle(width / 2, height - 60, 120, 40, 0x4a4a4a);
    backButton.setStrokeStyle(2, 0x666666);
    backButton.setInteractive();
    
    this.add.text(width / 2, height - 60, 'Back to Menu', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5);

    backButton.on('pointerdown', () => {
      this.scene.start('WelcomeScene');
    });

    backButton.on('pointerover', () => {
      backButton.setFillStyle(0x5a5a5a);
    });
    backButton.on('pointerout', () => {
      backButton.setFillStyle(0x4a4a4a);
    });
  }
}


