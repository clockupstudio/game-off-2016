export default class StageBackground extends Phaser.TileSprite {

    update() {
        this.tilePosition.y += 1;
    }

    static create(game: Phaser.Game): StageBackground {
        return new StageBackground(game, (1920/2)-(1080/2), 2280, 1080, 1920, "stage_background");
    }
}