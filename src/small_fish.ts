import * as Phaser from "phaser";

const VELOCITY = 10;

export class SmallFish extends Phaser.Sprite {

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "small_fish");
        this.anchor.setTo(0.5);
        game.physics.arcade.enable(this);
    }

    move() {
        this.y += VELOCITY;
    }

    movedOutOfGame(): boolean {
        return (this.y > 3360);
    }

    update() {
        this.move();
    }


    static create(game: Phaser.Game, x: number, y: number): SmallFish {
        return new SmallFish(game, x, y);
    }
}
