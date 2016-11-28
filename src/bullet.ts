import * as Phaser from "phaser";
import * as _ from "lodash";

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
        this.scale.setTo(2, 2);
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
    }

    update() {
        this.setAll('body.velocity.y', -BULLET_VELOCITY);
    }

    isOutOfCamera(): boolean {
        return this.children[0].y <= this.game.camera.y;
    }
}

export class QuadralBullet extends Phaser.Group {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game);

        const bullets = createQuadralBullets(game, x, y);
        this.add(bullets[0]);
        this.add(bullets[1]);
        this.add(bullets[2]);
        this.add(bullets[3]);

        game.add.existing(this);
    }

    update() {
        this.setAll('body.velocity.y', -BULLET_VELOCITY);
    }

    isOutOfCamera(): boolean {
        if( _.isUndefined(this.children[0]) ){
            return false;
        }
        return this.children[0].y <= this.game.camera.y;
    }
}

export function createQuadralBullets(game: Phaser.Game, x: number, y: number): Bullet[] {
    return [
        new Bullet(game, x + 25, y + 30),
        new Bullet(game, x + 50, y + 30),
        new Bullet(game, x + (160 - 25), y + 30),
        new Bullet(game, x + (160 - 50), y + 30)
    ];
}
