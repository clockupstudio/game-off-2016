export class PowerUp {
    
    private static VELOCITY:number = 6;

    constructor(private powerUpSprite: Phaser.Sprite){}

    get sprite(): Phaser.Sprite {
        return this.powerUpSprite;
    }

    update() {
        this.powerUpSprite.y += PowerUp.VELOCITY;
    }

    static create(game: Phaser.Game, x: number, y:number): PowerUp {
        let powerUpSprite: Phaser.Sprite = game.add.sprite(x, y, "power_up");
        game.physics.arcade.enableBody(powerUpSprite);
        return new PowerUp(powerUpSprite);
    }
}