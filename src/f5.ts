import * as Phaser from "phaser";
import { WarState } from "./war_state";

const GAME_WIDTH = 1920;
const GAME_HEIGHT = 1080;
const GAME_ID = "f5-game";

export class F5 {

    private game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(
            GAME_WIDTH,
            GAME_HEIGHT,
            Phaser.AUTO,
            GAME_ID,
            {
                create: this.create,
            }
        );
    }

    create() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        this.game.state.add("war", WarState, false);
        this.game.state.add("game over", GameOver, false);

        this.game.state.start("war");
    }

}

export class GameOver extends Phaser.State {

    preload() {
        this.game.load.image("game_over", "assets/images/game_over.png");
    }

    create() {
        this.game.add.image(0, 0, "game_over");
        this.game.input.keyboard.onPressCallback = () => {
            this.game.input.keyboard.onPressCallback = null;
            this.game.state.start("war");
        };
    }

}
