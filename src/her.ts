import * as Phaser from "phaser";
import * as bullet from "./bullet";

const VELOCITY = 10;

export class Her {

    private fireRate = 200;
    private nextFire: number;
    private shootingSound: Phaser.Sound;
    private herController: HerController;

    constructor(private herSprite: Phaser.Sprite) { 
        this.shootingSound = new Phaser.Sound(this.herSprite.game, "shooting");
        this.herController = new HerController(this.herSprite.game, this);
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
        if (this.herSprite.game.time.time < this.nextFire) {
            return;
        }

        const bullets = bullet.createDualBullets(this.herSprite.game, this.herSprite.x, this.herSprite.y);
        this.shootingSound.play();
        bullet.moveBullets(bullets);

        this.nextFire = this.herSprite.game.time.time + this.fireRate;
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
