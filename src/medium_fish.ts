export default class MediumFish extends Phaser.Sprite {

    private VELOCITY: number = 5;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "medium_fish");
        game.physics.arcade.enable(this);
    }

    update() {
        this.y += this.VELOCITY;
    }

    static create(game: Phaser.Game, x: number, y: number): MediumFish {
        return new MediumFish(game, x, y);
    }
}