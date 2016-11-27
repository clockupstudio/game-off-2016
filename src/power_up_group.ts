import { PowerUp } from "./power_up";
import { Her } from "./her";
import * as _ from "lodash";

export default class PowerUpGroup {

    private powerUps: PowerUp[];

    constructor() {
        this.powerUps = [];
    }

    add(powerUp: PowerUp) {
        this.powerUps.push(powerUp);
    }

    update() {
        _.forEach(this.powerUps, (powerUp: PowerUp) => {
            powerUp.update();
        });
    }

    checkCollisionWith(game: Phaser.Game, her: Her) {
        _.forEach(this.powerUps, (powerUp: PowerUp) => {
            game.physics.arcade.collide(powerUp.sprite, her.sprite, (collidedPowerUp) => {
                collidedPowerUp.destroy();
            });
        });
    }

}