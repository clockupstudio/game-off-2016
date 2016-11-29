import * as explosion from "./explosion";
import * as _ from "lodash";

export default class IE extends Phaser.Sprite {

    private VELOCITY: number = 1;
    private dead: boolean = false;
    private bombSound: Phaser.Sound;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "boss_ie");

        this.animations.add(IEAnimations.IDLE, [0], 1, true);
        this.animations.add(IEAnimations.DIE, [1], 1, true);

        this.animations.play(IEAnimations.IDLE);
        this.bombSound = new Phaser.Sound(game, "bomb");
    }

    update() {
        if (this.dead) {
            return;
        }

        if (this.y > (this.game.world.height - 1000)) {
            this.animations.play(IEAnimations.DIE);
            this.selfExplode();
            this.dead = true;
            return;
        }

        this.y += this.VELOCITY;
    }

    selfExplode() {
        this.bombSound.play();
        _.each(this.generateGridPoints(4, 3), (point:{x: number, y: number})=> {
            let newExplosion:explosion.Explosion = explosion.mediumExplosion(this.game, this.x+80+(80*point.x), this.y+80+(80*point.y));
            newExplosion.explode().onComplete.add(() => {
                newExplosion.destroy();
            });
        });
    }

    generateGridPoints(maxRow: number, maxColumn: number): {x: number, y: number}[] {
        let result = [];
        for(var column:number = 0; column < maxColumn; column++){
            for( var row:number = 0; row < maxRow; row++){
                result.push({x: column, y: row});
            }
        }
        return result;
    }
}

const IEAnimations = {
    IDLE: "idle",
    DIE: "die"
}