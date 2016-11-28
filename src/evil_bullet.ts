import { Her } from "./her";

export class EvilBullet extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "evil_bullet")
    }
}

export class EvilBulletShooter {

    constructor(private game: Phaser.Game) { }

    shootTo(originX: number, originY: number, target: Phaser.Sprite) {
        let evilBullet: EvilBullet = new EvilBullet(this.game, originX, originY);
        this.game.world.add(evilBullet);
        this.game.physics.arcade.enable(evilBullet);
        this.game.physics.arcade.moveToObject(evilBullet, target, 300);
    }
}