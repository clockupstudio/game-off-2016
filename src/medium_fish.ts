import { Her } from "./her";

export default class MediumFish extends Phaser.Sprite {

    private VELOCITY: number = 5;
    private shoot: boolean = false;

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

            let evilBullet: Phaser.Sprite = this.game.add.sprite(this.x, this.y, "evil_bullet");
            this.game.physics.arcade.enable(evilBullet);
            this.game.physics.arcade.moveToObject(evilBullet, this.her.sprite, 300);
        }
    }

    static create(game: Phaser.Game, x: number, y: number, her: Her): MediumFish {
        return new MediumFish(game, x, y, her);
    }
}