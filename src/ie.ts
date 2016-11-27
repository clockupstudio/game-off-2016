export default class IE extends Phaser.Sprite {

    private VELOCITY: number = 1;
    private dead: boolean = false;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "boss_ie");

        this.animations.add(IEAnimations.IDLE, [0], 1, true);
        this.animations.add(IEAnimations.DIE, [1], 1, true);

        this.animations.play(IEAnimations.IDLE);
    }

    update() {
        if(this.dead){
            return;
        }

        if(this.y > (this.game.world.height-1000)){
            this.animations.play(IEAnimations.DIE);
            this.dead = true;
            return;
        }

        this.y += this.VELOCITY;
    }
}

const IEAnimations = {
    IDLE: "idle",
    DIE: "die"
}