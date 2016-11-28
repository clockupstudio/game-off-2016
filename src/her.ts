import * as Phaser from "phaser";
import * as _ from "lodash";
import { DualBullet } from "./bullet";
import { Explosion } from "./explosion";

const VELOCITY = 10;

export class Her {

    private fireRate = 200;
    private nextFire: number;
    private herController: HerController;
    private onCollectedItem: Phaser.Signal = new Phaser.Signal();

    constructor(private herSprite: Phaser.Sprite) {
        this.herController = new HerController(this.herSprite.game, this);
    }

    moveRight() {
        this.herSprite.x += VELOCITY;
    }

    moveLeft() {
        this.herSprite.x -= VELOCITY;
    }

    moveUp() {
        this.herSprite.y -= VELOCITY;
    }

    moveDown() {
        this.herSprite.y += VELOCITY;
    }

    update() {
        this.herController.update();
    }

    destroy() {
        this.herSprite.destroy();
    }

    addCollectedItemListener(listener) {
        this.onCollectedItem.add(listener);
    }

    notifyCollectedItemListener() {
        this.onCollectedItem.dispatch();
    }

    get sprite(): Phaser.Sprite {
        return this.herSprite;
    }

    static create(game: Phaser.Game, x: number, y: number): Her {
        let sprite = game.add.sprite(x, y, "her");
        sprite.inputEnabled = true;
        game.physics.arcade.enable(sprite);
        return new Her(sprite);
    }

}

export class HerController {

    constructor(private game: Phaser.Game, private her: Her) {
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            if ((this.her.sprite.x + 160) < 1500) {
                this.her.moveRight();
            }
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            if (this.her.sprite.x > 420) {
                this.her.moveLeft();
            }
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.her.moveUp();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.her.moveDown();
        }
    }
}

const FIRE_RATE = 200;

export class Gun {

    private nextFire: number;
    private shootingSound: Phaser.Sound;
    private dualBullets: Phaser.Group;


    constructor(private game: Phaser.Game, private herSprite: Phaser.Sprite) {
        this.shootingSound = new Phaser.Sound(this.game, "shooting");
        this.dualBullets = game.add.group();
        this.nextFire = 0;
    }

    fire() {
        if (this.game.time.time < this.nextFire) {
            return;
        }

        this.dualBullets.add(new DualBullet(this.game, this.herSprite.x, this.herSprite.y));
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
        console.log("POWERUP");
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
