import * as Phaser from "phaser";
import * as _ from "lodash";
<<<<<<< HEAD
=======
import { DualBullet } from "./bullet";
import * as explosion from "./explosion";
>>>>>>> IE will explode himself when die

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
