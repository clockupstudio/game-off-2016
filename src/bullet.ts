import * as Phaser from "phaser";

const BULLET_VELOCITY = 1000;

export function moveBullets(bullets: Bullet[]) {
    bullets[0].body.velocity.y -= BULLET_VELOCITY;
    bullets[1].body.velocity.y -= BULLET_VELOCITY;
}

export function createDualBullets(game: Phaser.Game, x: number, y: number): Bullet[] {
    return [
        new Bullet(game, x + 25, y + 30),
        new Bullet(game, x + (160 - 25), y + 30),
    ];
}

export class Bullet extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "bullet");
        game.add.existing(this);
        game.physics.arcade.enable(this);
    }
}
