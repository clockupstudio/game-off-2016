import * as Phaser from "phaser";
import { Her } from "./her";
import { SmallFish } from "./small_fish";

const SPRITESHEETS_PATH = "assets/spritesheets";
const SOUNDS_PATH = "assets/sounds";

export class WarState extends Phaser.State {

    private herController: HerController;
    private smallFish: SmallFish;

    preload() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.load.image("her", `${SPRITESHEETS_PATH}/main_char.png`);
        this.game.load.image("small_fish", `${SPRITESHEETS_PATH}/small_fish.png`);
        this.game.load.image("bullet", `${SPRITESHEETS_PATH}/bullet.png`);
        this.game.load.audio("shooting", `${SOUNDS_PATH}/shooting.ogg`);
    }

    create() {
        this.smallFish = SmallFish.create(this.game);
        this.herController = new HerController(this.game, Her.create(this.game));
    }

    update() {
        this.herController.update();
        if (this.smallFish !== null) {
            this.smallFish.move();
            if (this.smallFish.movedOutOfGame()) {
                this.smallFish.destroy();
                this.smallFish = null;
            }
        }
    }
}

export class HerController {

    constructor(private game: Phaser.Game, private her: Her) {
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.her.moveRight();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.her.moveLeft();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.her.moveUp();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.her.moveDown();
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.her.fire();
        }
    }
}
