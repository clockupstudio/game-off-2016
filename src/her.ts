import * as Phaser from "phaser";
import * as bullet from "./bullet";

const VELOCITY = 10;

export class Her {

    private fireRate = 200;
    private nextFire: number;
    private shootingSound: Phaser.Sound;

    constructor(private sprite: Phaser.Sprite) { 
        this.shootingSound = new Phaser.Sound(this.sprite.game, "shooting");
    }

    moveRight() {
        this.sprite.x += VELOCITY;
    }

    moveLeft() {
        this.sprite.x -= VELOCITY;
    }

    moveUp() {
        this.sprite.y -= VELOCITY;
    }

    moveDown() {
        this.sprite.y += VELOCITY;
    }

    fire() {
        if (this.sprite.game.time.time < this.nextFire) {
            return;
        }

        const bullets = bullet.createDualBullets(this.sprite.game, this.sprite.x, this.sprite.y);
        this.shootingSound.play();
        bullet.moveBullets(bullets);

        this.nextFire = this.sprite.game.time.time + this.fireRate;
    }

    get herSprite(): Phaser.Sprite {
        return this.sprite;
    }

    static create(game: Phaser.Game, x: number, y: number): Her {
        let sprite = game.add.sprite(x, y, "her");
        sprite.inputEnabled = true;
        return new Her(sprite);
    }

}
