export default class IE extends Phaser.Sprite {

    private VELOCITY: number = 1;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "boss_ie");

        this.animations.add("idle", [0], 1, true);
        this.animations.add("die", [1], 1, true);

        this.animations.play("idle")
    }

    update() {
        this.y += this.VELOCITY;
    }
}