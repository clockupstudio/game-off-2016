import { Her } from "./her";
import { EvilBulletShooter } from "./evil_bullet";

export default class MediumFish extends Phaser.Sprite {

    private VELOCITY: number = 5;
    private shoot: boolean = false;
    private evilBulletShooter: EvilBulletShooter = new EvilBulletShooter(this.game);

    constructor(game: Phaser.Game, x: number, y: number, private her:Her) {
        super(game, x, y, "medium_fish");
        game.physics.arcade.enable(this);
    }

    update() {
        this.y += this.VELOCITY;

        if(this.shoot){
            return;
        }

        if((this.her.sprite.y - this.y ) <= 640 ) {
            this.shoot = true;
            this.evilBulletShooter.shootTo(this.x+40, this.y+80, this.her.sprite);
        }
    }

    static create(game: Phaser.Game, x: number, y: number, her: Her): MediumFish {
        return new MediumFish(game, x, y, her);
    }
}