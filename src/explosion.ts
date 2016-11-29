import * as Phaser from "phaser";

export class Explosion extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, scaleX: number, scaleY: number) {
        super(game, x, y, "explosion");
        this.scale.set(scaleX, scaleY);
        this.animations.add("explode");

        game.add.existing(this);
    }

    explode(): Phaser.Animation {
        return this.animations.play("explode", 30, false);
    }
}

export function smallExplosion(game: Phaser.Game, x: number, y: number) {
    return new Explosion(game, x, y, 0.0681, 0.0688);
}

export function mediumExplosion(game: Phaser.Game, x: number, y: number) {
    return new Explosion(game, x, y, 0.13, 0.13);
}