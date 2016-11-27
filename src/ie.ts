export default class IE extends Phaser.Sprite {

    private VELOCITY: number = 1;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "boss_ie");
    }

    update() {
        this.y += this.VELOCITY;
    }
}