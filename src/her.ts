import * as Phaser from "phaser";

const VELOCITY = 10;

export class Her {

    private fireRate = 200;
    private nextFire: number;

    constructor(private sprite: Phaser.Sprite) { }

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
        console.log(this.sprite.game.time.time, this.nextFire);
        if (this.sprite.game.time.time < this.nextFire) {
            return;
        }

        const bullet = new Bullet(this.sprite);
        bullet.body.velocity.y -= 200;

        this.nextFire = this.sprite.game.time.time + this.fireRate;
    }

    static create(game: Phaser.Game): Her {
        let sprite = game.add.sprite(game.world.centerX, game.world.centerY, "her");
        sprite.anchor.setTo(0.5, 0.5);
        sprite.inputEnabled = true;
        return new Her(sprite);
    }

}

class Bullet extends Phaser.Sprite {
    constructor(her: Phaser.Sprite) {
        super(her.game, her.x, her.y, "bullet");
        her.game.add.existing(this);
        her.game.physics.arcade.enable(this);
    }
}
