import * as Phaser from "phaser";

const VELOCITY = 10;

export class SmallFish {

    constructor(private sprite: Phaser.Sprite) {
    }

    move() {
        this.sprite.y += VELOCITY;
    }

    movedOutOfGame(): boolean {
        return (this.sprite.y > 1080);
    }

    destroy() {
        this.sprite.destroy();
    }

    static create(game: Phaser.Game): SmallFish {
        let sprite = game.add.sprite(game.world.centerX, game.world.centerY - 300, "small_fish");
        sprite.anchor.setTo(0.5);
        return new SmallFish(sprite);
    }
}
