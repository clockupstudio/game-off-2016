export class PowerUp {

    constructor(private powerUpSprite: Phaser.Sprite){}

    get sprite(): Phaser.Sprite {
        return this.powerUpSprite;
    }

    static create(game: Phaser.Game, x: number, y:number): PowerUp {
        let powerUpSprite: Phaser.Sprite = game.add.sprite(x, y, "power_up");
        game.physics.arcade.enableBody(powerUpSprite);
        return new PowerUp(powerUpSprite);
    }
}