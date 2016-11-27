import * as Phaser from "phaser";

const BULLET_VELOCITY = 1000;

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

export class DualBullet extends Phaser.Group {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game);

        const bullets = createDualBullets(game, x, y);
        this.add(bullets[0]);
        this.add(bullets[1]);

        game.add.existing(this);
    }

    update() {
        this.setAll('body.velocity.y', -BULLET_VELOCITY);
    }
}
