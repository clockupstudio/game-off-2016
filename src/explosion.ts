import * as Phaser from "phaser";

export class Explosion extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "explosion");

        const [scaleX, scaleY] = [0.0681, 0.0688];

        this.scale.set(scaleX, scaleY);
        this.animations.add("explode");

        game.add.existing(this);
    }

    explode(): Phaser.Animation {
        return this.animations.play("explode", 30, false);
    }
}
