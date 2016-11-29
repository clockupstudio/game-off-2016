import * as Phaser from "phaser";
import { Her, Gun } from "./her";
import { SmallFish } from "./small_fish";
import * as _ from "lodash";
import StageBackground from "./stage_background";
import { PowerUp } from "./power_up";
import PowerUpGroup from "./power_up_group";
import { TileObject } from "./tile_object";
import MediumFish from "./medium_fish";
import { Enemy } from "./enemy";
import IE from "./ie";

const SPRITESHEETS_PATH = "assets/spritesheets";
const SOUNDS_PATH = "assets/sounds";
const TILEMAPS_PATH = "assets/tilemaps";

export class WarState extends Phaser.State {

    private her: Her;
    private smallFish: SmallFish;
    private levelMap: Phaser.Tilemap;
    private backgroundLayer: Phaser.TilemapLayer;
    private enemyGroup: Phaser.Group;
    private stageBackground: StageBackground;
    private powerUpGroup: PowerUpGroup;
    private gun: Gun
    private evilBulletGroup: Phaser.Group;

    preload() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.load.image("her", `${SPRITESHEETS_PATH}/main_char.png`);
        this.game.load.image("small_fish", `${SPRITESHEETS_PATH}/small_fish.png`);
        this.game.load.image("bullet", `${SPRITESHEETS_PATH}/bullet.png`);
        this.game.load.image("power_up", `${SPRITESHEETS_PATH}/item.png`);
        this.game.load.audio("shooting", `${SOUNDS_PATH}/shooting.ogg`);
        this.game.load.tilemap("level_01", `${TILEMAPS_PATH}/level_01.json`, null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("stage_background", `${SPRITESHEETS_PATH}/stage.png`);
        this.game.load.image("medium_fish", `${SPRITESHEETS_PATH}/medium_fish.png`);
        this.game.load.spritesheet("boss_ie", `${SPRITESHEETS_PATH}/boss_stage_1.png`, 360, 460, 2);
        this.game.load.spritesheet("explosion", `${SPRITESHEETS_PATH}/explosion.png`, 587, 581, 8);
        this.game.load.image("evil_bullet", `${SPRITESHEETS_PATH}/evil_bullet.png`);
    }

    create() {
        this.stageBackground = StageBackground.create(this.game);
        this.game.add.existing(this.stageBackground);

        this.levelMap = this.game.add.tilemap("level_01");
        this.backgroundLayer = this.levelMap.createLayer('Background');
        this.backgroundLayer.resizeWorld();

        this.createHer();
        this.createEnemies();
        this.createItems();

        this.game.camera.y = 2280;

        this.gun = new Gun(this.game, this.her.sprite);
    }

    createHer() {
        let position: { x: number, y: number } = this.findHerOrigin();
        this.her = Her.create(this.game, position.x, position.y);
    }

    findHerOrigin(): { x: number, y: number } {
        let playerOrigin = _.find(this.levelMap.objects["Player"], (mapObject: any) => {
            return mapObject.type === "player_start";
        });

        return {
            x: playerOrigin.x,
            y: playerOrigin.y - 160
        };
    }

    createEnemies() {
        this.evilBulletGroup = this.game.add.physicsGroup();

        this.enemyGroup = this.game.add.group();

        this.findObjectOrigins("enemy").forEach((element: TileObject) => {
            if (element.properties.sprite === "small_fish") {
                this.enemyGroup.add(SmallFish.create(this.game, element.x, element.y - 40));
            }
            if (element.properties.sprite === "medium_fish") {
                this.enemyGroup.add(MediumFish.create(this.game, element.x, element.y, this.her, this.evilBulletGroup));
            }
            if (element.properties.sprite === "boss_ie") {
                this.enemyGroup.add(new IE(this.game, element.x, element.y));
            }
        });
    }

    createItems() {
        this.powerUpGroup = new PowerUpGroup();

        this.findObjectOrigins("item").forEach((element: TileObject) => {
            this.powerUpGroup.add(PowerUp.create(this.game, element.x, element.y));
        });
    }

    findObjectOrigins(type: string): TileObject[] {
        return _.filter(this.levelMap.objects["Player"], (mapObject: any) => {
            return mapObject.type === type;
        });
    }

    update() {
        this.stageBackground.update();
        this.her.update();

        _.each(this.enemyGroup.children, (enemy: Enemy) => {
            enemy.update()
        });

        _.each(this.enemyGroup.children, (enemy: Enemy) => {
            this.game.physics.arcade.collide(enemy, this.her.sprite, () => {
                this.her.destroy();
            });
        });

        this.powerUpGroup.checkCollisionWith(this.game, this.her);
        this.powerUpGroup.update();

        this.gun.collideWith(this.enemyGroup);
        this.gun.update();

        if (this.game.physics.arcade.collide(this.her.sprite, this.evilBulletGroup)) {
            this.her.destroy();
        };
    }

    render() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }
}
