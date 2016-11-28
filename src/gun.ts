import { DualBullet, QuadralBullet } from "./bullet";
import { Explosion } from "./explosion";
import * as _ from "lodash";

const FIRE_RATE = 200;

export class Gun {

    private nextFire: number;
    private shootingSound: Phaser.Sound;
    private dualBullets: DualBullet[];
    private level: number = 1;

    constructor(private game: Phaser.Game, private herSprite: Phaser.Sprite) {
        this.shootingSound = new Phaser.Sound(this.game, "shooting");
        this.dualBullets = [];
        this.nextFire = 0;
    }

    fire() {
        if (this.game.time.time < this.nextFire) {
            return;
        }

        this.dualBullets.push(this.createBullet());
        this.shootingSound.play();

        this.nextFire = this.game.time.time + FIRE_RATE;
    }

    collideWith(enemies: Phaser.Group) {
        _.each(this.dualBullets, (dualBullet: DualBullet) => {
            this.game.physics.arcade.collide(dualBullet, enemies, (bullet, enemy) => {
                if (bullet.visible) {
                    bullet.visible = false;
                    dualBullet.remove(bullet);

                    explodeEnemy(this.game, enemy);
                }
            });
        });
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.fire();
        }
    }

    upgrade() {
        this.level++;
    }

    createBullet(): Phaser.Group {
        if (this.level == 1) {
            return new DualBullet(this.game, this.herSprite.x, this.herSprite.y);
        }
        return new QuadralBullet(this.game, this.herSprite.x, this.herSprite.y);
    }
}

function explodeEnemy(game: Phaser.Game, enemy: Phaser.Sprite) {
    const [x, y] = [enemy.x, enemy.y];
    enemy.destroy();
    const explosion = new Explosion(game, x, y);
    explosion.explode().onComplete.add(() => {
        explosion.destroy();
    });

}