import Phaser from 'phaser';

interface Player {
  id: string;
  name: string;
  character: string;
  location: string;
}

export class WelcomeScene extends Phaser.Scene {
  private selectedCharacter: string = '';
  private selectedLocation: string = '';
  private players: Player[] = [];
  private characterButtons: Phaser.GameObjects.Container[] = [];
  private locationButtons: Phaser.GameObjects.Container[] = [];
  private playerListContainer!: Phaser.GameObjects.Container;
  private startGameButton!: Phaser.GameObjects.Container;

  public constructor() {
    super('WelcomeScene');
  }

  public create(): void {
    const { width, height } = this.scale;
    
    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1b1e);
    
    // Title
    this.add.text(width / 2, 60, 'Welcome to the Game', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5, 0.5);

    // Character Selection Section
    this.createCharacterSelection(width, height);
    
    // Location Selection Section
    this.createLocationSelection(width, height);
    
    // Player Management Section
    this.createPlayerManagement(width, height);
    
    // Start Game Button
    this.createStartGameButton(width, height);
  }

  private createCharacterSelection(width: number, height: number): void {
    const y = 120;
    
    // Character selection title
    this.add.text(width / 2, y, 'Select Character', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5);

    const characters = ['Warrior', 'Mage', 'Archer', 'Rogue'];
    const buttonWidth = 120;
    const buttonHeight = 40;
    const spacing = 20;
    const startX = width / 2 - ((characters.length * buttonWidth + (characters.length - 1) * spacing) / 2);

    characters.forEach((character, index) => {
      const x = startX + index * (buttonWidth + spacing);
      const button = this.createButton(x, y + 40, buttonWidth, buttonHeight, character, () => {
        this.selectCharacter(character);
      });
      this.characterButtons.push(button);
    });
  }

  private createLocationSelection(width: number, height: number): void {
    const y = 220;
    
    // Location selection title
    this.add.text(width / 2, y, 'Select Location', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5);

    const locations = ['Forest', 'Castle', 'Dungeon', 'Mountain'];
    const buttonWidth = 120;
    const buttonHeight = 40;
    const spacing = 20;
    const startX = width / 2 - ((locations.length * buttonWidth + (locations.length - 1) * spacing) / 2);

    locations.forEach((location, index) => {
      const x = startX + index * (buttonWidth + spacing);
      const button = this.createButton(x, y + 40, buttonWidth, buttonHeight, location, () => {
        this.selectLocation(location);
      });
      this.locationButtons.push(button);
    });
  }

  private createPlayerManagement(width: number, height: number): void {
    const y = 320;
    
    // Player management title
    this.add.text(width / 2, y, 'Players', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5);

    // Add Player button
    const addPlayerButton = this.createButton(width / 2 - 100, y + 40, 120, 40, 'Add Player', () => {
      this.addPlayer();
    });

    // Player list container
    this.playerListContainer = this.add.container(0, y + 100);
    this.updatePlayerList();
  }

  private createStartGameButton(width: number, height: number): void {
    const y = height - 80;
    
    this.startGameButton = this.createButton(width / 2, y, 150, 50, 'Start Game', () => {
      this.startGame();
    });
    
    // Disable initially
    this.startGameButton.setAlpha(0.5);
    const startBg = this.startGameButton.getData('bg') as Phaser.GameObjects.Rectangle;
    if (startBg) {
      startBg.disableInteractive();
    }
  }

  private createButton(x: number, y: number, width: number, height: number, text: string, callback: () => void): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    
    const background = this.add.rectangle(0, 0, width, height, 0x4a4a4a);
    const border = this.add.rectangle(0, 0, width, height, 0x000000).setStrokeStyle(2, 0x666666);
    const buttonText = this.add.text(0, 0, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5, 0.5);

    container.add([background, border, buttonText]);
    container.setSize(width, height);
    container.setData('bg', background);

    background.setInteractive({ useHandCursor: true });
    background.on('pointerdown', callback);
    background.on('pointerover', () => {
      background.setFillStyle(0x5a5a5a);
    });
    background.on('pointerout', () => {
      background.setFillStyle(0x4a4a4a);
    });

    return container;
  }

  private selectCharacter(character: string): void {
    this.selectedCharacter = character;
    
    // Update button appearances
    this.characterButtons.forEach(button => {
      const text = button.list[2] as Phaser.GameObjects.Text;
      const background = button.list[0] as Phaser.GameObjects.Rectangle;
      if (text.text === character) {
        background.setFillStyle(0x6c9cff);
      } else {
        background.setFillStyle(0x4a4a4a);
      }
    });
    
    this.updateStartGameButton();
  }

  private selectLocation(location: string): void {
    this.selectedLocation = location;
    
    // Update button appearances
    this.locationButtons.forEach(button => {
      const text = button.list[2] as Phaser.GameObjects.Text;
      const background = button.list[0] as Phaser.GameObjects.Rectangle;
      if (text.text === location) {
        background.setFillStyle(0x6c9cff);
      } else {
        background.setFillStyle(0x4a4a4a);
      }
    });
    
    this.updateStartGameButton();
  }

  private addPlayer(): void {
    if (!this.selectedCharacter || !this.selectedLocation) {
      // Show error message
      const errorText = this.add.text(this.scale.width / 2, this.scale.height - 40, 'Please select character and location first!', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#ff6b6b'
      }).setOrigin(0.5, 0.5);
      
      this.time.delayedCall(2000, () => {
        errorText.destroy();
      });
      return;
    }

    const playerId = `player_${Date.now()}`;
    const playerName = `Player ${this.players.length + 1}`;
    
    const newPlayer: Player = {
      id: playerId,
      name: playerName,
      character: this.selectedCharacter,
      location: this.selectedLocation
    };
    
    this.players.push(newPlayer);
    this.updatePlayerList();
    this.updateStartGameButton();
  }

  private updatePlayerList(): void {
    // Clear existing player list
    this.playerListContainer.removeAll(true);
    
    if (this.players.length === 0) {
      const noPlayersText = this.add.text(0, 0, 'No players added yet', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#888888'
      }).setOrigin(0.5, 0.5);
      this.playerListContainer.add(noPlayersText);
      return;
    }

    // Add each player
    this.players.forEach((player, index) => {
      const y = index * 30;
      
      const playerText = this.add.text(-200, y, `${player.name} (${player.character}) - ${player.location}`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#ffffff'
      }).setOrigin(0, 0.5);
      
      const removeButton = this.createButton(200, y, 60, 25, 'Remove', () => {
        this.removePlayer(player.id);
      });
      
      this.playerListContainer.add([playerText, removeButton]);
    });
  }

  private removePlayer(playerId: string): void {
    this.players = this.players.filter(player => player.id !== playerId);
    this.updatePlayerList();
    this.updateStartGameButton();
  }

  private updateStartGameButton(): void {
    const canStart = this.players.length > 0;
    
    const startBg = this.startGameButton.getData('bg') as Phaser.GameObjects.Rectangle | undefined;
    if (canStart) {
      this.startGameButton.setAlpha(1);
      if (startBg) {
        if (!startBg.input) {
          startBg.setInteractive({ useHandCursor: true });
        } else {
          startBg.input.enabled = true;
        }
      }
    } else {
      this.startGameButton.setAlpha(0.5);
      if (startBg && startBg.input) {
        startBg.input.enabled = false;
      }
    }
  }

  private startGame(): void {
    if (this.players.length === 0) return;
    
    // Store player data in registry for use in GameScene
    this.registry.set('players', this.players);
    
    // Transition to GameScene
    this.scene.start('GameScene');
  }
}
