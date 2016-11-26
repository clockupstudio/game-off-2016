import * as Phaser from "phaser";
import { Her } from "./her";
import { SmallFish } from "./small_fish";
import * as _ from "lodash";

const SPRITESHEETS_PATH = "assets/spritesheets";
const SOUNDS_PATH = "assets/sounds";
const TILEMAPS_PATH = "assets/tilemaps";

export class WarState extends Phaser.State {

    private her: Her;
    private smallFish: SmallFish;
    private levelMap: Phaser.Tilemap;
    private backgroundLayer: Phaser.TilemapLayer;
    private enemyGroup: SmallFish[];

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

        
        this.createHer();
        this.createEnemies();
        this.game.camera.y = 2280;
    }

    createEnemies() {
        
        this.enemyGroup = [];

        let origins = _.filter(this.levelMap.objects["Player"], (mapObject: any) => {
            return mapObject.type === "enemy";
        });

        origins.forEach((element) => {
            this.enemyGroup.push(SmallFish.create(this.game, element.x, element.y - 40));

        });
    }

    createHer() {
        let position: { x:number, y: number} = this.findHerOrigin();
        this.her = Her.create(this.game, position.x, position.y);
    }

    findHerOrigin(): {x: number, y: number} {

        let playerOrigin = _.find(this.levelMap.objects["Player"], (mapObject: any) => {
            return mapObject.type === "player_start";
        });

        return {
            x: playerOrigin.x,
            y: playerOrigin.y - 160
        };

    }

    update() {
        this.her.update();
        this.enemyGroup.forEach((smallFish: SmallFish) => {
            smallFish.update()
        });
        this.enemyGroup.forEach((smallFish: SmallFish) => {
            this.game.physics.arcade.collide(smallFish.sprite, this.her.sprite, this.her.destroy);
        });
    }

    render() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }
}
