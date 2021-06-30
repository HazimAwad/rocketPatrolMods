class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('cream', './assets/cream.png');
        this.load.image('cake', './assets/cake.png');
        this.load.image('background', './assets/CakeDesignBackground.png');
        this.load.image('conveyor', './assets/conveyor.png');
        this.load.image('gameUI', './assets/Game_UI.png');
        this.load.spritesheet('decoration', './assets/decoration.png', {frameWidth: 54,
        frameHeight: 39, startFrame: 0, endFrame: 5});

    }
    create() {
        this.add.text(20, 20, "Cream Design Play");

        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
        this.conveyor = this.add.tileSprite(0, 0, 640, 480, 'conveyor').setOrigin(0,0);
        this.gameUI = this.add.tileSprite(0, 0, 640, 480, 'gameUI').setOrigin(0,0);

        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, 
        //    game.config.width,
        //    borderUISize * 2, 0x00FF00).setOrigin(0,0);
        // White UI border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xe79ac9).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xe79ac9).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xe79ac9).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xe79ac9).setOrigin(0,0);

        this.p1Cream = new Cream(this,
            game.config.width / 2,
            game.config.height - (borderUISize + borderPadding),
            'cream').setOrigin(0.5,0.5);
        // add cakes
        this.cake01 = new Cake(this, game.config.width + borderUISize*6,
            borderUISize*4, 'cake', 0, 30).setOrigin(0,0);
        this.cake02 = new Cake(this, game.config.width + borderUISize*3,
            borderUISize*5 + borderPadding*2, 'cake', 0, 20).setOrigin(0,0);
        this.cake03 = new Cake(this, game.config.width,
            borderUISize*6 + borderPadding*4, 'cake', 0, 10).setOrigin(0,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'decorate',
            frames: this.anims.generateFrameNumbers('decoration', {start: 0, end: 5, first: 0}),
            frameRate: 20});

        this.p1Score = 0;

        let endGameConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ffffe3',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 100
        }

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding,
            borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        this.gameOver = false;
        // 60-second play clock
        endGameConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
            endGameConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
            endGameConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.initialTime = game.settings.gameTimer/1000;
        this.textTimer = this.add.text(525, borderUISize + 20, this.formatTime(this.initialTime), endGameConfig);
        this.timer = this.time.addEvent({delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.background.tilePositionX += 1;
        this.conveyor.tilePositionX += 2;

        if(!this.gameOver) {
            this.p1Cream.update();
            this.cake01.update();
            this.cake02.update();
            this.cake03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Cream, this.cake03)) {
            this.p1Cream.reset();
            this.cakeExplode(this.cake03);
            this.cake03.reset();
        }
        if(this.checkCollision(this.p1Cream, this.cake02)) {
            this.p1Cream.reset();
            this.cakeExplode(this.cake02);
            this.cake01.reset();
        }
        if(this.checkCollision(this.p1Cream, this.cake01)) {
            this.p1Cream.reset();
            this.cakeExplode(this.cake01);
            this.cake01.reset();
        }
    }

    checkCollision(cream, cake) {
        if(cream.x < cake.x + cake.width &&
            cream.x + cream.width > cake.x &&
            cream.y < cake.y + cake.height &&
            cream.height + cream.y > cake.y) {
                return true;
            }
            return false;
    }

    cakeExplode(cake) {
        cake.alpha = 0; // hide the cake
        let boom = this.add.sprite(cake.x, cake.y, 'decoration').setOrigin(0,0);
        boom.anims.play('decorate');
        this.sound.play('sfx_explosion', {volume: 0.4});
        boom.on('animationcomplete', () => {
            cake.reset();
            cake.alpha = 1;
            boom.destroy();
        });

        // add score and repaint score display
        this.p1Score += cake.points;
        this.scoreLeft.text = this.p1Score;
    }

    formatTime(seconds) {
        this.minutes = Math.floor(seconds/60);
        this.partInSeconds = seconds%60;
        this.partInSeconds = this.partInSeconds.toString().padStart(2,'0');
        return `${this.minutes}:${this.partInSeconds}`;
    }

    onEvent () {
        if(this.initialTime != 0){
            this.initialTime--; // One second
            this.textTimer.setText(this.formatTime(this.initialTime));
        }
    }
}