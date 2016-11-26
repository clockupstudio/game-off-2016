import * as Phaser from "phaser";
import * as bullet from "./bullet";

const VELOCITY = 10;

export class Her {

    private fireRate = 200;
    private nextFire: number;
    private herController: HerController;
    private gun: Gun;

    constructor(private herSprite: Phaser.Sprite) {
        this.herController = new HerController(this.herSprite.game, this);
        this.gun = new Gun(this.herSprite.game, this.herSprite);
    }

    moveRight() {
        this.herSprite.x += VELOCITY;
    }

    moveLeft() {
        this.herSprite.x -= VELOCITY;
    }

    moveUp() {
        this.herSprite.y -= VELOCITY;
    }

    moveDown() {
        this.herSprite.y += VELOCITY;
    }

    fire() {
        this.gun.fire();
    }

    update() {
        this.herController.update();
    }

    destroy() {
        this.herSprite.destroy();
    }

    get sprite(): Phaser.Sprite {
        return this.herSprite;
    }

    static create(game: Phaser.Game, x: number, y: number): Her {
        let sprite = game.add.sprite(x, y, "her");
        sprite.inputEnabled = true;
        game.physics.arcade.enable(sprite);
        return new Her(sprite);
    }

}

export class HerController {

    constructor(private game: Phaser.Game, private her: Her) {
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.her.moveRight();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.her.moveLeft();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.her.moveUp();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.her.moveDown();
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.her.fire();
        }
    }
}

const FIRE_RATE = 200;

export class Gun {

    private nextFire: number;
    private shootingSound: Phaser.Sound;

    constructor(private game: Phaser.Game, private herSprite: Phaser.Sprite) {
        this.shootingSound = new Phaser.Sound(this.game, "shooting");
        this.nextFire = 0;
    }

    fire() {
        if (this.game.time.time < this.nextFire) {
            return;
        }

        const bullets = bullet.createDualBullets(this.game, this.herSprite.x, this.herSprite.y);
        this.shootingSound.play();
        bullet.moveBullets(bullets);

        this.nextFire = this.game.time.time + FIRE_RATE;
    }
}
