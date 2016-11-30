import { DualBullet, QuadralBullet } from "./bullet";
import { smallExplosion } from "./explosion";
import * as _ from "lodash";

const FIRE_RATE = 80;

export class Gun {

    private nextFire: number;
    private shootingSound: Phaser.Sound;
    private dualBullets: Phaser.Group;
    private level: number = 1;

    constructor(private game: Phaser.Game, private herSprite: Phaser.Sprite) {
        this.shootingSound = new Phaser.Sound(this.game, "shooting");
        this.dualBullets = this.game.add.group();
        this.nextFire = 0;
    }

    fire() {
        if (this.game.time.time < this.nextFire) {
            return;
        }

        this.dualBullets.add(this.createBullet());
        this.shootingSound.play();

        this.nextFire = this.game.time.time + FIRE_RATE;
    }

    collideWith(enemies: Phaser.Group) {
        _.each(this.dualBullets.children, (dualBullet: DualBullet) => {
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

        this.dualBullets.filter((dualBullet: DualBullet) => {
            return dualBullet.isOutOfCamera();
        }).callAll('destroy');
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
    const explosion = smallExplosion(game, x, y);
    explosion.explode().onComplete.add(() => {
        explosion.destroy();
    });

}
