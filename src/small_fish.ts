import * as Phaser from "phaser";

const VELOCITY = 10;

export class SmallFish {

    constructor(private smallFishSprite: Phaser.Sprite) {
    }

    move() {
        this.smallFishSprite.y += VELOCITY;
    }

    movedOutOfGame(): boolean {
        return (this.smallFishSprite.y > 3360);
    }

    destroy() {
        this.smallFishSprite.destroy();
    }

    update() {
        this.move();
        if (this.movedOutOfGame()) {
            this.destroy();
        }
    }

    get sprite(): Phaser.Sprite {
        return this.smallFishSprite;
    }

    static create(game: Phaser.Game, x: number, y: number): SmallFish {
        let sprite = game.add.sprite(x, y, "small_fish");
        sprite.anchor.setTo(0.5);
        return new SmallFish(sprite);
    }
}
