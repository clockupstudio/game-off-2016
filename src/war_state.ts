import * as Phaser from "phaser";
import { Her } from "./her";
import { SmallFish } from "./small_fish";

const SPRITESHEETS_PATH = "assets/spritesheets";
const SOUNDS_PATH = "assets/sounds";
const TILEMAPS_PATH = "assets/tilemaps";

export class WarState extends Phaser.State {

    private herController: HerController;
    private smallFish: SmallFish;
    private levelMap: Phaser.Tilemap;
    private backgroundLayer: Phaser.TilemapLayer;

    preload() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.load.image("her", `${SPRITESHEETS_PATH}/main_char.png`);
        this.game.load.image("small_fish", `${SPRITESHEETS_PATH}/small_fish.png`);
        this.game.load.image("bullet", `${SPRITESHEETS_PATH}/bullet.png`);
        this.game.load.audio("shooting", `${SOUNDS_PATH}/shooting.ogg`);
        this.game.load.tilemap("level_01", `${TILEMAPS_PATH}/level_01.json`, null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
        this.levelMap = this.game.add.tilemap("level_01");
        this.backgroundLayer = this.levelMap.createLayer('Background');
        this.backgroundLayer.resizeWorld();

        this.smallFish = SmallFish.create(this.game);
        this.herController = new HerController(this.game, this.createHer());

        //this.game.camera.y = 2280;
        this.game.camera.follow(this.herController.herSprite);
    }

    createHer(): Her {
        var position: { x:number, y: number} = this.findHerOrigin();
        return Her.create(this.game, position.x, position.y);
    }

    findHerOrigin(): {x: number, y: number} {

        var result = {
            x: this.game.world.centerX, 
            y: this.game.world.centerY
        }

        this.levelMap.objects["Player"].find((mapObject)=>{
            console.log(mapObject)
            if(mapObject.type === "player_start") {
                result = {
                    x: mapObject.x,
                    y: (mapObject.y - 160)
                }
            }
        });

        return result;
    }

    update() {
        console.log(this.camera.y)
        this.herController.update();
        if (this.smallFish !== null) {
            this.smallFish.move();
            if (this.smallFish.movedOutOfGame()) {
                this.smallFish.destroy();
                this.smallFish = null;
            }
        }
    }

    render() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }
}

export class HerController {

    constructor(private game: Phaser.Game, private her: Her) {
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.her.moveRight();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.her.moveLeft();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.her.moveUp();
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.her.moveDown();
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.her.fire();
        }
    }

    get herSprite(): Phaser.Sprite{
        return this.her.herSprite;
    }
}
