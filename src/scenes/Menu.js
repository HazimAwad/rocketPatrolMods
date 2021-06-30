class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/mixkit-game-ball-tap-2073.wav');
        this.load.audio('sfx_explosion', './assets/mixkit-magic-sweep-game-trophy-257.wav');
        this.load.audio('sfx_rocket', './assets/mixkit-small-hit-in-a-game-2072.wav');

        this.load.image('CakeDesignMenu', './assets/CakeDesignMenu.png');
    }
    create() {

        this.CakeDesignMenu = this.add.tileSprite(0, 0, 640, 480, 'CakeDesignMenu').setOrigin(0,0);

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffdef2',
            color: '#000',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/1.65, game.config.height/1.45 - (borderUISize + borderPadding), 'CAKE DESIGN', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.65, game.config.height/1.4, 'Use ←→ arrows to', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.65, game.config.height/1.25, 'move & (F) to fire ', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#ffffe3";
        this.add.text(game.config.width/1.8, game.config.height/1.2 + (borderUISize + borderPadding),'Press ← for Novice or → Expert', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                cakeSpeed: 3,
                gameTimer: 60000,
                halfTime: 30000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');  
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                cakeSpeed: 4,
                gameTimer: 45000,
                halfTime: 22500
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}