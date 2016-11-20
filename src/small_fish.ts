import * as Phaser from "phaser";

const VELOCITY = 10;

export class SmallFish {

    constructor(private sprite: Phaser.Sprite) {
    }

    move() {
        this.sprite.y += VELOCITY;
    }

    movedOutOfGame(): boolean {
        return (this.sprite.y > 3360);
    }

    destroy() {
        this.sprite.destroy();
    }

    addTo(group: Phaser.Group) {
        group.add(this.sprite);
    }

    static create(game: Phaser.Game, x: number, y: number): SmallFish {
        let sprite = game.add.sprite(x, y, "small_fish");
        sprite.anchor.setTo(0.5);
        return new SmallFish(sprite);
    }
}
